import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DinnerReview } from './models/dinner-review.model';
import { customError, email, Field, form, minLength, required, validate } from '@angular/forms/signals'
import { ValueChangeEvent } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Field],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly model = signal<DinnerReview>({
    username: '',
    role: 'user',
    email: '',
    description: '',
    rating: 1,
  })

  // Validation Schema
  readonly reviewForm = form(this.model, path => {
    required(path.username, {
      message: 'Username is required'
    });
    required(path.email, {
      message: 'Email is required'
    });
    email(path.email, {
      message: 'Valid email address required'
    });
    minLength(path.description, 5, {
      message: 'Description must be great than 5 chars'
    });
    validate(path.description, (ctx) => {
      const value = ctx.value();

      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount < 10) {
        return customError({
          kind: 'min-words',
          message: `Description needs to be at least 10 words long.\n Wordcount: ${wordCount}`
        })
      }
      return undefined;
    })
  });

  

  constructor() {
    console.log (this.reviewForm());
    const x = this.reviewForm();
  }
}
