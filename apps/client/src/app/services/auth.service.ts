import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loggedIn = false;

    constructor(private http: HttpClient) {}

    checkLoginStatus(): Observable<boolean> {
        return this.http.get('/auth/me', { withCredentials: true }).pipe(
            map(_user => {
                this.loggedIn = true;
                return true;
            }),
            catchError(error => {
                console.error('checkLoginStatus error:', error.message);
                this.loggedIn = false;
                return of(false);
            })
        );
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }
}
