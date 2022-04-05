import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { API_ROOT_URL_TOKEN, ApiModule, ApiSecurityModule } from '@app/api';
import { TUI_SANITIZER, TuiDialogModule, TuiNotificationsModule, TuiRootModule } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

import { environment } from '../environments/environment';
import { AppEffects } from './+state/app.effects';
import { APP_REDUCER_TOKEN } from './+state/app.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,

        StoreModule.forRoot(APP_REDUCER_TOKEN, {
            metaReducers: !environment.production ? [] : [],
            runtimeChecks: {
                strictActionImmutability: true,
                strictStateImmutability: true,
            },
        }),
        EffectsModule.forRoot(AppEffects),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        AppRoutingModule,

        HttpClientModule,
        ApiModule,
        ApiSecurityModule,

        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiNotificationsModule,
    ],
    providers: [
        { provide: API_ROOT_URL_TOKEN, useValue: environment.apiRootUrl },
        { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
