import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import * as API from '../../../../../services/apiURL';
import {iComponentBase, mType} from '../../../../compoents-customer-module/functions/iComponentBase.component';
import {iServiceBase} from '../../../../compoents-customer-module/functions/iServiceBase';
import {AppUser} from '../../../models/appuser.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends iComponentBase implements OnInit {
    emailorphone: any;
    submitted: boolean;
    constructor(public iServiceBase: iServiceBase,
                public messageService: MessageService,) {
        super(messageService);
    }

    ngOnInit(): void {
    }

    async onSubmit() {
        this.submitted = true;
        var reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (reg.test(this.emailorphone)) {
          const params =
          {
              appCode: 'S_BILL',
              content: 'Test SMS Service 122223',
              phone: this.emailorphone
          };
          const response = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.SMSEMAIL, API.API_SMSEMAIL.SEND_SMS_BY_CONTENT, params);
        }
        else {
            if (this.validateUser()){
            const params =
            {
              appCode: 'S_BILL',
              content: 'Test Email Service 122223',
              subject: 'Test email Server',
              email: this.emailorphone
            };
           const response = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.SMSEMAIL, API.API_SMSEMAIL.SEND_EMAIL_BY_CONTENT, params);
        }}
    }
    async validateUser(){
        const params = {
            email: this.emailorphone,
        };
        try{
            const reponse =  await this.iServiceBase.getDataWithParamsAsync(API.PHAN_HE.USER, API.API_USER.CHECK_EMAIL, params, true);
        }catch (error){
            this.showMessage(mType.warn, "Thông báo", "Email không có trong hệ thống! ", 'forgot-password');
            return false;
        }
        return true;
    }
}
