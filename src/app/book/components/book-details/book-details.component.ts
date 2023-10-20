import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book} from '../../model';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {map} from "rxjs";
import {BookApiService} from "../../services/book-api.service";
import {PanelComponent} from "../../../core/panel/panel.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink, PanelComponent, ReactiveFormsModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  private bookApiService = inject(BookApiService)
  private activatedRoute = inject(ActivatedRoute)


  bookForm = new FormGroup({
    title: new FormControl('', {nonNullable: true, validators: [Validators.minLength(10)]}),
    author: new FormGroup({
      firstName: new FormControl('', {nonNullable: true, validators: [Validators.minLength(10), Validators.maxLength(20)]}),
      lastName: new FormControl('', {nonNullable: true})
    })
  });

  @Input('id')
  bookId!: string;

  serverBook: Book | undefined;

  ngOnInit() {
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


  getInputValuesAndNotifyOnBookChange(event: Event) {
    event.preventDefault();
    const bookFormValue = this.bookForm.getRawValue();
    // const bookFormValue = this.bookForm.value;
    const updatedBook = {
      id: +this.bookId!,
      ...bookFormValue
    }

    this.bookApiService.saveBook(updatedBook).subscribe();
  }
}
