import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppUser} from '../../models/user.model';
import * as API from 'src/app/services/apiURL';
import {DatePipe} from '@angular/common';
import {
    iComponentBase,
    iServiceBase,
    mType
} from 'src/app/modules/compoents-customer-module/components-customer';
// @ts-ignore
import IPService from 'src/assets/config/IPService.json';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends iComponentBase implements OnInit {
    submitted: boolean;
    siteKey: any = '';
    description: string;
    isOn: boolean = navigator.onLine;
    isOnline = false;
    strIP: any;
    use: AppUser;
    userName: any;
    password: any;
    check: boolean;

    maDViQLy: any;
    constructor(
        private router: Router,
        public http: HttpClient,
        public messageService: MessageService,
        private iServiceBase: iServiceBase,

        private datePipe: DatePipe, ) {
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

    logout(user: AppUser) {
        localStorage.removeItem(user.username);
    }
    checked(check: boolean){
        this.check = check;
    }

    async ngOnInit() {
        this.isLogged().then((result: boolean) => {
            if (result) {
                const userinfo = localStorage.getItem('USER_INFO');

                // Lấy SESSIONID ở local storage
                const sessioninfo = localStorage.getItem('SESSIONID');
                // Set lại SESSIONID ở local storage
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

        this.loadInfoSys();

    }

    public loadInfoSys(): void {
        if ((localStorage.getItem('username') != null) || (localStorage.getItem('password') !=null)){
            this.userName = localStorage.getItem('username');
            this.password = localStorage.getItem('password');

        }

        if (sessionStorage.getItem('USER_NAME') != null){
            this.userName = sessionStorage.getItem('USER_NAME');
        }
    }
    async onSubmit() {
        this.submitted = true;

        const parram = {
            userName: this.userName,
            password: this.password
        };
        if (this.check){
            localStorage.setItem('username', this.userName);
            localStorage.setItem('password', this.password);
        }else{
            localStorage.setItem('username',"");
            localStorage.setItem('password',"");
        }
        //Load thông tin người dùng'
        const response = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.USER, API.API_USER.SIGNIN, parram);
        if (response && response.accessToken) {
            if (Storage) {
                const versionOld = localStorage.getItem('VERSION');
                localStorage.setItem('VERSION', versionOld);


                // Nếu log out thì xóa cái này ở local storage đi
                // Lưu SESSIONID
                sessionStorage.setItem('SESSIONID', response.sessionId);
                sessionStorage.setItem('JWT', response.accessToken);
                sessionStorage.setItem('REFRESH_TOKEN', response.refreshToken);
                sessionStorage.setItem('TOKEN_TYPE', response.tokenType);
                sessionStorage.setItem('USER_NAME', this.userName);
                sessionStorage.setItem('TIME_LOGIN', this.datePipe.transform(new Date(), 'dd/MM/yyyy'));
            }
            this.router.navigate(['/Home']);
        } else {
            this.showMessage(mType.error, 'Thông báo', 'Đăng nhập không thành công. Vui lòng kiểm tra lại', 'app-login');
        }
    }
    onEnter(event) {
        if (event.keyCode == 13) {
            this.onSubmit();
        }
    }
}
