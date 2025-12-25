import { Component, inject, resource } from '@angular/core';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly api = inject(Api);

  
  readonly apiNumber = resource({
    loader: (options) => this.api.getRandomNumberAsync(options.abortSignal), 
    defaultValue: -1
  })

  reloadNumber() {
    console.log('Reload');
    this.apiNumber.reload();
    
  }

  setLocalValue(val: number) {
    console.log('setLocalValue', val);
    this.apiNumber.set(val);
  }
}
