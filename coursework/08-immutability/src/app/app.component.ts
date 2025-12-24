import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly names = signal(['Alice', 'Bob', 'Charlie']);

  constructor() {
    setTimeout(() => {
      // this.names().push('David');

      // The array is immutable, so we need to create a new array
      this.names.update(names => [...names, 'David']);

      // The above is equivalent to but does not work because it mutates the array
      // this.names.update (names => {
      //   names.push('David');
      //   return names;
      // })

      console.log ('Adding David to the list of names', this.names());
    }, 1000);
    effect(() => {
      console.log('Names have changed:', this.names());
    })
  }
} 