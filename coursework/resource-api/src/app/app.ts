import { Component, inject, signal, resource } from '@angular/core';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('resource-api');

  readonly api = inject(Api);

  readonly apiNumber = resource( {
    loader: () => this.api.getRandomNumberAsync(),
    defaultValue: -1
});

  reloadNumber() {
    this.apiNumber.reload();
  }

  constructor() {
    this.apiNumber.status();
  }
}
