import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';
import * as API from 'src/app/services/apiURL';
import {DatePipe} from '@angular/common';
import {iComponentBase, iServiceBase, mType} from 'src/app/modules/compoents-customer-module/components-customer';
// @ts-ignore
import IPService from 'src/assets/config/IPService.json';

@Component({
    selector: 'cmis-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends iComponentBase implements OnInit {
    submitted: boolean;
    siteKey: any = '';
    description: string;
    isOn: boolean = navigator.onLine;
    isOnline: boolean = false;
    strIP: any;
    strURL_WebDvu: string;

    userName: any;
    password: any;
    maDViQLy: any;

    constructor(
        private router: Router,
        public http: HttpClient,
        public messageService: MessageService,
        private iServiceBase: iServiceBase,
        private datePipe: DatePipe,) {
        super(messageService);
    }

    isLogged(): Promise<boolean> {
        if (Storage != undefined) {
            if (sessionStorage.getItem('SESSIONID')) {
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }

    logout(user: User) {
        localStorage.removeItem(user.username)
    }

    async ngOnInit() {
        this.setStorage("DNS", "0");
        this.isLogged().then((result: boolean) => {
            if (result) {
                let dviinfo = localStorage.getItem('DVI_LOGIN');
                let tendvilogin = localStorage.getItem('TEN_DVI_LOGIN');
                let userinfo = localStorage.getItem('USER_INFO');
                let thamsoinfo = localStorage.getItem('THAM_SO_HT');
                let thangnaminfo = localStorage.getItem('THANG_NAM_HT');

                //Lấy SESSIONID ở local storage
                let sessioninfo = localStorage.getItem('SESSIONID');

                localStorage.setItem("DVI_LOGIN", dviinfo);
                localStorage.setItem("TEN_DVI_LOGIN", tendvilogin);
                localStorage.setItem('USER_INFO', userinfo);
                localStorage.setItem('THAM_SO_HT', thamsoinfo);
                localStorage.setItem('THANG_NAM_HT', thangnaminfo);

                //Set lại SESSIONID ở local storage
                sessionStorage.setItem('SESSIONID', sessioninfo);

                this.router.navigate(['/Home']);
            } else {
                this.router.navigate(['/login']);
            }
        });

        if (!sessionStorage.getItem(API.PHAN_HE.USER)) {
            await this.iServiceBase.getURLService(API.PHAN_HE.USER);
        }

        this.siteKey = IPService.SiteKey;
    }

    public loadInfoSys(): void {

    }

    async onSubmit() {
        this.submitted = true;

        let parram = {
            USER_NAME: this.userName,
            PASSWORD: this.password
        };

        //Load thông tin người dùng
        let response = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.USER, API.API_USER.GET_DVI_QLY, parram);
        if (response && response.TYPE) {
            this.showMessage(mType.error, "Thông báo", "Đăng nhập thất bại. Vui lòng kiểm tra lại");

            let dnsStorager = this.getStorage("DNS");
            if (dnsStorager && dnsStorager == "") {
                dnsStorager++;
                this.setStorage("DNS", dnsStorager);
            } else {
                if (dnsStorager == "3" && this.isOn == true) {
                    this.strIP = IPService.SiteKey;
                    this.isOnline = true;
                } else {
                    dnsStorager++;
                    this.isOnline = false;
                    this.setStorage("DNS", dnsStorager);
                }
            }
            return;
        }

        if (Storage) {
            var versionOld = localStorage.getItem('VERSION');
            localStorage.setItem('VERSION', versionOld);
            localStorage.setItem('USER_INFO', JSON.stringify(response));
            localStorage.setItem('DVI_LOGIN', response ? response[0].SUBDIVISIONID : "");
            localStorage.setItem("TEN_DVI_LOGIN", response ? response[0].SUBDIVISIONNAME : "");
            localStorage.setItem("TIME_LOGIN", this.datePipe.transform(new Date(), "dd/MM/yyyy"));

            //Nếu log out thì xóa cái này ở local storage đi
            //Lưu SESSIONID ở cả local
            sessionStorage.setItem('SESSIONID', response ? response[0].SESSIONID : "");

            this.maDViQLy = response && response.length > 0 && response[0].SUBDIVISIONID ? response[0].SUBDIVISIONID : "";

            //Load thang nam lam viec
            let param = {MA_DVIQLY: response ? response[0].SUBDIVISIONID : ""}
            let responseThangLviec = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.USER, API.API_USER.GET_DVI_QLY, param);
            if (responseThangLviec) {
                localStorage.setItem('THANG_NAM_HT', JSON.stringify(responseThangLviec));
            }

            //Load thông số hệ thống
            let responseThamSoHeThong = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.USER, API.API_USER.GET_DVI_QLY, param);
            if (responseThamSoHeThong) {
                localStorage.setItem('THAM_SO_HT', JSON.stringify(responseThamSoHeThong));
            }

            //Add các bảng DMUC vào local storage cho user
            //D_LOAI_YCAU
            this.SetLocalStorageDLoaiYCau();
            //D_DVI_QLY
            this.SetLocalStorageDDViQLy();
            //D_HTHUC_NHAN
            this.SetLocalStorageDHThucNhan();
        }

        this.router.navigate(['/Home']);
    }

    async SetLocalStorageDLoaiYCau() {
        let param = {
            MA_DVIQLY: this.maDViQLy,
            TEN_DANH_MUC: "D_LOAI_YCAU"
        }

        let response = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.GET_DVI_QLY, param);
        if (response) {
            localStorage.setItem('D_LOAI_YCAU-' + this.maDViQLy, JSON.stringify(response));
        }
    }

    async SetLocalStorageDDViQLy() {
        let param = {
            MA_DVIQLY: this.maDViQLy,
            TEN_DANH_MUC: "D_DVI_QLY"
        }

        let response = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.GET_DVI_QLY, param);
        if (response) {
            localStorage.setItem('D_DVI_QLY-' + this.maDViQLy, JSON.stringify(response));
        }
    }

    async SetLocalStorageDHThucNhan() {
        let param = {
            MA_DVIQLY: this.maDViQLy,
            TEN_DANH_MUC: "D_HTHUC_NHAN"
        }

        let response = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.GET_DVI_QLY, param);
        if (response) {
            localStorage.setItem('D_HTHUC_NHAN-' + this.maDViQLy, JSON.stringify(response));
        }
    }

    onEnterTKiemMaKHang(event) {
        if (event.keyCode == 13) {
            this.onSubmit();
        }
    }
}
