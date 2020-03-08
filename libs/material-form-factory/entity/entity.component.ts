import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEntity, FormGroupSchema, FormFactoryModule, FormOutlet } from 'ng-form-factory';

@Component({
  selector: 'form-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent implements FormOutlet {
  form: FormEntity<any>
  schema: FormGroupSchema<any>
}


@NgModule({
  declarations: [EntityComponent],
  imports: [
    CommonModule,
    FormFactoryModule
  ]
})
export class EntityModule { }
