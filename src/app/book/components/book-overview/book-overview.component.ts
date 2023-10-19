import {AfterViewInit, Component, effect, ElementRef, Query, Signal, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged, fromEvent, map} from 'rxjs';
import {ActivatedRoute, Route, Router, RouterLink, RouterModule} from "@angular/router";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent, RouterLink, RouterModule],
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements AfterViewInit {
  @ViewChild('searchInput')
  searchInput: ElementRef | undefined

  readonly books: Signal<Book[]>;

  constructor(bookService: BookService, private readonly router: Router, private readonly activeRoute: ActivatedRoute
  ) {
    this.books = toSignal(bookService.findAll(), {initialValue: []});
  }

  openBook(id: number) {
    this.router.navigate([id], {relativeTo: this.activeRoute});
  }

  ngAfterViewInit(): void {
    fromEvent<Event>(this.searchInput?.nativeElement, 'input')
      .pipe(
        map(event => {
          const searchInput = event.target as HTMLInputElement;
          return searchInput.value;
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(query => {
        void this.router.navigate([], {queryParams: {query}})
        console.log('Native: ', query);
      })
  }
}
