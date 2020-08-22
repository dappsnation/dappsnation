import { Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ButtonToggleFormModule, ButtonToggleFormComponent } from './button-toggle.component';
import { MatButtonToggleSchema, matButtonToggle } from './button-toggle.schema';
import { FormFactoryModule, createForms } from 'ng-form-factory';


export default {
  title: 'Button Toggle'
};

const schema_1: MatButtonToggleSchema = matButtonToggle({
  load: () => import('./button-toggle.component').then(c => c.ButtonToggleFormComponent),
  options: { left: 'Left', right: 'Right' }
});
const form_1 = createForms(schema_1, 'left');

export const main = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, ButtonToggleFormModule, FormFactoryModule],
    entryComponents: [ButtonToggleFormComponent]
  },
  template: `<form-outlet [form]="form" [schema]="schema"></form-outlet>`,
  props: {
    form: form_1,
    schema: schema_1
  }
});


///////
// Required 

const schema_2: MatButtonToggleSchema = matButtonToggle({
  load: () => import('./button-toggle.component').then(c => c.ButtonToggleFormComponent),
  validators: [Validators.required, Validators.min(2), Validators.max(5)],
  multiple: true,
  icons: {
    left: 'format_align_left',
    center: 'format_align_center',
    right: 'format_align_right',
    justify: 'format_align_justify'
  }
});
const form_2 = createForms(schema_2, ['right']);

export const withIcons = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, ButtonToggleFormModule, FormFactoryModule],
    entryComponents: [ButtonToggleFormComponent]
  },
  template: `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <form-outlet [form]="form" [schema]="schema"></form-outlet>
  `,
  props: {
    form: form_2,
    schema: schema_2
  }
});