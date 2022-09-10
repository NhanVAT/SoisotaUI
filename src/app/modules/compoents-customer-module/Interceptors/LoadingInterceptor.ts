import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {LoadingService} from '../shared-data-services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(public loadingService: LoadingService) {
    }

    removeRequest(request: HttpRequest<any>) {
        const i = this.requests.indexOf(request);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        if (this.requests.length === 0) {
            // ??? HIDE
            this.loadingService.stopLoading();
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(request);

        if (request.reportProgress != undefined && request.reportProgress) {
            // Not show
            console.log('Not show');
        } else {
            // ??? SHOW
            this.loadingService.startLoading();
            // console.log('show');
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.removeRequest(request);
                }
                return event;
            }),
            catchError(err => {
                this.removeRequest(request);
                return throwError(err);
            }),
            finalize(() => {
                this.removeRequest(request);
            })
        );
    }

}
