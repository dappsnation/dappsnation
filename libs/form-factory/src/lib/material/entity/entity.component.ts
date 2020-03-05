import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormOutletModule, FormOutlet } from '../../components/form-outlet';
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
    FormOutletModule
  ]
})
export class EntityModule { }
