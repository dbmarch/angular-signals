import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Change detection occurs on inputs and outputs
// OnPush is used to optimize performance by not checking for changes unless the input or output changes
// This is useful for large applications with many components
// OnPush is the default change detection strategy for Angular components
// OnPush is not suitable for all components, especially those that rely on external data sources or services
export class AppComponent {

  // Using interval to create an observable that emits a value every second
  // This observable can be used to trigger change detection in the component
  // The counter$ observable is used in the template to display the current value of the counter
  // The counter$ observable is also used to trigger the calculateValue function every second
  readonly counter$ = interval(1000);
  
  calculateValue() {
    console.log('Calculating value...');
    return 42;
  }

  constructor() {
  }
}
