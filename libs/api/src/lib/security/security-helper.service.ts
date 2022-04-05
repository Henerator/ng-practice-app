import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, take } from 'rxjs';

import jwt_decode, { JwtPayload } from 'jwt-decode';

import { CookieManager } from './cookie-manager';
import { ITokenData, ITokenInMemory, ITokens } from './security.types';

@Injectable()
export class SecurityHelperService {
    private static readonly accessTTL = 1; // 1d (fallback value)
    private static readonly refreshTTL = 15; // 15d (fallback value)

    private accessTokenIM$: BehaviorSubject<ITokenInMemory | null> = new BehaviorSubject<ITokenInMemory | null>(null);
    private refreshTokenIM$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    private accessToken$: Observable<ITokenData | null> = this.accessTokenIM$.pipe(
        take(1),
        map((data: ITokenInMemory | null) =>
            data
                ? {
                      value: data.value,
                      isValid: data.payload.exp ? Date.now().valueOf() > data.payload.exp : true,
                  }
                : this.getAccessToken(),
        ),
    );
    private refreshToken$: Observable<ITokenData | null> = this.refreshTokenIM$.pipe(
        take(1),
        map((value: string | null) => (value ? { value } : this.getRefreshToken())),
    );

    public tokens$: Observable<ITokens> = combineLatest([this.accessToken$, this.refreshToken$]);

    //

    public setTokens(accessToken: string, refreshToken: string): void {
        const access = jwt_decode<JwtPayload>(accessToken);
        if (access?.sub) {
            CookieManager.setT(
                '_AccessToken',
                accessToken,
                access.exp ? new Date(access.exp * 1000).toUTCString() : SecurityHelperService.accessTTL,
            );
            const refresh = jwt_decode<JwtPayload>(refreshToken);
            CookieManager.setT(
                '_RefreshToken',
                refreshToken,
                refresh.exp ? new Date(refresh.exp * 1000).toUTCString() : SecurityHelperService.refreshTTL,
            );
            this.accessTokenIM$.next({
                value: accessToken,
                payload: access,
            });
            this.refreshTokenIM$.next(refreshToken);
        } else {
            this.deleteTokens();
        }
    }

    public deleteTokens(): void {
        CookieManager.removeT('_AccessToken');
        CookieManager.removeT('_RefreshToken');
        this.accessTokenIM$.next(null);
        this.refreshTokenIM$.next(null);
    }

    public getTokenIds(): [string | null, string | null] {
        const valueAccess = CookieManager.getT('_AccessToken');
        const valueRefresh = CookieManager.getT('_RefreshToken');
        return [
            valueAccess ? jwt_decode<JwtPayload>(valueAccess)?.jti || null : null,
            valueRefresh ? jwt_decode<JwtPayload>(valueRefresh)?.jti || null : null,
        ];
    }

    //

    private getAccessToken(): ITokenData | null {
        const value = CookieManager.getT('_AccessToken');
        if (!value) {
            return null;
        }
        const payload = jwt_decode<JwtPayload>(value);
        this.accessTokenIM$.next({
            value,
            payload,
        });
        return {
            value,
            isValid: payload.exp ? Date.now().valueOf() > payload.exp : true,
        };
    }

    private getRefreshToken(): ITokenData | null {
        const value = CookieManager.getT('_RefreshToken');
        if (!value) {
            return null;
        }
        this.refreshTokenIM$.next(value);
        return { value };
    }
}
