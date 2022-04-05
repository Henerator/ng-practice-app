import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-routing',
    template: '<router-outlet></router-outlet><app-header></app-header>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRoutingComponent {}
