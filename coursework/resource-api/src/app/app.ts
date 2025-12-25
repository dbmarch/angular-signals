import { Component, inject, signal, resource } from '@angular/core';
import { Api } from './services/api';
import { Numeric } from './components/numeric/numeric';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Numeric],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('resource-api');

  readonly api = inject(Api);

  readonly source = signal(50);

  readonly apiNumber = resource( {
    params: () => ({value: this.source() }),
    loader: (options) => this.api.mutiplyByFiveAsync(options.params.value),
    defaultValue: -1
});

  reloadNumber() {
    this.apiNumber.reload();
  }

  setLocalValue(val: number){
    this.apiNumber.set(val);
  }
  
  constructor() {
    this.apiNumber.status();
  }
}
