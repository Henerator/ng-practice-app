import { NgModule } from '@angular/core';

import { AuthService } from './services/auth.service';
import { AccountService } from './services/account.service';
import { PostsService } from './services/posts.service';
import { CatalogService } from './services/catalog.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  providers: [
    AuthService,
    AccountService,
    PostsService,
    CatalogService,
  ],
})
export class ApiModule {
}
