import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { API_ROOT_URL_TOKEN } from './api-configuration';

/**
 * Base class for services
 */
@Injectable()
export class BaseService {

  constructor(
    @Inject(API_ROOT_URL_TOKEN) protected rootUrl: string,
    protected http: HttpClient,
  ) {
  }

}
