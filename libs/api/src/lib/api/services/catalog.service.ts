/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/member-ordering,no-empty,@typescript-eslint/ban-types */
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { FeatureSearchResponse } from '../models/feature-search-response';
import { GetCategoryResponse } from '../models/get-category-response';
import { ListCategoriesResponse } from '../models/list-categories-response';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable()
export class CatalogService extends BaseService {

  /** Path part for listSections */
  private static readonly ListSectionsPath = '/catalog/listSections';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listSections()` instead.
   *
   * This method doesn't expect any request body.
   */
  public listSections(params?: {
    lang?: string;
  }): Observable<ListCategoriesResponse> {

    const rb = new RequestBuilder(this.rootUrl, CatalogService.ListSectionsPath, 'get');
    if (params) {
      rb.query('lang', params.lang, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ListCategoriesResponse>;
      }),
      map((r: StrictHttpResponse<ListCategoriesResponse>) => r.body as ListCategoriesResponse),
    );
  }

  /** Path part for getCategory */
  private static readonly GetCategoryPath = '/catalog/getCategory/{slug}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  public getCategory(params: {
    slug: string;
    lang?: string;
  }): Observable<GetCategoryResponse> {

    const rb = new RequestBuilder(this.rootUrl, CatalogService.GetCategoryPath, 'get');
    if (params) {
      rb.path('slug', params.slug, {});
      rb.query('lang', params.lang, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetCategoryResponse>;
      }),
      map((r: StrictHttpResponse<GetCategoryResponse>) => r.body as GetCategoryResponse),
    );
  }

  /** Path part for findFeature */
  private static readonly FindFeaturePath = '/catalog/findFeature';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFeature()` instead.
   *
   * This method doesn't expect any request body.
   */
  public findFeature(params: {
    sectionUid: string;
    lang?: string;
  }): Observable<FeatureSearchResponse> {

    const rb = new RequestBuilder(this.rootUrl, CatalogService.FindFeaturePath, 'get');
    if (params) {
      rb.query('sectionUid', params.sectionUid, {});
      rb.query('lang', params.lang, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FeatureSearchResponse>;
      }),
      map((r: StrictHttpResponse<FeatureSearchResponse>) => r.body as FeatureSearchResponse),
    );
  }

}
