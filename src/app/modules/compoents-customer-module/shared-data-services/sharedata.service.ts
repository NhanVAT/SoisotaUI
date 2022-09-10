import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShareData {
    subject = new Subject<any>();
    storage: any;
    dataShare: any;
    lstYeuCauTim: any;
    lstYeuCauTim2: any;
    maCongViecTiep: string;
    maCnang: string;
    maLoaiYCau: string;
    noiDungXuLy: string;
    kieuXly: string; // Kiểu xử lý truyền sang chức năng con, Ví dụ như TÌm kiếm chuyển sang Khai thác. Chỉ nhận 1 trong 2 giá trị: I hoặc U
    saveTimKiem: any;
    libID: any;
    routerLink: any;
    labelMenu: any;

    constructor() {
    }

    sendMessage(message: string) {
        this.subject.next({text: message});
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

}
