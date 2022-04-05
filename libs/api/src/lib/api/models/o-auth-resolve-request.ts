/* tslint:disable */
/* eslint-disable */
import { OAuthProviderType } from './o-auth-provider-type';
export interface OAuthResolveRequest {
  authRoute: string;
  code?: string;
  provider: OAuthProviderType;
  state?: string;
}
