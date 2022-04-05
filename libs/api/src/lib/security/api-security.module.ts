import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { HeadersInterceptor } from './headers.interceptor';
import { SecurityHelperService } from './security-helper.service';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
    providers: [
        SecurityHelperService,

        HeadersInterceptor,
        TokenInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
})
export class ApiSecurityModule {}
