import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const apiUrl = environment.API_URL;

    const modifiedReq = req.clone({
        url: `${apiUrl}${req.url}`,
        withCredentials: true,
    });

    return next(modifiedReq);
};
