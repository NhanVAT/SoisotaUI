import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import * as API from '../../../../../services/apiURL';
import {
    iComponentBase,
    mType
} from '../../../../compoents-customer-module/functions/iComponentBase.component';
import {iServiceBase} from '../../../../compoents-customer-module/functions/iServiceBase';
import {Router} from "@angular/router";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends iComponentBase implements OnInit {
    emailOrPhone: any;
    submitted: boolean;

    constructor(public iServiceBase: iServiceBase,
                public messageService: MessageService,
                public router: Router) {
        super(messageService);
    }

    ngOnInit(): void {
    }

    async onSubmit() {
        try {
            this.submitted = true;

            let params = {
                emailOrPhone: this.emailOrPhone
            }

            const reponse = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.USER, API.API_USER.FORGOT_PASSWORD, params, true);

            if (reponse && reponse.success) {
                this.showMessage(mType.success, "Thông báo", `Cấp lại mật khẩu thành công. Vui lòng kiểm tra SMS hoặc Email`, 'appForgot');

                await this.router.navigate(['/login']);
            } else {
                this.showMessage(mType.error, "Thông báo", `Cấp lại mật khẩu không thành công. ${reponse.message}`, 'appForgot');
            }
        } catch (e) {
            console.log(e);
        }
    }

    onSubmitEnter(event) {
        if (event.keyCode == 13) {
            this.onSubmit();
        }
    }
}
