/* tslint:disable */
/* eslint-disable */
import { CatalogCategoryShort } from './catalog-category-short';
export interface CatalogCategoryExtended {
  children?: Array<CatalogCategoryExtended>;
  parent?: CatalogCategoryShort;
  slug: string;
  title: string;
  uid: string;
}
