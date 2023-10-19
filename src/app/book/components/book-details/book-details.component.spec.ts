import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {BookDetailsComponent} from "./book-details.component";
import {delay} from "rxjs";


describe('BookDetailsComponent', () => {
  let fixture: ComponentFixture<BookDetailsComponent>;
  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BookDetailsComponent],
      })

      fixture = TestBed.createComponent(BookDetailsComponent);
    }
  );
  describe('(DOM)', () => {
    it('should render form', () => {
      const comp = fixture.nativeElement as HTMLElement;
      expect(comp).toBeTruthy();
      expect(comp.querySelectorAll('input')?.length).toBe(2);
    })

    it('should populate inputs data', () => {
      const nativeElement = fixture.nativeElement as HTMLElement;
      const compInstance = fixture.componentInstance;

      compInstance.book = {
        id: 0,
        author: 'Douglas Crockford',
        title: 'JavaScript. The Good Parts'
      }
      fixture.detectChanges();

      let authorInputElement = nativeElement.querySelector<HTMLInputElement>('#author');
      expect(authorInputElement?.value).toBe("Douglas Crockford");
    })
    it('should emit submit event on submit click', (done) => {
      const nativeElement = fixture.nativeElement as HTMLElement;
      const compInstance = fixture.componentInstance;

      compInstance.book = {
        id: 0,
        author: 'Douglas Crockford',
        title: 'JavaScript. The Good Parts'
      }
      fixture.detectChanges();
      let authorInputElement = nativeElement.querySelector<HTMLInputElement>('#author') as HTMLInputElement;
      authorInputElement.value = "Antek Crockford"

      compInstance.bookChange
        .subscribe((book) => {
          expect(book).toBeDefined();
          expect(book.author).toBe("Antek Crockford");
          done();
        })

      let buttonElement = nativeElement.querySelector<HTMLInputElement>('button') as HTMLButtonElement;
      buttonElement.click();
    })
  })
  describe('(Class)', () => {
    it('emit event', fakeAsync(() => {
      const compInstance = fixture.componentInstance;

      compInstance.bookChange
        .pipe(
          delay(1000)
        )
        .subscribe((book) => {
          expect(book).toBeDefined();
          expect(book.author).toBe('updated author')
        })

      const event: any = {
        preventDefault: jasmine.createSpy('preventDefault'),
        target: {
          querySelector: (selector: string) => {
            const value = selector === '#author' ? 'updated author' : 'updated title';
            return {value}
          }
        }
      }

      compInstance.getInputValuesAndNotifyOnBookChange(event);
      tick(2_000)
    }))
  })
})
