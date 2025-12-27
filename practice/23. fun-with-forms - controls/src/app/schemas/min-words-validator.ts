import {customError, SchemaPath, LogicFn, validate} from '@angular/forms/signals'
export function minWords(path: SchemaPath<string>, minValue: number | LogicFn<string, number>){
   validate(path, ctx => {
      const value = ctx.value();
      const threshold = ctx.valueOf(path.role) === 'author' ? 10 : 5;
      // check that there are at least 10 words
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount < threshold) {
        return customError({
          kind: 'min-words',
          message: `Description needs to be at least ${threshold} words long (currently there are ${wordCount} words)`,
        });
      }
      return undefined;
   })
}