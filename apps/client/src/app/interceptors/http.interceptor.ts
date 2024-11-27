import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ENV } from '@auth-app/shared';
import { ConfigService } from '@nestjs/config';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const configService = inject(ConfigService);

    const apiUrl = configService.get<string>(ENV.API_URL);

    const modifiedReq = req.clone({
        url: `${apiUrl}${req.url}`,
        withCredentials: true,
    });

    return next(modifiedReq);
};
