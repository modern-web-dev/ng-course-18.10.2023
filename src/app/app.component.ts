import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookOverviewComponent} from './book/components/book-overview/book-overview.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NavBarComponent} from "./core/components/nav-bar/nav-bar.component";

@Component({
  selector: 'ba-root',
  standalone: true,
  imports: [CommonModule, BookOverviewComponent, RouterOutlet, RouterLink, RouterLinkActive, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
