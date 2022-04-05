import { JwtPayload } from 'jwt-decode';

export interface IRequestUpdate {
    Authorization?: string;
}

export interface ITokenInMemory {
    value: string;
    payload: JwtPayload;
}

export interface ITokenData {
    value: string;
    isValid?: boolean;
}

export type ITokens = [ITokenData | null, ITokenData | null];

export type CookieKeys = '_AccessToken' | '_RefreshToken';
