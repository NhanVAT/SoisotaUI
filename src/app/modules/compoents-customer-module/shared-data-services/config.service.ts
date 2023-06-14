import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private configUrl = 'assets/config/IPService.json';
    private configData: any;

    constructor(private http: HttpClient) { }

    loadConfig(): Promise<any> {
        return this.http.get(this.configUrl)
        .toPromise()
        .then((data: any) => {
            this.configData = data;
        });
    }

    getConfig(key: string): any {
        return this.configData[key];
    }
}
