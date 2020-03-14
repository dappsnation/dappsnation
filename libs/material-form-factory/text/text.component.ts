import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormOutlet } from 'ng-form-factory';
import { MatTextSchema } from './text.schema';
import { FormFieldModule } from 'material-form-factory/form-field';


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
    FormFieldModule,
    MatInputModule,
  ]
})
export class TextFormModule { }