import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';
import {AppBreadcrumbService} from 'src/app/app-systems/app-breadcrumb/app.breadcrumb.service';
import {iComponentBase} from 'src/app/modules/compoents-customer-module/components-customer';

@Component({
    selector: 'setting-user',
    templateUrl: './setting-user.component.html',
    styleUrls: ['./setting-user.scss']
})
export class SettingUserComponent extends iComponentBase {
    isLoading: boolean = false;
    tenDVQL_CapTren: any;
    tenDVQL: any;
    maDVQL: any;
    userName: any;
    fullName: any;
    email: any;
    mobile: any;
    phone: any;
    passWord_U: any;
    passWord_New: any;
    passWord_New_Confirm: any;
    isUpdateUser: boolean = false;

    constructor(public breadcrumbService: AppBreadcrumbService, public msg: MessageService) {
        super(msg);
        this.breadcrumbService.setItems([
            {label: 'Cài đặt tài khoản', routerLink: ['/SettingUser']}
        ]);

        this.tenDVQL_CapTren = this.getUserInformation()[0].SUBDIVISIONNAME_U;
        this.tenDVQL = this.getUserInformation()[0].SUBDIVISIONNAME;
        this.maDVQL = this.getUserInformation()[0].SUBDIVISIONID;
        this.userName = this.getUserInformation()[0].USERNAME;
        this.fullName = this.getUserInformation()[0].FULLNAME;
        this.email = this.getUserInformation()[0].EMAIL;
        this.mobile = this.getUserInformation()[0].MOBILE;
        this.phone = this.getUserInformation()[0].PHONE;
    }

    onClickUpdate() {
        this.isUpdateUser = true;
    }

    onClickSaveUpdate() {
        this.isUpdateUser = false;
    }

    onClickCancelUpdate() {
        this.isUpdateUser = false;
    }
}


// DEPT: "CMIS"
// DOMAIN: 0
// EMAIL: "Abc@1234"
// FULLNAME: "Abc@1234"
// ISUSED: 2
// MA_TO: " "
// MOBILE: "123456"
// PHONE: "123456789"
// SESSIONID: "123456789"
// STATE: 1
// SUBDIVISIONID: "PD0600"
// SUBDIVISIONID_U: "PD"
// SUBDIVISIONLEVEL: -1
// SUBDIVISIONLEVEL_U: -1
// SUBDIVISIONNAME: "Công ty Điện lực Thanh Trì"
// SUBDIVISIONNAME_U: "Tổng Công ty Điện lực TP Hà Nội"
// TEN_TO: " "
// USERID: 3
// USERNAME: "PD0600"
