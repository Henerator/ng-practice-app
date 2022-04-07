import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    tuiIconArrowDown,
    tuiIconArrowDownLeft,
    tuiIconArrowLeft,
    tuiIconArrowUp,
    tuiIconMusicLarge,
    tuiIconTimeLarge,
} from '@taiga-ui/icons';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
    readonly tuiIconTimeLarge = tuiIconTimeLarge;
    readonly tuiIconArrowDown = tuiIconArrowDown;
    readonly tuiIconArrowDownLeft = tuiIconArrowDownLeft;
    readonly tuiIconArrowLeft = tuiIconArrowLeft;
    readonly tuiIconArrowUp = tuiIconArrowUp;
    readonly tuiIconMusicLarge = tuiIconMusicLarge;
}
