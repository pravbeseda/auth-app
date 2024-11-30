import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const apiUrl = environment.API_URL;

    const modifiedReq = req.clone({
        url: `${apiUrl}${req.url}`,
        withCredentials: true,
    });

    return next(modifiedReq).pipe(
        catchError(error => {
            if (error.status === 401) {
                // Если accessToken истёк, пытаемся обновить токен
                return authService.refreshTokens().pipe(
                    switchMap(() => next(modifiedReq)),
                    catchError(refreshError => {
                        authService.logout(); // Опционально — выходим из системы
                        return throwError(() => refreshError);
                    })
                );
            }
            return throwError(() => error);
        })
    );
};
