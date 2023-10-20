import {BookOverviewComponent} from "./components/book-overview/book-overview.component";
import {booksResolver} from "./services/books.resolver";
import {BookDetailsComponent} from "./components/book-details/book-details.component";
import {onlyForLoggedIdGuard} from "../core/guards/only-for-logged-in.guard";
import {bookResolver} from "./services/book.resolver";
import {persistedGuard} from "../core/guards/persisted.guard";

export const bookRoutes = [
  {
    path: 'book',
    component: BookOverviewComponent,
    resolve: {
      books: booksResolver
    }
  },
  {
    path: 'book/new',
    component: BookDetailsComponent,
    canActivate: [onlyForLoggedIdGuard],
    canDeactivate: [persistedGuard]
  },
  {
    path: 'book/:id',
    component: BookDetailsComponent,
    resolve: {book: bookResolver},
    canActivate: [onlyForLoggedIdGuard],
    canDeactivate: [persistedGuard]
  }];
