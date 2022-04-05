/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/member-ordering,no-empty,@typescript-eslint/ban-types */
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { GetAccountResponse } from '../models/get-account-response';
import { ResultStringResponse } from '../models/result-string-response';
import { UpdateAccountRequest } from '../models/update-account-request';
import { UpdatePasswordRequest } from '../models/update-password-request';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable()
export class AccountService extends BaseService {

  /** Path part for updatePassword */
  private static readonly UpdatePasswordPath = '/account/updatePassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  public updatePassword(params: {
    body: UpdatePasswordRequest
  }): Observable<ResultStringResponse> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.UpdatePasswordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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

  /** Path part for updateAccount */
  private static readonly UpdateAccountPath = '/account/updateAccount';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAccount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  public updateAccount(params: {
    body: UpdateAccountRequest
  }): Observable<ResultStringResponse> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.UpdateAccountPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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

  /** Path part for getAccount */
  private static readonly GetAccountPath = '/account/getAccount';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  public getAccount(params?: {
  }): Observable<GetAccountResponse> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.GetAccountPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetAccountResponse>;
      }),
      map((r: StrictHttpResponse<GetAccountResponse>) => r.body as GetAccountResponse),
    );
  }

}
