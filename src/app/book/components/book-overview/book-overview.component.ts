import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {BehaviorSubject, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs';
import {ActivatedRoute, Router, RouterLink, RouterModule} from "@angular/router";
import {BookApiService} from "../../services/book-api.service";
import {PanelComponent} from "../../../core/panel/panel.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [CommonModule, BookDetailsComponent, RouterLink, RouterModule, PanelComponent, ReactiveFormsModule],
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  searchInput = new FormControl<string>('Init value', {nonNullable: true});

  readonly books$$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  bookApiService = inject(BookApiService);

  constructor(private readonly router: Router, private readonly activeRoute: ActivatedRoute
  ) {
    this.activeRoute.data
      .pipe(
        map(data => data['books'])
      )
      .subscribe(books => {
        this.books$$.next(books);
      })
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((query) => void this.router.navigate([], {queryParams: {query}})),
        switchMap((query) => this.bookApiService.findByTitle(query))
      )
      .subscribe(books => {
        this.books$$.next(books);
      })
  }

  resetForm() {
    this.searchInput.reset();
  }

  openBook(id: number) {
    void this.router.navigate([id], {relativeTo: this.activeRoute});
  }
}
