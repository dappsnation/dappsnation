import { Component, NgModule, ChangeDetectionStrategy, Input, ContentChild, ViewChild, OnInit, AfterContentInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
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

  // Hack to support
  ngAfterViewInit() {
    if (this.beforeViewInit) {
      this.matFormField._control = this.control;
      this.beforeViewInit = false;
      this.cdr.detectChanges();
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