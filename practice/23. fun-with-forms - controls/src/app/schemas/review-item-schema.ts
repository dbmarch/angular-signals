
import {ReviewItem} from '../models/dinner-review.model'
import {
  customError,
  max,
  min,
  validateTree,
  schema,
  disabled,
  readonly
} from '@angular/forms/signals';

export const reviewItemSchema = schema<ReviewItem>(path=> {
   min(path.rating, 1, {
      message: 'Min 1',
   });

   max(path.rating, 5, {
      message: 'Max 5',
   });

   // disabled(path.rating, ctx => ctx.valueOf(path.recommendation) === 'no-opinion');
   readonly(path.rating, ctx => ctx.valueOf(path.recommendation) === 'no-opinion');

   validateTree(path, (ctx) => {
      const rating = ctx.valueOf(path.rating);
      const recommendation = ctx.valueOf(path.recommendation);
      if (rating >= 4 && recommendation === 'not-recommend') {
         return [
         customError({
            kind: 'rating-conflict',
            message: 'Rating Conflict',
            field: ctx.field.rating,
         }),
         customError({
            kind: 'rating-conflict',
            message: 'Rating Conflict',
            field: ctx.field.recommendation,
         }),
         ];
      }

      return undefined;
   });

});