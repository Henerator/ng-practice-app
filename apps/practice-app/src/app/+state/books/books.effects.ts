import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BaseBooksService } from '../../services/books.service';
import { BooksAction, retrieveBookList } from './books.action';

@Injectable()
export class BooksEffects {
    loadBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksAction.Load),
            mergeMap(() => {
                return this.booksService.getBooks().pipe(
                    map((books) => retrieveBookList({ books })),
                    catchError(() => of({ type: BooksAction.LoadError })),
                );
            }),
        ),
    );

    constructor(private actions$: Actions, private booksService: BaseBooksService) {}
}
