import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, inject, Injector } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  number$ = interval(1000);
  number = toSignal(this.number$);
  private injector = inject(Injector);

  // 1. Create an observable called number$ that emits an integer value every second

  // 2. Convert the observable to a signal called number from the number$ observable.

  // 3. Add an element in the UI that displays the value of the 'number' signal.


  readonly myName = signal('John Doe');
  myName$ = toObservable(this.myName);
  // 4. Create an observable called myName$ from the "myName" signal

  // 5. Subscribe to myName$ and log the value to the console so that you log every name change from the UI.  

  constructor() {
    // 5. Subscribe to myName$ and log the value to the console so that you log every name change from the UI.
    this.myName$.subscribe(name => console.log('Name changed to:', name));
  }

  ngOnInit() {
    // 6. challenge - repeat steps 1 - 4 in this method
    const myNumber$ = interval(1000);
    const myNumber = toSignal(myNumber$, { injector: this.injector });
    
    myNumber$.subscribe(number => console.log('Number changed to:', number));
  }

}
