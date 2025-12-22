import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, firstValueFrom, map } from 'rxjs';


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
readonly a$ = new BehaviorSubject<number>(1);
readonly b$ = new BehaviorSubject<number>(2);

readonly sum$ = combineLatest([this.a$, this.b$]).pipe(map(([a, b]) => a+b));

async incA() {
  const sum = await firstValueFrom (this.sum$);
  if (sum < 10) {
    this.a$.next(this.a$.value + 1);
  }
}



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