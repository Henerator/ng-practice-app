/* tslint:disable */
/* eslint-disable */
import { PaginationData } from './pagination-data';
import { PostShort } from './post-short';
export interface PostSearchResponse {
  pagination: PaginationData;
  results: Array<PostShort>;
}
