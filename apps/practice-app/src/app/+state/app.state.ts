import { Book } from '../interfaces/books';

export interface AppState {
    books: ReadonlyArray<Book>;
    collection: ReadonlyArray<string>;
}
