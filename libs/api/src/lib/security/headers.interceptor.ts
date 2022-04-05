import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';

import { API_ROOT_URL_TOKEN } from '../api/api-configuration';
import { LoginResponse } from '../api/models';
import { AuthService } from '../api/services';
import { IRequestUpdate, ITokens } from './security.types';
import { SecurityHelperService } from './security-helper.service';

export const API_CID_TOKEN: InjectionToken<string> = new InjectionToken<string>('_API_CID_TOKEN');

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    private readonly onlyRefreshHeaders: RegExp = new RegExp(`${this.rootUrl}/auth/refreshToken`, 'i');

    constructor(
        @Inject(API_ROOT_URL_TOKEN) protected rootUrl: string,
        @Inject(API_CID_TOKEN) private clientId: string,
        private authService: AuthService,
        private securityHelperService: SecurityHelperService,
    ) {}

    public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return (this.onlyRefreshHeaders.test(req.url) ? this.getRefreshHeaders() : this.getHeaders()).pipe(
            concatMap((reqUpdate: IRequestUpdate) =>
                next.handle(req.clone<unknown>(reqUpdate as unknown as Record<string, string>)),
            ),
        );
    }

    public getHeaders(): Observable<IRequestUpdate> {
        return combineLatest([this.securityHelperService.tokens$]).pipe(
            switchMap(([[accessToken, refreshToken]]: [ITokens]) => {
                if (!refreshToken?.value) {
                    return of({
                        setHeaders: {},
                    } as IRequestUpdate);
                }
                return accessToken?.isValid
                    ? of({
                          setHeaders: {
                              Authorization: `Bearer ${accessToken.value}`,
                          },
                      } as IRequestUpdate)
                    : this.refreshAccessToken();
            }),
        );
    }

    public deleteTokens(): void {
        this.securityHelperService.deleteTokens();
    }

    public getTokenIds(): [string | null, string | null] {
        return this.securityHelperService.getTokenIds();
    }

    private refreshAccessToken(): Observable<IRequestUpdate> {
        return this.authService.refreshToken().pipe(
            map((response: LoginResponse) =>
                response.tokens?.accessToken
                    ? ({
                          setHeaders: {
                              Authorization: `Bearer ${response.tokens.accessToken}`,
                          },
                      } as IRequestUpdate)
                    : ({ setHeaders: {} } as IRequestUpdate),
            ),
        );
    }

    private getRefreshHeaders(): Observable<IRequestUpdate> {
        return this.securityHelperService.tokens$.pipe(
            map(([, refreshToken]: ITokens) =>
                refreshToken?.value
                    ? ({
                          setHeaders: {
                              Authorization: `Bearer ${refreshToken.value}`,
                          },
                      } as IRequestUpdate)
                    : ({ setHeaders: {} } as IRequestUpdate),
            ),
        );
    }
}
