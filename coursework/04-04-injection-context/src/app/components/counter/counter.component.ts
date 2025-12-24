import { Component, DestroyRef, inject, Injector, OnInit, runInInjectionContext } from '@angular/core';
import { interval } from 'rxjs';
import { startCounting } from '../../util';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent  implements OnInit {
  readonly destroyRef = inject(DestroyRef);
  private injector  = inject(Injector);


  constructor() {   // private destroyRef: DestroyRef) {
    // const sub = interval(1000).subscribe(console.log);
    // this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  ngOnInit(): void {
    // Can't inject in ngOnInit
    // const dr = inject(DestroyRef);

    runInInjectionContext(this.injector, () => {
      startCounting();
    });
  }

}
