import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book, NewBook} from '../../model';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {map} from "rxjs";
import {BookApiService} from "../../services/book-api.service";
import {PanelComponent} from "../../../core/components/panel/panel.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BookFormService} from "./book-form.service";
import {ValidationMsgComponent} from "../../../core/components/validation-msg/validation-msg.component";

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink, PanelComponent, ReactiveFormsModule, ValidationMsgComponent],
  providers: [BookFormService],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  private bookApiService = inject(BookApiService)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private bookFormService = inject(BookFormService)
  bookForm = this.bookFormService.prepareForm();

  @Input('id')
  bookId: string | undefined;

  serverBook: Book | undefined;

  ngOnInit() {
    if (this.bookId) {
      this.activatedRoute.data
        .pipe(
          map(data => data['book'])
        )
        .subscribe((book) => {
            this.bookForm.reset(book);
            this.serverBook = book;
          }
        );
    }
  }


  getInputValuesAndNotifyOnBookChange(event: Event) {
    event.preventDefault();
    const bookFormValue = this.bookForm.getRawValue();
    if (this.bookId) {
      const updatedBook = {
        id: +this.bookId,
        ...bookFormValue
      } satisfies Book;
      this.bookApiService.saveBook(updatedBook).subscribe();
    } else {
      const updatedBook = {
        ...bookFormValue
      } satisfies NewBook;
      this.bookApiService.addBook(updatedBook)
        .subscribe(({id}) => this.router.navigate(['..', id], {relativeTo: this.activatedRoute}));
    }

  }
}
