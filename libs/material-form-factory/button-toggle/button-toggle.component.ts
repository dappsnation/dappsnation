import { Component, NgModule, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormOutlet } from 'ng-form-factory';
import { MatButtonToggleSchema } from './button-toggle.schema';


@Component({
  selector: 'form-button-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <mat-button-toggle-group [multiple]="schema.multiple">
    <ng-container *ngFor="let option of schema.options | keyvalue">
      <mat-button-toggle [value]="option.key">{{ option.value }}</mat-button-toggle>
    </ng-container>
    <ng-container *ngFor="let icon of schema.icons | keyvalue">
      <mat-button-toggle [value]="icon.key">
        <mat-icon>{{ icon.value }}</mat-icon>
      </mat-button-toggle>
    </ng-container>
  </mat-button-toggle-group>`,
})
export class ButtonToggleFormComponent implements FormOutlet {
  @Input() form: FormControl;
  @Input() schema: MatButtonToggleSchema;
}

@NgModule({
  declarations: [ButtonToggleFormComponent],
  exports: [ButtonToggleFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatIconModule
  ]
})
export class ButtonToggleFormModule { }