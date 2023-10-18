import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent],
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  selectedBook: Book | null = null;

  books: Book[] = [
    {
      id: 0,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: 1,
      author: 'Victor Savkin',
      title: 'Angular Router'
    },
    {
      id: 2,
      author: 'John Smith',
      title: 'Angular for Nerds'
    }
  ]

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
