import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {iServiceBase} from 'src/app/modules/compoents-customer-module/components-customer';
import * as API from 'src/app/services/apiURL';
import {Router} from "@angular/router";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private iServiceBase: iServiceBase,
                private router: Router,) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const jwt = sessionStorage.getItem('JWT');

        if (!!jwt) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwt}`
                },
            });
        }

        return next.handle(request).pipe(catchError((err: any) => {
                    if (err.status === 401) {
                        console.log(401);

                        return this.handle401Error(request, next);
                    } else {
                        const error = err.error.message || err.statusText;
                        return throwError(error);
                    }
                },
            ),
        );
    }


    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            let token = this.iServiceBase.getData(API.PHAN_HE.USER, API.API_USER.REFRESH);

            if (token) {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(token);
                return next.handle(this.addTokenHeader(request, token));
            } else {
                this.logOut();
                location.reload();
            }

        }

        return this.refreshTokenSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) =>
                next.handle(this.addTokenHeader(request, token))
            )
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token) {
        /* for Spring Boot back-end */
        return request.clone({
            headers: request.headers.set(
                'Authorization',
                'Bearer ' + token
            ),
        });

    }

    logOut() {
        //Logout thì xóa đi
        sessionStorage.clear();

        //Xóa hết đi các thứ linh tinh chỉ gán lại các thứ cấn thiết trong localstorage
        this.clearLocalStorage();

        this.router.navigate(['/login']);
    }

    clearLocalStorage() {
        //get ra các biến không cần xóa
        let IP_API_SERVICE = localStorage.getItem('APISERVICE');
        let IP_API_GATEWAY = localStorage.getItem('APIGATEWAY');
        let VERSION = localStorage.getItem('VERSION');
        let PROJECT_NAME = localStorage.getItem('PROJECT_NAME');

        //clear
        localStorage.clear();

        //Set lại các thứ cần thiết
        localStorage.setItem("APISERVICE", IP_API_SERVICE);
        localStorage.setItem("APIGATEWAY", IP_API_GATEWAY);
        localStorage.setItem("VERSION", VERSION);
        localStorage.setItem("PROJECT_NAME", PROJECT_NAME);
    }

}
