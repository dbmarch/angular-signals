import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  readonly apiBase: string = 'http://localhost:3000/api/books';
  readonly wsBase: string = 'ws://localhost:3000/ws';
  #keyword = signal<string>('the');



  get keyword() {
    return this.#keyword.asReadonly();
  }

  setKeyword(value: string) {
    this.#keyword.set(value);
    console.log (this.keyword())
  }
  constructor() {

  }
}
