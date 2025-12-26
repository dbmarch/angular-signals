import { Component, input } from '@angular/core';
import { FieldTree, Field } from "@angular/forms/signals";
import { ReviewItem } from '../../models/dinner-review.model'
import { FieldWrapper } from '../field-wrapper/field-wrapper';
import { FieldStyleDirective } from  '../field-styling.directive';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [Field, FieldWrapper, FieldStyleDirective],
  templateUrl: './review-item-form.html',
  styleUrl: './review-item-form.scss',
})
export class ReviewItemForm {

  readonly header = input('');
  readonly field = input.required<FieldTree<ReviewItem>>();

}
