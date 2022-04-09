import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ApiModule, ApiSecurityModule, API_ROOT_URL_TOKEN } from '@app/api';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
    TuiButtonModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TuiRootModule,
    TuiSvgModule,
    TUI_SANITIZER,
} from '@taiga-ui/core';
import { TuiBadgeModule, TuiIslandModule } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { environment } from '../environments/environment';
import { BooksEffects } from './+state/books/books.effects';
import { booksReducer } from './+state/books/books.reducer';
import { collectionReducer } from './+state/books/collection.reducer';
import { AccountComponent } from './components/account/account.component';
import { AppComponent } from './components/app/app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { CollectionBooksComponent } from './components/collection-books/collection-books.component';
import { HeaderModule } from './components/header/header.module';
import { APP_ROUTES } from './routing/app.routes';
import { BaseBooksService, MockBooksService } from './services/books.service';

@NgModule({
    declarations: [AppComponent, AccountComponent, BookListComponent, CollectionBooksComponent],
    imports: [
        BrowserModule,

        StoreModule.forRoot({
            books: booksReducer,
            collection: collectionReducer,
        }),
        EffectsModule.forRoot([BooksEffects]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],

        RouterModule.forRoot(APP_ROUTES),

        HttpClientModule,
        ApiModule,
        ApiSecurityModule,

        BrowserAnimationsModule,
        TuiRootModule,
        TuiSvgModule,
        TuiBadgeModule,
        TuiButtonModule,
        TuiDialogModule,
        TuiNotificationsModule,
        TuiIslandModule,

        HeaderModule,
    ],
    providers: [
        { provide: API_ROOT_URL_TOKEN, useValue: environment.apiRootUrl },
        { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },

        { provide: BaseBooksService, useClass: MockBooksService },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
