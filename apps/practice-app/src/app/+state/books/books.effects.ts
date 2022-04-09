import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { BaseBooksService } from '../../services/books.service';
import { BooksAction, loadBookList, removeBook, retrieveBookList } from './books.action';

@Injectable()
export class BooksEffects {
    loadBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBookList),
            mergeMap(() => {
                return this.booksService.getBooks().pipe(
                    map((books) => retrieveBookList({ books })),
                    catchError(() => of({ type: BooksAction.LoadError })),
                );
            }),
        ),
    );

    removeBookas$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeBook),
            switchMap((action) => {
                return this.booksService.removeBook(action.bookId).pipe(
                    map(() => loadBookList()),
                    catchError(() => of({ type: BooksAction.LoadError })),
                );
            }),
        ),
    );

    constructor(private actions$: Actions, private booksService: BaseBooksService) {}
}
