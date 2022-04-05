/* tslint:disable */
/* eslint-disable */
import { CatalogFeatureValueShort } from './catalog-feature-value-short';
import { FeatureType } from './feature-type';
export interface CatalogFeatureExtended {
  featureValues?: Array<CatalogFeatureValueShort>;
  required?: boolean;
  suffix?: string;
  title: string;
  type: FeatureType;
  uid: string;
}
