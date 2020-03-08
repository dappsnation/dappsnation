import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormOutlet } from 'ng-form-factory';
import { FormFieldModule } from 'material-form-factory/form-field';
import { MatSelectSchema } from 'material-form-factory/select';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'form-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAutocompleteComponent implements FormOutlet {
  form: FormControl;
  schema: MatSelectSchema;
  filteredOptions: Observable<string[]>;
  isArray: boolean;
  constructor() { }

  ngOnInit() {
    this.isArray = Array.isArray(this.schema.options);
    this.filteredOptions = this.form.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
  }

  // @dev displayFn "this" is the MatAutocomplete, not the component
  /** Display the label if option is a record */
  displayLabel(key: string) {
    return this.isArray ? key : this.schema.options[key];
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const options = this.schema.options;
    if (this.isArray) {
      return options.filter(option => option.toLowerCase().includes(filterValue));
    } else {
      return Object.keys(options).filter((key) => options[key].toLowerCase().includes(filterValue));
    }
  }
}


@NgModule({
  declarations: [FormAutocompleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
  ]
})
export class FormAutocompleteModule { }