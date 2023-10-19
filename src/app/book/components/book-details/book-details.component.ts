import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book} from '../../model';
import {BookService} from "../../services/book.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {map, switchMap} from "rxjs";

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit {
  // @Input("id")
  // bookId: string | undefined;

  private bookService = inject(BookService)
  private activatedRoute = inject(ActivatedRoute)

  book: Book | undefined | null;

  ngOnInit() {
    // if (this.bookId) {
    const bookIdNumber = +this.activatedRoute.snapshot.params['id']//+this.bookId;

    this.activatedRoute.paramMap.pipe(
      map((params) => params.get('id')),
      map((bookId) => parseInt(bookId as string)),
      switchMap((bookId) => this.bookService.findOne(bookId))
    )
      .subscribe((book) => {
          this.book = book;
        }
      );
    // }
  }
}
