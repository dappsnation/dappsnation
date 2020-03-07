import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormOutlet } from '../../core';
import { MatSelectSchema } from './select.schema';
import { FormFieldModule } from '../form-field/form-field.component';

@Component({
  selector: 'dappsnation-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFormComponent implements FormOutlet {
  form: FormControl;
  schema: MatSelectSchema;

  isArray = Array.isArray;
}


@NgModule({
  declarations: [SelectFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    MatSelectModule
  ]
})
export class SelectFormModule { }
