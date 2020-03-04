import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlBase } from '../../components/control';

@Component({
  selector: 'dappsnation-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends ControlBase {


}


@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule
  ]
})
export class SelectModule { }
