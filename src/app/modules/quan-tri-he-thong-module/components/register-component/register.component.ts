import {Component, OnInit} from '@angular/core';
import * as API from '../../../../services/apiURL';
import {iServiceBase} from '../../../compoents-customer-module/functions/iServiceBase';
import {ResponseModel} from '../../models/response.model';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {iComponentBase, mType} from 'src/app/modules/compoents-customer-module/components-customer';

@Component({
    selector: 'appRegister',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends iComponentBase implements OnInit {

    firstName: any;
    lastName: any;
    email: any;
    password: any;
    confirmPassword: any;
    acceptTerm: any;
    userName: any;
    phone: any;
    address: any;
    sexUser: any = 0;
    lstSexUser: any[] = [];
    responseModel: ResponseModel;

    constructor(public iServiceBase: iServiceBase,
                public messageService: MessageService,
                public router: Router) {
        super(messageService);
        this.responseModel = new ResponseModel();
    }

    ngOnInit() {
        this.onInitDanhMucGioiTinh();
    }

    onInitDanhMucGioiTinh() {
        this.lstSexUser = [
            {label: 'Nam', value: 0},
            {label: 'Nữ', value: 1},
            {label: 'Khác', value: 2}
        ];
    }

    onSubmit() {
        if (this.validateUser()) {
            this.register();
        }
    }

    async register() {
        try {
            const params = {
                fullName: `${this.firstName} ${this.lastName}`,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
                acceptTerm: this.acceptTerm,
                phone: this.phone,
                userName: this.userName.trim().toLowerCase(),
                userId: this.userName.trim().toLowerCase(),
                address: this.address,
                sexUser: this.sexUser
            };

            this.responseModel = await this.iServiceBase.postDataAsync(API.PHAN_HE.USER, API.API_USER.REGISTER, params);
            if (this.responseModel && this.responseModel.success) {
                sessionStorage.setItem('USER_NAME', this.responseModel.data);
                await this.router.navigate(['/login']);
            } else {
                // đoạn này lúc getdata, service trả về api error nên nó k lấy response dc...
                this.showMessage(mType.error, "Thông báo", "Đăng ký thất bại", 'appRegister');
            }
        } catch (e) {
            console.log(e);
        }
    }

    validateUser(): boolean {
        if (!this.firstName || this.firstName == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập Họ!", 'appRegister');
            return false;
        }
        if (!this.lastName || this.lastName == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập Tên!", 'appRegister');
            return false;
        }
        if (!this.userName || this.userName == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập Tài khoản!", 'appRegister');
            return false;
        }
        if (!this.password || this.password == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập Mật khẩu!", 'appRegister');
            return false;
        }
        if (!this.confirmPassword || this.confirmPassword == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập Nhập lại mật khẩu!", 'appRegister');
            return false;
        }
        if (this.password !== this.confirmPassword) {
            this.showMessage(mType.warn, "Thông báo", "Mật khẩu không giống nhau! ", 'appRegister');
            return false;
        }

        if (!this.email || this.email == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập Emai! ", 'appRegister');
            return false;
        }
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (re.test(this.email) == false) {
            this.showMessage(mType.warn, "Thông báo", "Bạn nhập Email chưa đúng! ", 'appRegister');
            return false;
        }
        if (!this.phone || this.phone == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập Số điện thoại! ", 'appRegister');
            return false;
        }
        var reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (reg.test(this.phone) == false) {
            this.showMessage(mType.warn, "Thông báo", "Số điện thoại bạn nhập không đúng! ", 'appRegister');
            return false;
        }

        return true;
    }

}
