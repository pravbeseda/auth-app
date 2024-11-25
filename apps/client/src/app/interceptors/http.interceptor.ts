import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { EnvService, ENV } from '@auth-app/env';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const envService = inject(EnvService);

    const apiUrl = envService.get(ENV.API_URL);

    const modifiedReq = req.clone({
        url: `${apiUrl}${req.url}`,
        withCredentials: true,
    });

    return next(modifiedReq);
};
