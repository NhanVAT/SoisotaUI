import {Component, OnInit} from '@angular/core';
import * as API from '../../../../services/apiURL';
import {iServiceBase} from '../../../compoents-customer-module/functions/iServiceBase';
import {ResponseModel} from '../../models/response.model';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {
    iComponentBase,
    mType
} from 'src/app/modules/compoents-customer-module/components-customer';

@Component({
    selector: 'app-register',
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
    responseModel: ResponseModel;

    constructor(public iServiceBase: iServiceBase,
                public messageService: MessageService,
                public router: Router) {
        super(messageService);
        this.responseModel = new ResponseModel();
    }

    ngOnInit(): void {
    }

    async onSubmit() {
        this.ngOnInit();
        const params = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            acceptTerm: this.acceptTerm,
            phone: this.phone,
            userName: this.userName,
            address: this.address,
        };
        this.responseModel = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.USER, API.API_USER.REGISTER, params);
        console.log(this.responseModel);
        if (this.validateUser()){
            if (this.responseModel && this.responseModel.success){
                sessionStorage.setItem('USER_NAME', this.responseModel.data);
                await this.router.navigate(['/login']);
            }else{
                // đoạn này lúc getdata, service trả về api error nên nó k lấy response dc...
                // this.showMessage(mType.error, "Thông báo", this.responseModel.message, 'app-register');
                this.showMessage(mType.error, "Thông báo", "Đăng ký thất bại", 'app-register');
            }
        }
    }

    validateUser(): boolean{
        if (!this.firstName || this.firstName == ''){
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập họ!", 'app-register');
            return false;
        }
        if (!this.lastName || this.lastName == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập tên!", 'app-register');
            return false;
        }
        if (!this.userName || this.userName == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập tên đăng nhập!", 'app-register');
            return false;
        }
        if (!this.password || this.password == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập mật khẩu!", 'app-register');
            return false;
        }
        if (!this.confirmPassword || this.confirmPassword == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập lại mật khẩu!", 'app-register');
            return false;
        }
        if (this.password !== this.confirmPassword) {
            this.showMessage(mType.warn, "Thông báo", "Mật khẩu không giống nhau! ", 'app-register');
            return false;
        }

        if(!this.email || this.email ==''){
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập emai! ", 'app-register');
            return false;
        }
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(re.test(this.email) == false){
            this.showMessage(mType.warn, "Thông báo", "Bạn nhập email chưa đúng! ", 'app-register');
            return false;
        }
        if (!this.phone || this.phone =='') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập số điện thoại! ", 'app-register');
            return false;
        }
        var reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if(reg.test(this.phone) == false){
            this.showMessage(mType.warn, "Thông báo", "Số điện thoại bạn nhập không đúng! ", 'app-register');
            return false;
        }
        return true;
    }

}
