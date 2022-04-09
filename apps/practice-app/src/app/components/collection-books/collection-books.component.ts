import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeBookFromCollection, retrieveBookList } from '../../+state/books/books.action';
import { selectCollectionBooks } from '../../+state/books/books.selector';
import { BaseBooksService } from '../../services/books.service';

@Component({
    selector: 'app-collection-books',
    templateUrl: './collection-books.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionBooksComponent implements OnInit {
    collection$ = this.store.select(selectCollectionBooks);

    constructor(private store: Store, private booksService: BaseBooksService) {}

    ngOnInit(): void {
        this.booksService.getBooks().subscribe((books) => this.store.dispatch(retrieveBookList({ books })));
    }

    onRemove(id?: string): void {
        if (id) {
            this.store.dispatch(removeBookFromCollection({ bookId: id }));
        }
    }
}
