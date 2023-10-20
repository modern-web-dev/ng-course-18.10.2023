// import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
// import {BookService} from "../../services/book.service";
// import {BookOverviewComponent} from "./book-overview.component";
// import {BehaviorSubject} from "rxjs";
//
// class BookServiceMock {
//   findAll() {
//     return new BehaviorSubject([
//       {
//         id: 0,
//         author: 'Douglas Crockford',
//         title: 'JavaScript. The Good Parts'
//       }])
//   }
// }
//
// fdescribe('BookOverviewComponent', () => {
//   let component: ComponentFixture<BookOverviewComponent>;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [BookOverviewComponent],
//       providers: [{provide: BookService, useClass: BookServiceMock}]
//     })
//
//     component = TestBed.createComponent(BookOverviewComponent);
//   })
//
//   describe('(DOM)', () => {
//     it('should render the component', () => {
//       const comp = component.nativeElement as HTMLElement;
//       expect(comp).toBeTruthy();
//       expect(comp.querySelector('input')).toBeDefined();
//       expect(comp.querySelector('li')?.innerHTML).toBe('');
//     })
//
//     it('should fill the typeahead', () => {
//       const comp = component.nativeElement as HTMLElement;
//       let inputElement = comp.querySelector<HTMLInputElement>('input') as HTMLInputElement;
//       inputElement.value = "TEST";
//
//       component.detectChanges();
//
//       let typeaheadOutput = comp.querySelector('li');
//       expect(typeaheadOutput).toBeDefined();
//       expect(typeaheadOutput?.innerHTML).toBe('TEST');
//     })
//
//     it('should render the list with elements', () => {
//       const comp = component.nativeElement as HTMLElement;
//       expect(comp).toBeTruthy();
//       component.detectChanges();
//
//       expect(comp.querySelectorAll('tr')?.length).toBe(1 + 1);
//     })
//   })
// })
