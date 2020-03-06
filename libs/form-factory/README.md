# Form Factory

Generate Angular Forms for you !

## Get started

```bash
npm install ng-form-factory
```

In your app.module.ts 
```typescript
@NgModule({
  imports: [
    FormFactoryModule.forRoot()
  ]
})
```


In app.component.ts
```typescript
const schema = {
  form: 'control',
  load: () => import('./text.component').then(c => c.TextFormComponent),
};
@Component({
  selector: 'app-root',
  template: '<form-outlet [form]="form" [schema]="schema"/>',
})
export class AppComponent implements FormOutlet {
  // Generate the right Form depending on the schema (in this case FormControl)
  form = createForms(schema, 'some text');
  schema: FormSchema;
}
```

The schema is going to lazy load the component `TextFormComponent` and pass it the form.

Let's create the component in `text.component.ts`: 
```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormOutlet, FormSchema } from 'ng-form-factory';

@Component({
  selector: 'form-text',
  template: '<input [formControl]="form" />',
})
export class TextFormComponent implements FormOutlet {
  form: FormControl;
  schema: FormSchema;
}

@Ngodule({
  declarations: [TextFormComponent],
  import: [ReactiveFormsModule]
})
export class TextFormModule {}
```

> FormOutlet make sure that the component implements a form & a schema

Serve the app, you should see the form-text beeing lazy loaded automatically.

