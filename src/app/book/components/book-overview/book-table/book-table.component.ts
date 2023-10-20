import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Book} from "../../../model";

@Component({
  selector: 'ba-book-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookTableComponent {

  @Output()
  bookClicked = new EventEmitter<number>();

  @Input({required: true})
  books: Book[] | null | undefined;

  onBookClicked(id: number) {
    this.bookClicked.emit(id);
  }
}
