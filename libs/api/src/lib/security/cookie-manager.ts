import { CookieKeys } from './security.types';

interface IAttributes {
    expires?: number | string;
    Secure?: true;
    HttpOnly?: true;
    domain?: string;
    path?: '' | '/' | string;
    SameSite?: 'Strict' | 'Lax' | 'None';
    priority?: 'high' | 'medium' | 'low';
}
type TAttrValue = number | string | true;
type TAttributes = IAttributes & Record<string, TAttrValue>;

export class CookieManager {
    public static set(key: string, value: string, attributes: TAttributes): void {
        if (typeof document === 'undefined') {
            return;
        }

        const attribs: TAttributes = { ...attributes };

        if (typeof attribs.expires === 'number') {
            attribs.expires = new Date(Date.now() + attribs.expires * 864e5).toUTCString();
        }

        const cookieKey: string = encodeURIComponent(key)
            .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
            .replace(/[()]/g, escape);

        const cookieValue: string = CookieManager.conWrite(value);

        const attribsStr: string = Object.entries(attribs)
            .map(([attrKey, attrVal]: [string, TAttrValue]) =>
                attrVal === true ? attrKey : `${attrKey}=${String(attrVal).split(';')[0]}`,
            )
            .join('; ');

        // eslint-disable-next-line unicorn/no-document-cookie
        document.cookie = `${cookieKey}=${cookieValue}; ${attribsStr}`;
    }

    public static setT(key: CookieKeys, value: string, expires: number | string): void {
        CookieManager.set(key, value, {
            expires,
            Secure: true,
            path: '/',
            SameSite: 'Strict',
            priority: 'high',
        });
    }

    public static get(key: string): string | null {
        if (typeof document === 'undefined' || (arguments.length > 0 && !key)) {
            return null;
        }

        const cookies: string[] = document.cookie?.split('; ') || [];
        const jar: Record<string, string> = {};

        // eslint-disable-next-line no-plusplus,unicorn/no-for-loop
        for (let i = 0; i < cookies.length; i++) {
            const parts: string[] = cookies[i].split('=');
            let value: string = parts.slice(1).join('=');

            if (value[0] === '"') {
                value = value.slice(1, -1);
            }

            try {
                const foundKey: string = CookieManager.conRead(parts[0]);
                jar[foundKey] = CookieManager.conRead(value);

                if (key === foundKey) {
                    break;
                }
            } catch {
                //
            }
        }

        return key ? jar[key] : null;
    }

    public static getT(key: CookieKeys): string | null {
        return CookieManager.get(key);
    }

    public static remove(key: string, attributes: TAttributes): void {
        return CookieManager.set(key, '', attributes);
    }

    public static removeT(key: CookieKeys): void {
        CookieManager.set(key, '', {
            expires: 0,
            Secure: true,
            path: '/',
            SameSite: 'Strict',
            priority: 'low',
        });
    }

    protected static conRead(value: string): string {
        return value.replace(/(%[\da-f]{2})+/gi, decodeURIComponent);
    }

    protected static conWrite(value: string): string {
        return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[B-D])/g, decodeURIComponent);
    }
}
