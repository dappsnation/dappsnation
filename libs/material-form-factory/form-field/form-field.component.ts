import { Component, NgModule, ChangeDetectionStrategy, Input, ContentChild, ViewChild, ChangeDetectorRef, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatFormFieldControl, MatFormField } from '@angular/material/form-field';
import { MatFormFieldSchema } from './form-field.schema';
import { FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: '[schema] [form] form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements AfterViewInit {
  beforeViewInit = true;
  @Input() schema: MatFormFieldSchema<any>;
  @Input() form: FormControl;

  @ContentChild(MatFormFieldControl) control: MatFormFieldControl<any>;
  @ViewChild(MatFormField) matFormField: MatFormField;

  constructor(private cdr: ChangeDetectorRef) {}

  // Hacky solution waiting for this issue to be solved: https://github.com/angular/components/issues/9411
  ngAfterViewInit() {
    if (this.beforeViewInit) {
      this.matFormField._control = this.control;
      this.beforeViewInit = false;
      this.cdr.detectChanges(); // Required for inputs
      this.cdr.markForCheck();  // Required for select
    }
  }
}

@NgModule({
  declarations: [FormFieldComponent],
  exports: [FormFieldComponent, MatFormFieldModule],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class FormFieldModule { }