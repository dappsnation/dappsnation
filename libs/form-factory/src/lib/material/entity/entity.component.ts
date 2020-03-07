import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFactoryModule, FormOutlet } from '../../core/form-outlet';
import { FormEntity } from '../../core/entity';
import { FormGroupSchema } from '../../core/types';

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
