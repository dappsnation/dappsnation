import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityBase } from '../../components/entity';

@Component({
  selector: 'form-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent extends EntityBase {}


@NgModule({
  declarations: [EntityComponent],
  imports: [
    CommonModule
  ]
})
export class EntityModule { }
