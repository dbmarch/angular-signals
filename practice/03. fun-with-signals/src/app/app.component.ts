import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  // 8. Set change detection strategy to OnPush
})
export class AppComponent {
  // 1. replace with a writeable signal with an initial value of 0
  readonly firstNumber = signal(0); 

  // 2. replace with a writeable signal with an initial value of 0
  readonly secondNumber = signal(0);

  // 3. replace with a computed signal that emits the sum of the first and second numbers
  readonly sum = computed(() => this.firstNumber()+ this.secondNumber());;

  setSecondSignalTo10() {
    this.secondNumber.set(10);
  }

  incrementFirstSignal() {
    // 5. increment the first number signal by 1 but only if it's less than 10
    this.firstNumber.update((val) => ( val < 10 ? val+1 : val));
  }

  incrementBothSignals() {
    // 6. increment both number signals by 1 with a maximum of 10
    this.firstNumber.update((val)=> (val < 10 ? val + 1 : val ));
    this.secondNumber.update((val)=> (val < 10 ? val + 1 : val ));
  }


  constructor() {
    // 7. Define an effect that displays both signals to the console whenever any of them changes
    effect(() => {
      console.log(`First number: ${this.firstNumber()}, Second number: ${this.secondNumber()}`);
    })
  }
}
