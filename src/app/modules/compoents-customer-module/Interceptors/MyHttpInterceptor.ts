import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const jwt = sessionStorage.getItem('JWT');

        if (!!jwt) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwt}`
                },
            });
        }

        return next.handle(request).pipe(
            catchError((err: any) => {
                    if (err.status === 401) {
                        console.log(401);
                        return throwError(err);
                    } else {
                        const error = err.error.message || err.statusText;
                        return throwError(error);
                    }
                },
            ),
        );
    }

}
