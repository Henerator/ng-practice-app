import { createAction, props } from '@ngrx/store';
import { Book } from '../../interfaces/books';

export enum BooksAction {
    Load = '[Book List] Load Books',
    LoadError = '[Book List] Load Books Error',
    Retrieve = '[Book List] Retrieve Books',
    Remove = '[Book List] Remove Book',
    AddToCollection = '[Book Collection] Add Book',
    RemoveFromCollection = '[Book Collection] Remove Book',
}

export const loadBookList = createAction(BooksAction.Load);

export const retrieveBookList = createAction(BooksAction.Retrieve, props<{ books: ReadonlyArray<Book> }>());

export const removeBook = createAction(BooksAction.Remove, props<{ bookId: string }>());

export const addBookToCollection = createAction(BooksAction.AddToCollection, props<{ bookId: string }>());

export const removeBookFromCollection = createAction(BooksAction.RemoveFromCollection, props<{ bookId: string }>());
