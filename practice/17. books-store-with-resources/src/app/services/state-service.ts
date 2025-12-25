import { Injectable, resource, signal } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  readonly apiBase: string = 'http://localhost:3000/api/books';
  readonly wsBase: string = 'ws://localhost:3000/ws';
  #keyword = signal<string>('the');

  #searchResults = resource({
    params: () => ({ keyword: this.#keyword()}),
    loader: (options) => this.#searchkeywordPromise(options.params.keyword),
    defaultValue: []
  })

  get keyword() {
    return this.#keyword.asReadonly();
  }

  get searchResults() {
    // all signals in resource are available and are readonly
    return this.#searchResults.asReadonly();
  }

  setKeyword(value: string) {
    this.#keyword.set(value);
    // console.log (this.keyword())
  }

#searchkeywordPromise(value: string): Promise<Book[]> {
  return fetch(`${this.apiBase}/search/?q=${value}`)
    .then( resp => resp.json())
}



  constructor() {

  }
}
