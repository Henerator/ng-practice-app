import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Book } from '../interfaces/books';
import { BOOKS_MOCK } from '../mocks/books.mock';

export abstract class BaseBooksService {
    abstract getBooks(): Observable<Array<Book>>;
}

@Injectable({ providedIn: 'root' })
export class MockBooksService extends BaseBooksService {
    getBooks(): Observable<Array<Book>> {
        return of(BOOKS_MOCK);
    }
}
