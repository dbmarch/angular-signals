import { Component, input } from '@angular/core';
import { FieldTree } from "@angular/forms/signals";
import { ReviewItem } from './'
@Component({
  selector: 'app-review-item-form',
  standalone: true,
  imports: [],
  templateUrl: './review-item-form.html',
  styleUrl: './review-item-form.scss',
})
export class ReviewItemForm {

  readonly header = input('');
  readonly field = input.required<FieldTree<ReviewItem>>();

}
