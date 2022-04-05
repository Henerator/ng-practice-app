import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginResponse } from '../api/models';
import { SecurityHelperService } from './security-helper.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private securityHelperService: SecurityHelperService) {}

    private static requestCandidate(req: HttpRequest<unknown>): boolean {
        return (
            req.url.includes('/auth/login') ||
            req.url.includes('/auth/refreshToken') ||
            req.url.includes('/auth/signup')
        );
    }

    public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return TokenInterceptor.requestCandidate(req)
            ? next.handle(req).pipe(tap((event: HttpEvent<unknown>) => this.setTokens(event)))
            : next.handle(req);
    }

    private setTokens(event: HttpEvent<unknown>): void {
        if (event instanceof HttpResponse && (event as HttpResponse<LoginResponse>).body?.tokens?.refreshToken) {
            this.securityHelperService.setTokens(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                (event as HttpResponse<LoginResponse>).body!.tokens!.accessToken,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                (event as HttpResponse<LoginResponse>).body!.tokens!.refreshToken,
            );
        }
    }
}
