import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ListBase } from '../../components/list';
import { GetSchema, FormArraySchema } from '../../core/types';
import { FormList } from '../../core/list';

@Component({
  selector: 'form-control-list',
  templateUrl: './control-list.component.html',
  styleUrls: ['./control-list.component.scss']
})
export class ControlListComponent<T extends any[]> extends ListBase<T> {
  form: FormList<GetSchema<T>>;
  schema: FormArraySchema<T>
}


@NgModule({
  declarations: [ControlListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
  ]
})
export class ControlListModule { }