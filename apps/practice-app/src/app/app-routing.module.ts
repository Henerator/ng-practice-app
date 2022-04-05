import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingComponent } from './components/app-routing/app-routing.component';
import { HeaderModule } from './components/header/header.module';

const routes: Routes = [
    {
        path: 'auth',
        // loadChildren: ...,
    },
    {
        path: '',
        // canActivate: [AccountLoaderGuard],
        children: [
            {
                path: 'account',
                // canActivate: [AccountGuard],
                // loadChildren: ...,
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
