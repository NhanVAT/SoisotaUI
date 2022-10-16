import { Component, OnInit } from '@angular/core';
import {AppInvoiceTemplateModel} from '../../models/app-invoice-template.model';
import { iServiceBase} from '../../../compoents-customer-module/functions/iServiceBase';
import * as API from '../../../../services/apiURL';
import {File} from '@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system';
import {ShareData} from '../../../compoents-customer-module/shared-data-services/sharedata.service';
import {iComponentBase, mType} from '../../../compoents-customer-module/functions/iComponentBase.component';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-danh-muc-mau-hoa-don',
  templateUrl: './danh-muc-mau-hoa-don.component.html',
  styleUrls: ['./danh-muc-mau-hoa-don.component.scss']
})
export class DanhMucMauHoaDonComponent extends iComponentBase implements OnInit {

    lstAppInvoiceTemplate: AppInvoiceTemplateModel[] = [];
    selectedAppInvoiceTemplate: AppInvoiceTemplateModel[] = [];
    loading: boolean;
    headerDialog: string;
    isDisplayDialog: boolean;
    appInvoiceTemplate: AppInvoiceTemplateModel = new AppInvoiceTemplateModel();
    lstTemplateType: any[] = [];
    filetype = '.xsl';
    maxFileSize = 10000000;
    fileUpload: File = null;
    fileUploadBase64: any;
    BASE64_MARKER: any = ';base64,';
    currentViewInvoiceTemplate: string;

  constructor(private iServiceBase: iServiceBase,
              private shareData: ShareData,
              public messageService: MessageService,
              private confirmationService: ConfirmationService,
  ) {
      super(messageService);
  }

  ngOnInit(): void {
    this.loadListAppInvoiceTemplate();
    this.onInitListInvoiceTemplate();
  }

