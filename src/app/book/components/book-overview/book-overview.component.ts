import {Component, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {map, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent],
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  selectedBook: Book | null = null;
  readonly books$: Observable<Book[]>;

  constructor(private readonly bookService: BookService) {
    this.books$ = bookService.findAll();
  }

  selectBookOf(book: Book) {
    this.selectedBook = book;
  }

  isSelectedBookOf(book: Book) {
    return this.selectedBook === book;
  }

  updateBook(updatedBook: Book) {
    this.bookService.updateBook(updatedBook)
      .subscribe(
        justUpdatedBook => this.selectedBook = justUpdatedBook
      );
  }
}
