import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, interval, map } from 'rxjs';


type Options = Record<string, string>;

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
readonly options$ = new BehaviorSubject<Options>({'r': 'Red', 'g': 'Green', 'b': 'Blue'});
readonly selectedKey$ = new BehaviorSubject<string>('b');

readonly selectedValue$ = combineLatest([this.options$, this.selectedKey$]).pipe(
  debounceTime(0),
  map(([options, key]) => options[key]),
  
);

switchOptions() {
  this.options$.next({'m': 'Magenta', 'c': 'Cyan', 'y': 'Yellow'});
  this.selectedKey$.next('c');
}

constructor() {
  this.selectedValue$.subscribe(console.log);
}
}