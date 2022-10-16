import { Component, OnInit } from '@angular/core';
import {AppSmsEmailModel} from '../../models/app-sms-email.model';
import {iServiceBase} from '../../../compoents-customer-module/functions/iServiceBase';
import {iComponentBase, mType} from '../../../compoents-customer-module/functions/iComponentBase.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import * as API from '../../../../services/apiURL';
import {ShareData} from '../../../compoents-customer-module/shared-data-services/sharedata.service';


@Component({
  selector: 'app-danh-muc-sms-email',
  templateUrl: './danh-muc-sms-email.component.html',
  styleUrls: ['./danh-muc-sms-email.component.scss']
})
export class DanhMucSmsEmailComponent extends iComponentBase implements OnInit {

    lstAppSmsEmail: AppSmsEmailModel[] = [];
    lstTemplateType: any[] = [];
    selectedAppSmsEmail: AppSmsEmailModel[] = [];
    loading: boolean;

    headerDialog: string;
    isDisplayDialog: boolean;
    appSmsEmail: AppSmsEmailModel;

  constructor(private iServiceBase: iServiceBase,
              public messageService: MessageService,
              private confirmationService: ConfirmationService,
              private shareData: ShareData) {
      super(messageService);
  }

  ngOnInit(): void {
      this.isDisplayDialog = false;
      this.loadAllSmsEmailTemplate();
      this.onInitSmsEmailType();
  }

    private async loadAllSmsEmailTemplate() {
        // this.loading = true;
        try {
            const response = await this.iServiceBase.getDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.GET_VIEW_SMS_EMAIL_TEMPLATE);
            if (response && response.length){
               this.lstAppSmsEmail = response.data;
            }
            this.loading = false;
        }catch (e){

        }
    }

    private onInitSmsEmailType() {
      this.lstTemplateType = [
          {label: 'Gửi qua Mail', value: '1'},
          {label: 'Gửi qua Số điện thoại', value: '2'},
      ];
    }

    onDisplayDialog(header: string){
      this.headerDialog = header;
      this.isDisplayDialog = true;
    }

    onHideDialod(){
      this.appSmsEmail = new AppSmsEmailModel();
      this.isDisplayDialog = true;
    }

    onCreateSmsEmail() {
      this.appSmsEmail = new AppSmsEmailModel();
      this.onDisplayDialog('Thêm mới mẫu Sms Email');
    }

    async createSmsEmail(smsEmail: AppSmsEmailModel){
      try {
          const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.INSERT_SMS_EMAIL_TEMPLATE, smsEmail);
          if (response && response.success){
              this.loadAllSmsEmailTemplate();
              this.showMessage(mType.success, "Thông báo", "Thêm mẫu Sms Email thành công!", 'notify');
          }
      }catch (e){
          this.showMessage(mType.error, "Thông báo", "Thêm mẫu hoá đơn không thành công!", 'notify');
      }
    }

    onViewSmsEmail(id: number) {

    }

    onUpdateSmsEmail(smsEmail: AppSmsEmailModel) {
      this.appSmsEmail = Object.assign({}, smsEmail);
      this.onDisplayDialog('Chinh sửa mẫu Sms Email');
    }

    async updateSmsEmail(smsEmail: AppSmsEmailModel){
        try {
            const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.UPDATE_SMS_EMAIL_TEMPLATE, smsEmail);
            if (response && response.success){
                this.loadAllSmsEmailTemplate();
                this.showMessage(mType.success, "Thông báo", "Chỉnh sửa mẫu Sms Email thành công!", 'notify');
            }
        }catch (e){
            this.showMessage(mType.error, "Thông báo", "Chỉnh sửa mẫu Sms Email không thành công!. Vui lòng xem lại!", 'notify');
        }
    }

    onDeleteSmsEmail(smsEmail: AppSmsEmailModel, $event: MouseEvent) {
      this.confirmationService.confirm({
          message: 'Bạn có chắc muốn xoá mẫu Sms Email này chứ ?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.deleteSmsEmail(smsEmail);
          }
      });
    }

    async deleteSmsEmail(smsEmail: AppSmsEmailModel){
        try {
            const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.DELETE_SMS_EMAIL_TEMPLATE, smsEmail);
            if (response && response.success){
                this.loadAllSmsEmailTemplate();
                this.showMessage(mType.success, "Thông báo", "Xóa mẫu Sms Email thành công!", 'notify');
            }
        }catch (e){
            this.showMessage(mType.error, "Thông báo", "Xoá mẫu Sms Email không thành công!. Vui lòng xem lại!", 'notify');
        }
    }

    onDeleteListSmsEmail() {
        const params = this.selectedAppSmsEmail.map(s => s.id);
        this.deleteListSmsEmail(params);
    }

    async deleteListSmsEmail(lstId: any){
        try {
            const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC,
                API.API_DANH_MUC.DELETE_LIST_SMS_EMAIL_TEMPLATE, lstId);
            if (response && response.success){
                this.loadAllSmsEmailTemplate();
                this.showMessage(mType.success, "Thông báo", "Xóa danh sách mẫu Sms Email thành công!", 'notify');
            }
        }catch (e){
            this.showMessage(mType.error, "Thông báo", "Xoá danh sách mẫu Sms Email không thành công!. Vui lòng xem lại!", 'notify');
        }
    }

    onSaveTemplate() {
        if (this.validateData()){
            const result = this.onBindingData();
            if (result.id && result.id > 0){
                this.updateSmsEmail(result);
                this.onHideDialod();
                return;
            }
            this.createSmsEmail(result);
            this.onHideDialod();
        }
    }

    onCancelTemplate() {
        this.onHideDialod();
    }

    private validateData() {
        return true;
    }

    onBindingData(): AppSmsEmailModel{
      const data = new AppSmsEmailModel();
      if (this.shareData && this.shareData.userInfo){
          data.templateCode = this.appSmsEmail.templateCode;
          data.templateName = this.appSmsEmail.templateName;
          data.templateType = this.appSmsEmail.templateType;
          data.templateDescribe = this.appSmsEmail.templateDescribe;
          data.active = this.appSmsEmail.active;
          // update
          if (this.appSmsEmail.id && this.appSmsEmail.id > 0 ){
              data.id = this.appSmsEmail.id;
              data.createdBy = this.appSmsEmail.createdBy;
              data.createdDate = this.appSmsEmail.createdDate;
              data.lastModifiedBy = this.shareData.userInfo.userName;
              data.lastModifiedDate = new Date();

          }else{ // insert
              data.createdBy = this.shareData.userInfo.userName;
              data.createdDate = new Date();
          }
      }

      return data;
    }

}

