import { Component, input, model, signal, inject } from '@angular/core';
import { Book } from '../../models/book';
import { Busy } from "../busy/busy";
import { StateService } from '../../services/state-service';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [Busy],
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss',
})
export class BooksList {
  readonly selectedBookId = signal<string>('27eec969-1138-43c3-9e11-fe92cda1e892');
  readonly state = inject(StateService);
  
  }
