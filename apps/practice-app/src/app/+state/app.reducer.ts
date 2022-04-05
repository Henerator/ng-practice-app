import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap } from '@ngrx/store';

export const APP_REDUCER_TOKEN: InjectionToken<ActionReducerMap<unknown, Action>> = new InjectionToken<
    ActionReducerMap<unknown, Action>
>('App Reducer', {
    factory: () => ({
        //
    }),
});
