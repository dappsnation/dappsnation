import { Component, NgModule, ChangeDetectionStrategy, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormOutlet } from 'ng-form-factory';
import { FormFieldModule } from 'material-form-factory/form-field';
import { MatSelectSchema } from './select.schema';
import { OptionOutletDirective } from './option-outlet';
import { FormField } from 'ng-form-factory/field';

@Component({
  selector: 'form-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form-field [form]="form" [schema]="schema">
      <mat-select [formControl]="form" [multiple]="schema.multiple" >
        <!-- Array -->
        <ng-container *ngIf="isArray(schema.options) else isMap">
          <mat-option *ngFor="let option of schema.options" [value]="option">
            <ng-template [ngTemplateOutlet]="display" [ngTemplateOutletContext]="{$implicit: option}"></ng-template>
          </mat-option>
        </ng-container>
        <!-- Object -->
        <ng-template #isMap>
          <mat-option *ngFor="let option of schema.options | keyvalue" [value]="option.key">
            <ng-template [ngTemplateOutlet]="display" [ngTemplateOutletContext]="{$implicit: option.value}"></ng-template>
          </mat-option>
        </ng-template>
      </mat-select>
    </form-field>

    <!-- For dynamic content -->
    <ng-template #display let-option>
      <ng-container *ngIf="schema.optionTemplate else simple">
        <option-outlet [option]="option" [schema]="schema"></option-outlet>
      </ng-container>
      <ng-template #simple>
        {{ option }}
      </ng-template>
    </ng-template>`,
})
export class SelectFormComponent<T> implements FormOutlet {
  @Input() form: FormField<T>;
  @Input() schema: MatSelectSchema<T>;

  isArray = Array.isArray;

}


@NgModule({
  declarations: [SelectFormComponent, OptionOutletDirective],
  exports: [SelectFormComponent, OptionOutletDirective, MatSelectModule],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    MatSelectModule
  ]
})
export class SelectFormModule { }
