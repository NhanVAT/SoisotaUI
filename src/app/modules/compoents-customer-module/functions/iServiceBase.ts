import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import * as API from 'src/app/services/apiURL';
import {LoadingService} from '../shared-data-services/loading.service';

// @ts-ignore
import IPService from '/src/assets/config/IPService.json';

@Injectable()
export class iServiceBase {
    strIP_Service = '';
    strIP_GateWay = '';
    strVersion = '';
    strProjectName = '';

    constructor(public httpClient: HttpClient, public loadingService: LoadingService) {
        this.strIP_Service = IPService.APISERVICE;
        this.strIP_GateWay = IPService.APIGATEWAY;
        this.strVersion = IPService.Version;
        this.strProjectName = IPService.PROJECT_NAME;

        // Set IP các service vào localStorage để dùng
        localStorage.setItem('APISERVICE', this.strIP_Service);
        localStorage.setItem('APIGATEWAY', this.strIP_GateWay);
        localStorage.setItem('VERSION', this.strVersion);
        localStorage.setItem('PROJECT_NAME', this.strProjectName);

    }

    // Lấy Ip cấu hình ở file này
    async getServiceList() {
        return IPService;
    }

    // getServiceList() {
    //     return this.httpClient.get<any>('assets/config/IPService.json')
    //         .toPromise()
    //         .then(res => res.data)
    //         .then(data => data);
    // }
    getOptionsRequest(ignoreLoading?: boolean, responseType?: string) {
        const options: any = {};
        if (ignoreLoading != undefined && ignoreLoading) {
            // this.loadingService.setIgnoreLoading();
            options.reportProgress = true;
        }
        if (responseType != undefined && responseType) {
            // this.loadingService.setIgnoreLoading();
            options.responseType = responseType;
        }
        return options;
    }

