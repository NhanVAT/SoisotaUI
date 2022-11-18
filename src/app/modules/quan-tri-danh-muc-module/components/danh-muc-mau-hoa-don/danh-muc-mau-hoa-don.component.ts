import {Component, OnInit} from '@angular/core';
import {AppInvoiceTemplateModel} from '../../models/app-invoice-template.model';
import {iServiceBase} from '../../../compoents-customer-module/functions/iServiceBase';
import * as API from '../../../../services/apiURL';
import {File} from '@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system';
import {ShareData} from '../../../compoents-customer-module/shared-data-services/sharedata.service';
import {
    iComponentBase,
    mType
} from '../../../compoents-customer-module/functions/iComponentBase.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DomSanitizer} from '@angular/platform-browser';

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
    isDisplayDialogView: boolean;
    appInvoiceTemplate: AppInvoiceTemplateModel = new AppInvoiceTemplateModel();
    lstTemplateType: any[] = [];
    filetype = '.xsl';
    maxFileSize = 10000000;
    fileUpload: File = null;
    fileUploadBase64: any;
    BASE64_MARKER: any = ';base64,';
    currentViewInvoiceTemplate: string;
    htmlView: any;
    isShowEyeView: boolean;
    htmlViewOld: any = 'fsafdhiusdfh';
    isDisplayDialogViewOld: boolean;
    datafile: any = [];
    message: string;
    isShowMessUpload: boolean;
    codeColorMess: number;
    isFireWork: boolean;

    constructor(private iServiceBase: iServiceBase,
                private shareData: ShareData,
                public messageService: MessageService,
                private confirmationService: ConfirmationService,
                private sanitizer: DomSanitizer
    ) {
        super(messageService);
    }

    ngOnInit(): void {
        this.loadListAppInvoiceTemplate();
        this.onInitListInvoiceTemplate();
    }

    private async loadListAppInvoiceTemplate() {
        this.loading = true;
        const response = await this.iServiceBase.getDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.GET_ALL_INVOICE_TEMPLATE);
        if (response && response.length) {
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

    onDisplayDialog(header: string) {
        this.headerDialog = header;
        this.isDisplayDialog = true;
        this.isShowMessUpload = false;
        this.datafile = [];
    }

    onHideDialod() {
        this.appInvoiceTemplate = new AppInvoiceTemplateModel();
        this.isDisplayDialog = false;
        this.isShowEyeView = false;
        this.datafile = [];
    }

    onCreateInvoiceTemplate() {
        this.appInvoiceTemplate = new AppInvoiceTemplateModel();
        this.onDisplayDialog('Thêm mẫu hoá đơn');
        this.isShowEyeView = false;
    }

    async onDeleteListInvoiceTemplate() {
        const param = this.selectedAppInvoiceTemplate.map(i => i.id);
        const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.DELETE_LIST_INVOICE_TEMPLATE, param, true);
        if (response) {
            this.showMessage(mType.success, 'Thông báo', 'Xóa người dùng thành công!', 'notify');
            await this.loadListAppInvoiceTemplate();
        } else {
            this.showMessage(mType.success, 'Thông báo', 'Xóa người dùng không thành công. Vui lòng xem lại!', 'notify');
        }
    }

    onUpdateInvoiceTemplate(invoiceTemplate: AppInvoiceTemplateModel) {
        this.appInvoiceTemplate = Object.assign({}, invoiceTemplate);
        this.onDisplayDialog('Chinh sửa mẫu hoá đơn');
        this.isShowEyeView = true;
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
        if (this.validateData()) {
            const data = this.bindingData();
            // update
            if (data.id && data.id > 0) {
                this.updateInvoiceTemplate(data);
            } else { // insert
                this.createInvoiceTemplate(data);
            }
            this.datafile = [];
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
            if (this.appInvoiceTemplate.id && this.appInvoiceTemplate.id > 0) {
                data.id = this.appInvoiceTemplate.id;
                data.createdBy = this.appInvoiceTemplate.createdBy;
                data.createdDate = this.appInvoiceTemplate.createdDate;
                data.lastModifiedBy = this.shareData.userInfo.userName;
                data.lastModifiedDate = new Date();
                data.templateData = this.appInvoiceTemplate.templateData;

            } else { // insert
                data.createdBy = this.shareData.userInfo.userName;
                data.createdDate = new Date();
            }
        }
        return data;
    }

    private async updateInvoiceTemplate(data: AppInvoiceTemplateModel) {

        const response = await this.iServiceBase.putDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.UPDATE_INVOICE_TEMPLATE, data);
        if (response && response.success) {
            this.showMessage(mType.success, 'Thông báo', 'Thêm mới mẫu hoá đơn thành công!', 'notify');

            this.onHideDialod();
            await this.loadListAppInvoiceTemplate();
        } else {
            this.showMessage(mType.error, 'Thông báo', 'Thêm mới mẫu hoá đơn không thành công!. Vui lòng xem lại!', 'notify');
        }
    }

    private async createInvoiceTemplate(data: AppInvoiceTemplateModel) {

        const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.INSERT_INVOICE_TEMPLATE, data);

        if (response && response.success) {
            this.showMessage(mType.success, 'Thông báo', 'Thêm mới mẫu hoá đơn thành công!', 'notify');

            this.onHideDialod();
            await this.loadListAppInvoiceTemplate();
        } else {
            this.showMessage(mType.error, 'Thông báo', 'Thêm mới mẫu hoá đơn không thành công!. Vui lòng xem lại!', 'notify');
        }
    }

    private async deleteInvoiceTemplate(invoiceTemplate: AppInvoiceTemplateModel) {
        const param = invoiceTemplate.id;
        const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.DELETE_INVOICE_TEMPLATE, param);
        if (response && response.success) {
            this.showMessage(mType.success, 'Thông báo', 'Xoá mẫu hoá đơn thành công!', 'notify');

            await this.loadListAppInvoiceTemplate();
        } else {
            this.showMessage(mType.error, 'Thông báo', 'Xoá mẫu hoá đơn không thành công!. Vui lòng xem lại!', 'notify');
        }
    }

    onCancelTemplate() {
        this.onHideDialod();
    }

    async onUpload($event: any) {
        this.isShowEyeView = false;
        this.isShowMessUpload = true;

        this.codeColorMess = 0;
        this.message = 'Chờ tí tui đang xử lý';
        await this.sleep(1000);

        // this.fileUpload = $event.files[0];

        // convert to base64
        const me = this;
        const file = $event.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            // me.modelvalue = reader.result;
            // url base64
            me.fileUploadBase64 = reader.result;

            // get base64 from url ( data:text/xml;base64,PD94bWwgdmVyc2lvb...... )
            const base64Index = me.fileUploadBase64.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
            const base64 = me.fileUploadBase64.substring(base64Index);

            me.appInvoiceTemplate.templateDataBase64 = base64;
            // print mess
            await this.sleep(2000);
            this.message = 'Hoàn thành rồi';
            this.codeColorMess = 1;
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    onViewInvoiceTemplate(id: number) {
        const base64InvoiceTemplate = this.getViewInvoiceTemplate(id);
        this.currentViewInvoiceTemplate = 'data:text/xml;base64,' + base64InvoiceTemplate;
    }

    async getViewInvoiceTemplate(id) {
        let param = id;

        const response = await this.iServiceBase.getDataAsyncByPostRequest(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.GET_VIEW_INVOICE_TEMPLATE, param);

        if (response && response.html) {
            this.htmlView = this.sanitizer.bypassSecurityTrustHtml(response.html);
            this.isDisplayDialogView = true;
        }

        return null;
    }

    onChangePositionEye($event: any) {
        this.isShowEyeView = false;
    }

    onViewOldTemplate() {
        // this.htmlViewOld = atob(this.appInvoiceTemplate.templateData.toString());
        this.htmlViewOld = this.getDecodeTemplateData();
        this.isDisplayDialogViewOld = true;
    }

    private getDecodeTemplateData() {
        return decodeURIComponent(Array.prototype.map.call(atob(this.appInvoiceTemplate.templateData.toString()),
            function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
    }

    onSaveDataOld() {
        const encoded = btoa(unescape(encodeURIComponent(this.htmlViewOld)));
        // console.log(encoded);
        this.appInvoiceTemplate.templateDataBase64 = encoded;
        this.isDisplayDialogViewOld = false;
    }

    onCancelDataOld() {
        this.isDisplayDialogViewOld = false;
    }

    onRemoveFile() {
        this.isShowEyeView = true;
        this.isShowMessUpload = false;

        // when remove file -> get old templatedata from obj
        const htmlOld = this.getDecodeTemplateData();
        const encoded = btoa(unescape(encodeURIComponent(htmlOld)));
        // console.log(encoded);
        this.appInvoiceTemplate.templateDataBase64 = encoded;
    }

}
