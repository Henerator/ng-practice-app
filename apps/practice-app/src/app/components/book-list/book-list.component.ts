import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { addBookToCollection, removeBook, retrieveBookList } from '../../+state/books/books.action';
import { selectBooks } from '../../+state/books/books.selector';
import { Book } from '../../interfaces/books';
import { BaseBooksService } from '../../services/books.service';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnInit {
    books$ = this.store.select(selectBooks);

    constructor(
        private store: Store,
        private booksService: BaseBooksService,
        private notificationsService: TuiNotificationsService,
    ) {}

    ngOnInit(): void {
        this.booksService.getBooks().subscribe((books) => this.store.dispatch(retrieveBookList({ books })));
    }

    onRemove(id: string): void {
        this.store.dispatch(removeBook({ bookId: id }));
    }

    onAddToCollection(book: Book): void {
        this.store.dispatch(addBookToCollection({ bookId: book.id }));
        this.notificationsService
            .show(`${book.title} has been added to collection`, { status: TuiNotification.Success })
            .subscribe();
    }
}
