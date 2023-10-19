import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookOverviewComponent} from './book/components/book-overview/book-overview.component';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'ba-root',
  standalone: true,
  imports: [CommonModule, BookOverviewComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
