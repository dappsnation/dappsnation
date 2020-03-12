import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormOutlet } from 'ng-form-factory';
import { FormFieldModule } from 'material-form-factory/form-field';
import { MatSelectSchema } from './select.schema';
import { OptionOutletDirective } from './option-outlet';

@Component({
  selector: 'form-select',
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
