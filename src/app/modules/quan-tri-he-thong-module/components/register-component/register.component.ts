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
            address: this.address
        };
        this.responseModel = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.USER, API.API_USER.REGISTER, params);
        console.log(this.responseModel);
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
