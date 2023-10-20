import {AfterViewInit, Component,  ElementRef, inject, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {BehaviorSubject, debounceTime, distinctUntilChanged, fromEvent, map, switchMap, tap} from 'rxjs';
import {ActivatedRoute,  Router, RouterLink, RouterModule} from "@angular/router";
import {BookApiService} from "../../services/book-api.service";

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

  readonly books$$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  bookApiService = inject(BookApiService);

  constructor(private readonly router: Router, private readonly activeRoute: ActivatedRoute
  ) {
    this.activeRoute.data
      .pipe(
        map(data=> data['books'])
      )
      .subscribe(books => {
      this.books$$.next(books);
    })
  }

  openBook(id: number) {
    void this.router.navigate([id], {relativeTo: this.activeRoute});
  }

  ngAfterViewInit(): void {
    fromEvent<Event>(this.searchInput?.nativeElement, 'input')
      .pipe(
        map(event => {
          const searchInput = event.target as HTMLInputElement;
          return searchInput.value;
        }),
        debounceTime(500),
        distinctUntilChanged(),
        tap((query) => void this.router.navigate([], {queryParams: {query}})),
        switchMap((query) => this.bookApiService.findByTitle(query))
      )
      .subscribe(books => {
        this.books$$.next(books);
      })
  }
}
