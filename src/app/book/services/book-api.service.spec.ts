import {TestBed} from "@angular/core/testing";
import {BookApiService} from "./book-api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('BookApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [BookApiService]
    })
  })

  it("should load all books", (done) => {
    const mockedBody = [{
      "id": 1,
      "author": "Douglas Crockford TEst",
      "title": "JavaScript. The Good Parts"
    },
      {
        "id": 2,
        "author": "Victor Savkin",
        "title": "Angular Router"
      }];
    const bookApiService = TestBed.inject(BookApiService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    bookApiService.findAll().subscribe((books) => {
      expect(books.length).toBe(mockedBody.length);
      done();
    })

    httpTestingController.expectOne('/api/book').flush(mockedBody);

    httpTestingController.verify();
  })
})
