import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Book} from '../../model';

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input("value")
  book: Book | undefined | null;

  @Output("valueChange")
  bookChange = new EventEmitter<Book>()

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
    this.bookChange.emit(updatedBook);
  }
}
