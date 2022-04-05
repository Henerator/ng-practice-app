/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/member-ordering,no-empty,@typescript-eslint/ban-types */
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { GetPostResponse } from '../models/get-post-response';
import { PostSearchResponse } from '../models/post-search-response';
import { SortOrder } from '../models/sort-order';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable()
export class PostsService extends BaseService {

  /** Path part for getPost */
  private static readonly GetPostPath = '/posts/getPost';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  public getPost(params: {
    uuid: string;
    lang?: string;
  }): Observable<GetPostResponse> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.GetPostPath, 'get');
    if (params) {
      rb.query('uuid', params.uuid, {});
      rb.query('lang', params.lang, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetPostResponse>;
      }),
      map((r: StrictHttpResponse<GetPostResponse>) => r.body as GetPostResponse),
    );
  }

  /** Path part for findPost */
  private static readonly FindPostPath = '/posts/findPost';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  public findPost(params?: {
    user?: string;
    category?: string;
    country?: string;
    text?: string;
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
    lang?: string;
  }): Observable<PostSearchResponse> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.FindPostPath, 'get');
    if (params) {
      rb.query('user', params.user, {});
      rb.query('category', params.category, {});
      rb.query('country', params.country, {});
      rb.query('text', params.text, {});
      rb.query('pageIndex', params.pageIndex, {});
      rb.query('pageSize', params.pageSize, {});
      rb.query('sortBy', params.sortBy, {});
      rb.query('sortOrder', params.sortOrder, {});
      rb.query('lang', params.lang, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PostSearchResponse>;
      }),
      map((r: StrictHttpResponse<PostSearchResponse>) => r.body as PostSearchResponse),
    );
  }

}
