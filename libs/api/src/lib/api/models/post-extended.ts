/* tslint:disable */
/* eslint-disable */
import { CatalogCategoryShort } from './catalog-category-short';
import { PostFeatureShort } from './post-feature-short';
import { PostStatus } from './post-status';
import { ProfileShort } from './profile-short';
export interface PostExtended {
  category: CatalogCategoryShort;
  countryCode: string;
  createdOn: string;
  description: string;
  draftId?: string;
  features?: Array<PostFeatureShort>;
  images: Array<string>;
  phone?: string;
  price?: string;
  publishedOn: string;
  status: PostStatus;
  title: string;
  updatedOn: string;
  user: ProfileShort;
  uuid: string;
}
