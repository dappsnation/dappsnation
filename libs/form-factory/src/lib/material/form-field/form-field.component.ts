import { Component, NgModule, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldSchema } from './form-field.schema';
import { FormControl } from '@angular/forms';

@Component({
  selector: '[schema] [form] form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent {
  @Input() schema: MatFormFieldSchema<any>;
  @Input() form: FormControl;
}

@NgModule({
  declarations: [FormFieldComponent],
  exports: [FormFieldComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
  ]
})
export class FormFieldModule { }