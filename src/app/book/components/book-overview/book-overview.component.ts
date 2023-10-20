import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {map, merge, Observable, Subject, switchMap, tap} from 'rxjs';
import {ActivatedRoute, Router, RouterLink, RouterModule} from "@angular/router";
import {BookApiService} from "../../services/book-api.service";
import {PanelComponent} from "../../../core/components/panel/panel.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TypeaheadComponent} from "./typeahead/typeahead.component";
import {BookTableComponent} from "./book-table/book-table.component";

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent, RouterLink, RouterModule, PanelComponent, ReactiveFormsModule, TypeaheadComponent, BookTableComponent],
  templateUrl: './book-overview.component.html',
})
export class BookOverviewComponent {
  @Input()
  query: string | undefined;

  readonly books$: Observable<Book[]>;

  readonly typeaheadQuery = new Subject<string | null>();

  bookApiService = inject(BookApiService);

  constructor(private readonly router: Router, private readonly activeRoute: ActivatedRoute
  ) {
    const booksFromRouter$ = this.activeRoute.data
      .pipe(
        map(data => data['books'])
      );
    const booksFromTypeahead$ = this.typeaheadQuery.pipe(
      tap((query) => void this.router.navigate([], {queryParams: {query}})),
      switchMap(query => this.bookApiService.findByTitle(query))
    );
    this.books$ = merge(booksFromRouter$, booksFromTypeahead$);
  }

  onTypeaheadChanged(query: string | null) {
    this.typeaheadQuery.next(query);
  }

  onBookClicked(id: number) {
    void this.router.navigate([id], {relativeTo: this.activeRoute});
  }
}
