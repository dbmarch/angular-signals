import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly number = signal(10);
  readonly number$ = toObservable(this.number);
  readonly results = this.number$.pipe(
    switchMap(n => this.api.getPrimeFactors(n))
  )

  readonly api = inject(ApiService);

  readonly primeFactors = toSignal(this.results, { 
    initialValue: [],
    manualCleanup: false
 });

  increase() {
    this.number.update(n => n + 1);
  }

  decrease() {
    this.number.update(n => Math.max(n - 1, 3));
  }

constructor () {
  this.number$.subscribe( n=> {
    this.number$.subscribe( n => console.log ('Observable subscription 1', n));
    console.log ("Creating 2nd subcription")
    setTimeout(() => {
      this.number$.subscribe(n => console.log('Observable subscription 2', n));
    }, 5000);
  })
}

}

