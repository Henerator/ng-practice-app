import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    public readonly navigation$: Observable<{ title: string; commands: string[] }[]>;

    constructor(private router: Router) {
        this.navigation$ = of([
            { title: 'Books', commands: ['books'] },
            { title: 'Collection', commands: ['collection'] },
            { title: 'Support', commands: ['support'] },
            { title: 'Account', commands: ['account'] },
        ]);
    }

    public get currentUrl(): string {
        return this.router.url;
    }

    public navigate(commands: string[]): void {
        this.router.navigate(commands).then();
    }

    public navToHome(): void {
        return this.navigate(['']);
    }
}
