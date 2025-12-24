import {
  computed,
  Directive,
  input,
  signal,
} from '@angular/core';
import { interval } from 'rxjs';

@Directive({
  selector: '[appRgb]',
  standalone: true,
  host: {
    '[style.color]': 'color()', 
    '(click)': 'invert()'
  }
})
export class RgbDirective {
  readonly red = input(0);
  readonly green = input(0);
  readonly blue = input(0);

  readonly inverted = signal(false);


  readonly color = computed(() =>
    this.inverted()
      ? `rgb(${255 - this.red()}, ${255 - this.green()}, ${255 - this.blue()})`
      : `rgb(${this.red()}, ${this.green()}, ${this.blue()})`
  );

  invert() {
    console.log('invert');
    this.inverted.update((v) => !v);
  }

  // constructor() {
  //   interval(1000).subscribe(() => {
  //     this.invert();
  //   })
  // }
}
