import { createReducer, on } from '@ngrx/store';
import { Book } from '../../interfaces/books';
import { removeBook, retrieveBookList } from './books.action';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
    initialState,
    on(retrieveBookList, (_, { books }) => books),
    on(removeBook, (state, { bookId }) => state.filter((book) => book.id !== bookId)),
);
