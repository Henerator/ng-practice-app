/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/member-ordering,no-empty,@typescript-eslint/ban-types */
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { OAuthResolveRequest } from '../models/o-auth-resolve-request';
import { ResultStringResponse } from '../models/result-string-response';
import { SignupRequest } from '../models/signup-request';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable()
export class AuthService extends BaseService {

  /** Path part for signup */
  private static readonly SignupPath = '/auth/signup';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `signup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  public signup(params: {
    body: SignupRequest
  }): Observable<LoginResponse> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.SignupPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponse>;
      }),
      map((r: StrictHttpResponse<LoginResponse>) => r.body as LoginResponse),
    );
  }

  /** Path part for login */
  private static readonly LoginPath = '/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  public login(params: {
    body: LoginRequest
  }): Observable<LoginResponse> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.LoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponse>;
      }),
      map((r: StrictHttpResponse<LoginResponse>) => r.body as LoginResponse),
    );
  }

  /** Path part for loginWithOAuth */
  private static readonly LoginWithOAuthPath = '/auth/loginWithOAuth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginWithOAuth()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  public loginWithOAuth(params: {
    body: OAuthResolveRequest
  }): Observable<LoginResponse> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.LoginWithOAuthPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponse>;
      }),
      map((r: StrictHttpResponse<LoginResponse>) => r.body as LoginResponse),
    );
  }

  /** Path part for refreshToken */
  private static readonly RefreshTokenPath = '/auth/refreshToken';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  public refreshToken(params?: {
  }): Observable<LoginResponse> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.RefreshTokenPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponse>;
      }),
      map((r: StrictHttpResponse<LoginResponse>) => r.body as LoginResponse),
    );
  }

  /** Path part for logout */
  private static readonly LogoutPath = '/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout()` instead.
   *
   * This method doesn't expect any request body.
   */
  public logout(params?: {
  }): Observable<ResultStringResponse> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.LogoutPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ResultStringResponse>;
      }),
      map((r: StrictHttpResponse<ResultStringResponse>) => r.body as ResultStringResponse),
    );
  }

}