    async getDataByURLAsync(url, api, inputData, ignoreLoading?: boolean): Promise<any> {
        try {
            url = `${url}${api}`;
            const response = await this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).toPromise();
            document.body.style.cursor = 'default';

            return response;
        } catch (error) {
            document.body.style.cursor = 'default';
            console.log(error);
            return null;
        }
    }

    async getDataAsync(service, api, ignoreLoading?: boolean): Promise<any> {
        // Get IP và URL
        service = await this.getURLService(service);

        if (service == null) {
            return null;
        }

        const url = `${service}${api}`;
        const response = await this.httpClient.get(url, this.getOptionsRequest(ignoreLoading)).toPromise();
        document.body.style.cursor = 'default';


        return response;
    }

    async getDataAsyncByPostRequest(service, api, inputData, ignoreLoading?: boolean): Promise<any> {
        try {
            // Get IP và URL
            service = await this.getURLService(service);

            if (service == null) {
                return null;
            }

            const url = `${service}${api}`;
            const response = await this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).toPromise();
            document.body.style.cursor = 'default';

            return response;
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return null;
        }
    }

    async getDataWithParamsAsync(service, api, Params, ignoreLoading?: boolean): Promise<any> {

        // Get IP và URL
        service = await this.getURLService(service);

        if (service == null) {
            return null;
        }

        const url = `${service}${api}`;
        const response = await this.httpClient.get(url, {params: Params}).pipe(catchError(this.handleError)).toPromise();
        document.body.style.cursor = 'default';

        return response;
    }

    public getData(service, api, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';

            return this.httpClient.get(url, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return null;
        }
    }

    public downloadFilePDF(service, api, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            let headers = new HttpHeaders();
            headers = headers.set('Accept', 'application/pdf');


            return this.httpClient.get(url, {headers, responseType: 'blob'});
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return null;
        }
    }

    public downloadFilePDFPost(service, api, param, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            let headers = new HttpHeaders();
            headers = headers.set('Accept', 'application/pdf');


            return this.httpClient.post(url, param, {headers, responseType: 'blob'});
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return null;
        }
    }

    public downloadFileByType(service, api, inputData, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);
            const url = `${service}${api}`;
            // Set header
            let headers = new HttpHeaders();
            if (inputData.exportType == 'pdf') {
                headers = headers.set('Accept', 'application/pdf');
            } else if (inputData.exportType == 'doc') {
                // headers = headers.set('Accept', 'application/doc');
            } else if (inputData.exportType == 'xls') {
                // headers = headers.set('Accept', 'application/xls');
            } else if (inputData.exportType == 'docx') {
                // headers = headers.set('Accept', 'application/docx');
            } else if (inputData.exportType == 'xls-only') {
                // headers = headers.set('Accept', 'application/xls');
            }

            return this.httpClient.post(url, inputData, {headers, responseType: 'blob'});
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return null;
        }


    }

    public getDataByPostRequest(service, api, inputData, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';

            return this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return null;
        }
    }

    public getDataWithParams(service, api, Params, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';

            return this.httpClient.get(url, {params: Params}).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return null;
        }
    }


    async postDataAsync(service, api, inputData, ignoreLoading?: boolean, responseType?: string): Promise<any> {
        try {
            // Get IP và URL
            service = await this.getURLService(service);

            if (service == null) {
                return null;
            }
            const url = `${service}${api}`;
            const response = await this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading, responseType)).toPromise();
            document.body.style.cursor = 'default';

            return response;
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return null;
        }
    }

    public postData(service, api, inputData, ignoreLoading?: boolean): Observable<any> {
        try {
            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';
            return this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return null;
        }
    }

    public postFormData(service, api, inputData, ignoreLoading?: boolean): Observable<any> {
        try {
            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';

            return this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return null;
        }
    }

    public postDataURL(service, api, inputData, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';

            return this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return null;
        }
    }

    async putDataAsync(service, api, inputData, ignoreLoading?: boolean): Promise<any> {
        try {

            // Get IP và URL
            service = await this.getURLService(service);

            if (service == null) {
                return null;
            }

            const url = `${service}${api}`;
            const response = await this.httpClient.put(url, inputData, this.getOptionsRequest(ignoreLoading)).toPromise();
            document.body.style.cursor = 'default';
            return response;
        } catch (error) {
            document.body.style.cursor = 'default';
            console.log(error);
            return null;
        }
    }

    public putData(service, api, inputData, ignoreLoading?: boolean): Observable<any> {
        try {
            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';
            return this.httpClient.put(url, inputData, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';
            console.log(error);
            return null;
        }
    }

    async deleteDataAsync(service, api, ignoreLoading?: boolean): Promise<any> {
        // Get IP và URL
        service = await this.getURLService(service);

        if (service == null) {
            return null;
        }

        const url = `${service}${api}`;
        const response = await this.httpClient.delete(url).toPromise();
        document.body.style.cursor = 'default';
        return response;
    }

    public deleteData(service, api, ignoreLoading?: boolean): Observable<any> {
        try {
            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';
            return this.httpClient.delete(url).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';
            console.log(error);
            return null;
        }
    }

    public uploadAsync(service, api, inputData, ignoreLoading?: boolean) {
        // Get IP và URL
        service = this.getURLService(service);

        const url = `${service}${api}`;


        return new HttpRequest('POST', url, inputData);
    }

    // Đoạn này chỉ cần lưu IP của API gateway rồi lần sau lấy ra cộng lại thôi
    getURLService(phanhe) {
        try {

            switch (phanhe) {
                case API.PHAN_HE.DANHMUC: {
                    return localStorage.getItem('APISERVICE') + '/danhmuc/';
                }
                case API.PHAN_HE.USER: {
                    return localStorage.getItem('APISERVICE') + '/users/';
                }
                case API.PHAN_HE.ROLE: {
                    return localStorage.getItem('APISERVICE') + '/roles/';
                }
                default: {
                    return '';
                }
            }
        } catch (error) {
            console.log('Lỗi lấy IP APT Gate way' + error);
            return null;
        }
    }

    protected extractData(res: Response): any {
        const body = res;
        return body || {};
    }

    protected extractDataNoLoading(res: Response): any {
        const body = res;
        return body || {};
    }

    protected extractDataWParams(res: Response): any {
        const body = res;
        return body || {};
    }

    // protected handleError(error: Response | any): any {
    //     let errMsg;
    //     if (error instanceof Response) {
    //         const body = JSON.stringify(error) || '';
    //         const err = JSON.parse(body).error || '';
    //         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     } else {
    //         errMsg = error.message ? error.message : error.toString();
    //     }
    //     console.log(errMsg);
    //     return Observable.throw(errMsg);
    // }

    protected handleErrorWParams(error: Response | any): any {
        let errMsg;
        if (error instanceof Response) {
            const body = JSON.parse(JSON.stringify(error)) || '';
            const err = body.error;
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
