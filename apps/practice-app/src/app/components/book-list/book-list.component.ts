import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { addBookToCollection, loadBookList, removeBook } from '../../+state/books/books.action';
import { selectBooks } from '../../+state/books/books.selector';
import { Book } from '../../interfaces/books';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnInit {
    books$ = this.store.select(selectBooks);

    constructor(private store: Store, private notificationsService: TuiNotificationsService) {}

    ngOnInit(): void {
        this.store.dispatch(loadBookList());
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
