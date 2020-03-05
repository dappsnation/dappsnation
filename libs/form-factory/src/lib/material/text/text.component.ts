import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControlSchema } from '../../core/types';
import { FormOutlet } from '../../components/form-outlet';
import { ControlBase } from '../../components/control';

export interface MatTextSchema extends FormControlSchema {
  label: string;
  value?: string;
  hint?: string;
  placeholder?: string;
}

@Component({
  selector: 'form-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextFormComponent implements FormOutlet {
  form: FormControl;
  schema: MatTextSchema;
}

@NgModule({
  declarations: [TextFormComponent],
  exports: [TextFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class TextFormModule { }