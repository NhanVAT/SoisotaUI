import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AppRole} from "../../quan-tri-he-thong-module/models/approle.model";
import {AppMenu} from "../../quan-tri-he-thong-module/models/appmenu.model";

@Injectable({
    providedIn: 'root'
})
export class ShareData {
    subject = new Subject<any>();
    storage: any;
    dataShare: any;
    userInfo: any;
    userRoles: AppRole[] = [];
    userMenus: AppMenu[] = [];

    constructor() {
    }

    sendMessage(message: string) {
        this.subject.next({text: message});
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

}
