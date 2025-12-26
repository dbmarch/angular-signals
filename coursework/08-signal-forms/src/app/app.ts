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
      message: 'Email is required',
      when: (ctx) => ctx.valueOf(path.role) !== 'author'      
    });
    email(path.email, {
      message: 'Valid email address required'
    });
    minLength(path.description, 5, {
      message: 'Description must be great than 5 chars'
    });
    validate(path.description, (ctx) => {
      const value = ctx.value();

      const threshold = ctx.valueOf(path.role) === 'author'? 10 : 5;

      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount < threshold) {
        return customError({
          kind: 'min-words',
          message: `${wordCount} /  ${threshold} words`
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
