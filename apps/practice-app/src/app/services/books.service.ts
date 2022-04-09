import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Book } from '../interfaces/books';
import { BOOKS_MOCK } from '../mocks/books.mock';

export abstract class BaseBooksService {
    abstract getBooks(): Observable<Array<Book>>;
    abstract removeBook(id: string): Observable<boolean>;
}

@Injectable({ providedIn: 'root' })
export class MockBooksService implements BaseBooksService {
    private data = BOOKS_MOCK.slice();

    getBooks(): Observable<Array<Book>> {
        return of(this.data);
    }

    removeBook(id: string): Observable<boolean> {
        this.data = this.data.filter((book) => book.id !== id);
        return of(true);
    }
}
