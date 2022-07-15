import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import {
    AuthActionTypes,
    LogIn, LogInSuccess, LogInFailure,
} from '../store/actions/auth.actions';
import { User } from '../models/user';
import { createAction, props } from '@ngrx/store';

export const LogInAction = createAction('[Auth] Login', props<{ payload: any }>());

@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router,
    ) { }

    // effects go here

    LogIn = createEffect((): Observable<any> =>
        this.actions.pipe(
            ofType(LogInAction),
            map((action) => {
                return this.authService.logIn(action.payload.email, action.payload.password),
                    map((user: User) => {
                        console.log(user);
                        return new LogInSuccess({ token: user.token, email: action.payload.email });
                    }),
                    catchError((error) => {
                        console.log(error);
                        return of(new LogInFailure({ error: error }));
                    })
            }
            ),
        ))
}