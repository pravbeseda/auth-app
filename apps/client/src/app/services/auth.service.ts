import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, first, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { User, UserRegisterInput } from '@auth-app/shared';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly loggedInSubject = new BehaviorSubject<boolean | undefined>(undefined);
    public readonly loggedIn$: Observable<boolean | undefined> =
        this.loggedInSubject.asObservable();

    constructor(
        private readonly http: HttpClient,
        @Inject(PLATFORM_ID) private readonly platformId: object
    ) {}

    checkLoginStatus(): Observable<boolean | undefined> {
        if (!isPlatformBrowser(this.platformId)) {
            return of(undefined);
        }

        return this.http.get('/auth/me').pipe(
            map(_user => {
                this.loggedInSubject.next(true);
                return true;
            }),
            first(),
            catchError(error => {
                console.error('checkLoginStatus error:', error.message);
                this.loggedInSubject.next(false);
                return of(false);
            })
        );
    }

    refreshTokens(): Observable<void> {
        return this.http.post<void>('/auth/refresh', {});
    }

    logout(): void {
        this.http.post('/auth/logout', {}).subscribe(() => this.loggedInSubject.next(false));
    }

    registerUser(user: UserRegisterInput): Observable<User> {
        return this.http.post<User>('/user/register', user);
    }
}
