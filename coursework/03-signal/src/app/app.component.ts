import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { mySignal } from './my-signal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly firstSignal = mySignal(42);
  readonly secondSignal =mySignal('Hello, Angular!');
  
  constructor() {
    console.log ('signal 1 ', this.firstSignal());
    console.log('signal 2 ', this.secondSignal());
  }
}
