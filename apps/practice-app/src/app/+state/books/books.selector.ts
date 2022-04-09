import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from '../../interfaces/books';

export const selectBooks = createFeatureSelector<ReadonlyArray<Book>>('books');

export const selectCollectionState = createFeatureSelector<ReadonlyArray<string>>('collection');

export const selectCollectionBooks = createSelector(selectBooks, selectCollectionState, (books, collection) => {
    return collection.map((bookId) => books.find((book) => book.id === bookId)).filter(Boolean);
});
