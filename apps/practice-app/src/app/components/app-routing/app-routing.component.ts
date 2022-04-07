import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-routing',
    template: '<app-header></app-header><router-outlet></router-outlet>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRoutingComponent {}
