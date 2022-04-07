import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';

import { AppRoutingComponent } from './components/app-routing/app-routing.component';
import { HeaderModule } from './components/header/header.module';

const routes: Routes = [
    {
        path: '',
        // canActivate: [AccountLoaderGuard],
        children: [
            {
                path: 'account',
                component: AccountComponent,
                // canActivate: [AccountGuard],
            },
        ],
    },
    { path: '**', redirectTo: 'home' },
];

@NgModule({
    declarations: [AppRoutingComponent],
    imports: [HeaderModule, RouterModule.forRoot([{ path: '', component: AppRoutingComponent, children: routes }])],
    // providers: [AccountGuard, AccountLoaderGuard],
    exports: [RouterModule],
})
export class AppRoutingModule {}
