import { inject, Injectable, linkedSignal, resource, signal } from '@angular/core';
import { Book } from '../models/book';
import { httpResource, HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ResourceStreamItem } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  readonly apiBase: string = 'http://localhost:3000/api/books';
  readonly wsBase: string = 'ws://localhost:3000/ws';
  readonly http = inject(HttpClient);

// Private signals
  #keyword = signal<string>('the');

// this is how you implement with resource
  // #searchResults = resource({
  //   params: () => ({ keyword: this.#keyword()}),
  //   loader: (options) => this.#searchkeywordPromise(options.params.keyword, options.abortSignal),
  //   defaultValue: []
  // })
  #searchResults = httpResource<Book[]>(() => ({
    url: `${this.apiBase}/search`,
    params: { q: this.#keyword() }, 
  }), {
      defaultValue: []
    }
  );

  #selectedBookId = linkedSignal<Book[], string>({
    source: () => this.#searchResults.value(),
    computation:  (src, prev) => {
      if (!prev) {
        return src.length > 0 ? src[0].id : '';
      }
      if (prev.value === '' && src.length > 0) {
        return src[0].id;
      }
      return prev.value;
    }, 
  })

  #selectedBook = rxResource ({
    params: () => {
      console.log(this.#selectedBookId())
      return ({ id: this.#selectedBookId() })},
    stream: (options) => options.params.id  
        ? this.http.get<Book>(`${this.apiBase}/${options.params.id}`) 
        : of(null),
    defaultValue: null
  })

  #selectedStock = resource({
    params: () => ({id: this.#selectedBookId()}),
    // async makes the function return a promise.
    stream: async (options) => {
      const res = signal<ResourceStreamItem<number>>({value: 0});
      if (options.params.id) {
        const ws = new WebSocket(`${this.wsBase}/stock/${options.params.id}`)
        
        ws.onmessage = (event ) => {
          const data = JSON.parse(event.data);
          if (data?.stock !== undefined) {
            console.log('data', data)
            res.set({value: data.stock});
          }
        }

        options.abortSignal.addEventListener('abort', () => {
          console.log ("closing ws");
          ws.close();
        });

      }
      return res;
    }
    })

  get keyword() {
    return this.#keyword.asReadonly();
  }

  get searchResults() {
    // all signals in resource are available and are readonly
    return this.#searchResults.asReadonly();
  }

  get selectedBookId() {
    return this.#selectedBookId.asReadonly();
  }

  get selectedBook() {
    return this.#selectedBook.asReadonly();
  }

  get selectedStock() {
    return this.#selectedStock.asReadonly();
  }

  setKeyword(value: string) {
    this.#keyword.set(value);
    // console.log (this.keyword())
  }

  setSelectedBookId(value:string) {
    this.#selectedBookId.set(value);
  }


#searchkeywordPromise(value: string, abortSignal?: AbortSignal ): Promise<Book[]> {
  return fetch(`${this.apiBase}/search/?q=${value}`, {signal: abortSignal})
      .then( resp => resp.json())
}

constructor() {}

}
