import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent],
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  selectedBook: Book | null = null;
  books: Book[] = []

  constructor(bookService: BookService) {
    bookService.findAll()
      .then(allBooks => this.books = allBooks);
  }

  selectBookOf(book: Book) {
    this.selectedBook = book;
  }

  isSelectedBookOf(book: Book) {
    return this.selectedBook === book;
  }

  updateBook(updatedBook: Book) {
    this.books = this.books.map(
      book => book.id === updatedBook.id ? updatedBook : book);
    this.selectedBook = updatedBook;
  }
}
