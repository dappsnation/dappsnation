import { NgModule, Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormList, FormArraySchema, FormFactoryModule, FormOutlet } from 'ng-form-factory';

@Component({
  selector: 'form-control-list',
  templateUrl: './control-list.component.html',
  styleUrls: ['./control-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlListComponent implements FormOutlet {
  form: FormList<any>;
  schema: FormArraySchema<any>
}


@NgModule({
  declarations: [ControlListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFactoryModule,
    MatButtonModule,
  ]
})
export class ControlListModule { }