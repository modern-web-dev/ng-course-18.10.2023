import {ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
  selector: 'ba-typeahead',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeaheadComponent implements OnInit {
  searchInput = new FormControl<string>('');

  @Output()
  inputChanged = new EventEmitter<string | null>();

  @Input()
  defaultValue: string | undefined = '';

  constructor() {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(val => this.inputChanged.emit(val))
  }

  resetForm() {
    this.searchInput.reset();
  }

  ngOnInit(): void {
    this.searchInput.reset(this.defaultValue, {emitEvent: false})
  }
}
