import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { PortalModule } from '@angular/cdk/portal';
import { MatSelectSchema } from './select.schema';
import { FormFieldModule } from '../form-field/form-field.component';
import { OptionOutletDirective } from './option-outlet';
import { FormOutlet } from 'ng-form-factory';

@Component({
  selector: 'form-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFormComponent<T> implements FormOutlet {
  form: FormControl;
  schema: MatSelectSchema;

  isArray = Array.isArray;

}


@NgModule({
  declarations: [SelectFormComponent, OptionOutletDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PortalModule,
    FormFieldModule,
    MatSelectModule
  ]
})
export class SelectFormModule { }