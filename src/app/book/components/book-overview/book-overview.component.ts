import {
  AfterViewInit,
  Component, computed, effect,
  ElementRef,
  Injector,
  runInInjectionContext,
  signal,
  Signal,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged, fromEvent, map, switchMap} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent],
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements AfterViewInit {
  @ViewChild('searchInput')
  searchInput: ElementRef | undefined

  selectedBook: Book | null = null;
  readonly books: Signal<Book[]>;

  queryResults = signal<string[]>([]);

  constructor(private readonly bookService: BookService, private readonly injector: Injector) {
    this.books = toSignal(bookService.findAll(), {initialValue: []});
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

  ngAfterViewInit(): void {
    effect(onCleanup => {
      const subscription = fromEvent<Event>(this.searchInput?.nativeElement, 'input')
        .pipe(
          map(event => {
            const searchInput = event.target as HTMLInputElement;
            return searchInput.value;
          }),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(query => this.bookService.search(query))
        ).subscribe(queryResults => {
          this.queryResults.set(queryResults);
      });
      onCleanup(() => subscription.unsubscribe())
    }, {injector: this.injector, allowSignalWrites: true});
  }
}
