import { createReducer, on } from '@ngrx/store';
import { Book } from '../../interfaces/books';
import { retrieveBookList } from './books.action';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
    initialState,
    on(retrieveBookList, (_, { books }) => books),
);
