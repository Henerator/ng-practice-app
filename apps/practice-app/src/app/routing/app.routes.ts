import { Routes } from '@angular/router';
import { AccountComponent } from '../components/account/account.component';
import { BookListComponent } from '../components/book-list/book-list.component';
import { CollectionBooksComponent } from '../components/collection-books/collection-books.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: 'account',
                component: AccountComponent,
            },
            {
                path: 'books',
                component: BookListComponent,
            },
            {
                path: 'collection',
                component: CollectionBooksComponent,
            },
        ],
    },
    { path: '**', redirectTo: 'home' },
];
