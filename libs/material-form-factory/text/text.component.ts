import { Component, NgModule, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormOutlet } from 'ng-form-factory';
import { MatTextSchema } from './text.schema';
import { FormFieldModule } from 'material-form-factory/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'form-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <mat-form-field [appearance]="schema.appearance" [floatLabel]="schema.floatLabel" [hideRequiredMarker]="schema.hideRequiredMarker">
    <input matInput [formControl]="form" [placeholder]="schema.placeholder" />

    <mat-label *ngIf="schema.label">{{ schema.label }}</mat-label>
    <mat-hint *ngIf="schema.hint">{{ schema.hint }}</mat-hint>

      <mat-error *ngIf="form.invalid">
        {{ getErrorMsg() }}
      </mat-error>
  </mat-form-field>`,
})
export class TextFormComponent implements FormOutlet {
  @Input() form: FormControl;
  @Input() schema: MatTextSchema;
  getErrorMsg() {
    for (const error in this.schema.errors) {
      if (this.form.hasError(error)) return this.schema.errors[error];
    }
  }
}

@NgModule({
  declarations: [TextFormComponent],
  exports: [TextFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class TextFormModule { }