    private async loadListAppInvoiceTemplate() {
        this.loading = true;
        const response = await this.iServiceBase.getDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.GET_ALL_TEMPLATE);
        if (response && response.length){
            this.lstAppInvoiceTemplate = response;
        }
        this.loading = false;
    }

    private onInitListInvoiceTemplate() {
        this.lstTemplateType = [
            {label: 'Chuyển khoản', value: '1'},
            {label: 'Thẻ cào =)', value: '2'},
        ];
    }

    onDisplayDialog(header: string){
      this.headerDialog = header;
      this.isDisplayDialog = true;
    }

    onHideDialod(){
      this.isDisplayDialog = false;
    }

    onCreateInvoiceTemplate() {
        this.appInvoiceTemplate = new AppInvoiceTemplateModel();
        this.onDisplayDialog('Thêm mẫu hoá đơn');
    }

    async onDeleteListInvoiceTemplate() {
        const param = this.selectedAppInvoiceTemplate.map(i => i.id);
        const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.DELETE_LIST_TEMPLATE, param, true);
        if (response) {
            this.showMessage(mType.success, "Thông báo", "Xóa mẫu hoá đơn thành công!", 'notify');
            await this.loadListAppInvoiceTemplate();
        } else {
            this.showMessage(mType.success, "Thông báo", "Xóa mẫu hoá đơn không thành công. Vui lòng xem lại!", 'notify');
        }
    }

    onUpdateInvoiceTemplate(invoiceTemplate: AppInvoiceTemplateModel) {
        this.appInvoiceTemplate = Object.assign({}, invoiceTemplate);
        this.onDisplayDialog('Chinh sửa mẫu hoá đơn');
    }

    onDeleteInvoiceTemplate(invoiceTemplate: AppInvoiceTemplateModel, $event: MouseEvent) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc muốn xoá mẫu hoá đơn này chứ ?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteInvoiceTemplate(invoiceTemplate);
            }
        });
    }

    onSaveTemplate() {
        if (this.validateData()){
            const data = this.bindingData();
            // update
            if (data.id && data.id > 0){
                this.updateInvoiceTemplate(data);
            } else{ // insert
                this.createInvoiceTemplate(data);
            }
            this.onHideDialod();
        }
    }

    private validateData() {
        return true;
    }

    bindingData() {
        const data = new AppInvoiceTemplateModel();
        if (this.shareData && this.shareData.userInfo) {
            data.templateCode = this.appInvoiceTemplate.templateCode;
            data.templateName = this.appInvoiceTemplate.templateName;
            data.templateType = this.appInvoiceTemplate.templateType;
            data.templateDescribe = this.appInvoiceTemplate.templateDescribe;
            data.active = this.appInvoiceTemplate.active;
            data.templateDataBase64 = this.appInvoiceTemplate.templateDataBase64;
            // update
            if (this.appInvoiceTemplate.id && this.appInvoiceTemplate.id > 0 ){
               data.id = this.appInvoiceTemplate.id;
               data.createdBy = this.appInvoiceTemplate.createdBy;
               data.createdDate = this.appInvoiceTemplate.createdDate;
               data.lastModifiedBy = this.shareData.userInfo.userName;
               data.lastModifiedDate = new Date();

            }else{ // insert
                data.createdBy = this.shareData.userInfo.userName;
                data.createdDate = new Date();
            }
        }
        return data;
    }

    private async updateInvoiceTemplate(data: AppInvoiceTemplateModel) {

        const response = await this.iServiceBase.putDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.UPDATE_TEMPLATE, data);
        if (response && response.success) {
            this.showMessage(mType.success, "Thông báo", "Sửa mới mẫu hoá đơn thành công!", 'notify');

            this.onHideDialod();
            await this.loadListAppInvoiceTemplate();
        }else{
            this.showMessage(mType.error, "Thông báo", "Sửa mới mẫu hoá đơn không thành công!. Vui lòng xem lại!", 'notify');
        }
    }

    private async createInvoiceTemplate(data: AppInvoiceTemplateModel) {

        const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.INSERT_TEMPLATE, data);

        if (response && response.success) {
            this.showMessage(mType.success, "Thông báo", "Thêm mới mẫu hoá đơn thành công!", 'notify');

            this.onHideDialod();
            await this.loadListAppInvoiceTemplate();
        }else{
            this.showMessage(mType.error, "Thông báo", "Thêm mới mẫu hoá đơn không thành công!. Vui lòng xem lại!", 'notify');
        }
    }

    private async deleteInvoiceTemplate(invoiceTemplate: AppInvoiceTemplateModel) {
        const param = invoiceTemplate.id;
        const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.DELETE_TEMPLATE, param);
        if (response && response.success) {
            this.showMessage(mType.success, "Thông báo", "Xoá mẫu hoá đơn thành công!", 'notify');

            await this.loadListAppInvoiceTemplate();
        }else{
            this.showMessage(mType.error, "Thông báo", "Xoá mẫu hoá đơn không thành công!. Vui lòng xem lại!", 'notify');
        }
    }

    onCancelTemplate() {
        this.onHideDialod();
    }

    onUpload($event: any) {
      console.log($event);
        this.fileUpload = $event.files[0];

        // convert to base64
        const me = this;
        const file = $event.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // me.modelvalue = reader.result;
             console.log(reader.result);
            // url base64
            me.fileUploadBase64 = reader.result;

            // get base64 from url ( data:text/xml;base64,PD94bWwgdmVyc2lvb...... )
            const base64Index = me.fileUploadBase64.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
            const base64 = me.fileUploadBase64.substring(base64Index);

            me.appInvoiceTemplate.templateDataBase64 = base64;

        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }

    onViewInvoiceTemplate(id: number){
        console.log('id: ',id);
        const base64InvoiceTemplate = this.getViewInvoiceTemplate(id);
        console.log('base64InvoiceTemplate', base64InvoiceTemplate);
        this.currentViewInvoiceTemplate = 'data:text/xml;base64,' + base64InvoiceTemplate;
    }

    async getViewInvoiceTemplate(id: number) {
        const params = {
            id: id
        };
        const response = await this.iServiceBase.getDataWithParamsAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.GET_VIEW_INVOICE_TEMPLATE, params);
        if (response && response.success) {
            console.log(atob(response.data));
            return response.data;
        }
        return null;
    }

}
