import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book} from '../../model';
import {BookService} from "../../services/book.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {map, switchMap} from "rxjs";
import {BookApiService} from "../../services/book-api.service";

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  private bookApiService = inject(BookApiService)
  private activatedRoute = inject(ActivatedRoute)

  book: Book | undefined | null;

  ngOnInit() {
    this.activatedRoute.data
      .pipe(
        map(data=> data['book'])
      )
      .subscribe((book) => {
          this.book = book;
        }
      );
  }


  getInputValuesAndNotifyOnBookChange(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorInput = formElement.querySelector<HTMLInputElement>('#author');
    const titleInput = formElement.querySelector<HTMLInputElement>('#title');

    const updatedBook: Book = {
      id: this.book?.id!,
      author: authorInput?.value ?? '',
      title: titleInput?.value ?? ''
    }

    this.bookApiService.saveBook(updatedBook).subscribe();
  }
}
