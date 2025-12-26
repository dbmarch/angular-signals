import { Component, computed, contentChild, effect, input } from '@angular/core';
import { Field } from "@angular/forms/signals";
@Component({
  selector: 'app-field',
  standalone: true,
  imports: [],
  templateUrl: './field-wrapper.html',
  styleUrl: './field-wrapper.scss',
})
export class FieldWrapper {
  readonly label = input ('');
  readonly fieldDirective = contentChild.required(Field);

  readonly fieldState = computed(() => this.fieldDirective().state());
  readonly errors = computed(() => this.fieldState().errors())

  constructor() {
    effect(() => {
      console.log ('The field Directive is ', this.fieldDirective());

    })
  }
}
