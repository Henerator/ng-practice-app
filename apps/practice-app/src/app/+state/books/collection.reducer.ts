import { createReducer, on } from '@ngrx/store';
import { addBookToCollection, removeBook, removeBookFromCollection } from './books.action';

export const initialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
    initialState,
    on(removeBook, (state, { bookId }) => state.filter((id) => id !== bookId)),
    on(removeBookFromCollection, (state, { bookId }) => state.filter((id) => id !== bookId)),
    on(addBookToCollection, (state, { bookId }) => {
        if (state.includes(bookId)) return state;

        return [...state, bookId];
    }),
);
