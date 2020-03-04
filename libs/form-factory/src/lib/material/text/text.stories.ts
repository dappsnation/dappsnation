import { TextFormModule, TextFormComponent } from './text.component';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export default {
  title: 'Text Form Component'
};

export const main = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, TextFormModule]
  },
  component: TextFormComponent,
  props: {
    form: new FormControl('Some text'),
    schema: {
      form: 'control',
      label: 'Label here'
    }
  }
});