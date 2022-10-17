import {Component, OnInit} from '@angular/core';
import {AppPackageModel} from '../../models/app-package.model';
import {iServiceBase} from '../../../compoents-customer-module/functions/iServiceBase';
import {iComponentBase, mType} from '../../../compoents-customer-module/functions/iComponentBase.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import * as API from '../../../../services/apiURL';
import {ShareData} from '../../../compoents-customer-module/shared-data-services/sharedata.service';

@Component({
    selector: 'app-danh-muc-goi-cuoc',
    templateUrl: './danh-muc-goi-cuoc.component.html',
    styleUrls: ['./danh-muc-goi-cuoc.component.scss']
})
export class DanhMucGoiCuocComponent extends iComponentBase implements OnInit {
    lstAppPackage: AppPackageModel[] = [];
    lstPackageGroup: any[] = [];
    selectedPackages: AppPackageModel[] = [];
    appPackage: AppPackageModel = new AppPackageModel();
    loading: boolean;

    headerDialog: string;
    isDisplayDialog = false;

    isForever = false;
    isUnLimited = false;

    constructor(private iServiceBase: iServiceBase,
                public messageService: MessageService,
                private confirmService: ConfirmationService,
                private shareData: ShareData,
                 ) {
        super(messageService);
    }

    ngOnInit(): void {
        this.loadAllPackage();

    }

    async loadAllPackage(){
        //this.loading = true;
        try {
            const response = await this.iServiceBase.getDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.GET_ALL_APP_PACKAGE);
            if (response && response.length){
                this.lstAppPackage = response;
            }
        }catch (e) {
            console.log('khong load duoc data');
        }
        this.loading = false;
    }

    onDisplayDialog(header: string){
        this.headerDialog = header;
        this.isDisplayDialog = true;
    }

    onHideDialog(){
        this.appPackage = new AppPackageModel();
        this.isDisplayDialog = false;
    }

    onCreatePackage() {
        this.appPackage = new AppPackageModel();
        this.onDisplayDialog('Thêm mới gói cước');
    }

    async createUpdateApi(appPackageModel: AppPackageModel, type: number){
        let url;
        let message;
        switch (type) {
            case 1: // insert
                url = API.API_DANH_MUC.INSERT_APP_PACKAGE;
                message = 'Thêm gói cước mới';
                break;
            case 2: // update
                url = API.API_DANH_MUC.UPDATE_APP_PACKAGE;
                message = 'Chỉnh sửa gói cước';
                break;
            default:
                console.error('tác vụ không có');
                break;
        }

        try {
            const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, url, appPackageModel);
            if (response && response.success){
                this.showMessage(mType.success, 'Thông báo',  message + ' thành công', 'notify');
            }
            await this.loadAllPackage();
        }catch (e) {
            this.showMessage(mType.error, 'Thông báo', message + ' không thành công', 'notify');
        }
    }

    onUpdatePackage(appPackage: AppPackageModel) {
        this.appPackage = Object.assign({}, appPackage);
        this.onDisplayDialog('Chỉnh sửa gói cước');
    }

    async confirmDelete(messConfirm: string, type: number){
        this.confirmService.confirm({
            message: messConfirm,
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                switch (type) {
                    case 1: // delete single
                        this.deletePackageAPI(1);
                        break;
                    case 2: // delete list
                        this.deletePackageAPI(2);
                        break;
                    default:
                        console.error('tác vụ không có ở confirm');
                        break;
                }
            }
        });
    }

    async onDeletePackage(appPackage: AppPackageModel) {
        this.appPackage = appPackage;
        await this.confirmDelete('Bạn có chắc muốn xoá gói cước này chứ?', 1);
    }

    async onDeleteListPackage() {
        await this.confirmDelete('Bạn có chắc muốn xoá danh sách gói cước này chứ?', 2);
    }

    async deletePackageAPI(type: number){
        let params;
        let url;
        let message;
        switch (type){
            case 1: // delete single
                params = {
                    id: this.appPackage.id
                };
                url = API.API_DANH_MUC.DELETE_APP_PACKAGE;
                message = 'Xoá gói cước';
                break;
            case 2: // delete list
                params = this.selectedPackages.map(p => p.id);
                url = API.API_DANH_MUC.DELETE_LIST_APP_PACKAGE;
                message = 'Xoá danh sách gói cước';
                break;
            default:
                console.error('tác vụ không có ở API');
                break;
        }

        try {
            const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, url, params);
            if (response && response.success){
                this.showMessage(mType.success, 'Thông báo', message + ' thành công', 'notify');
            }
            await this.loadAllPackage();
        }catch (e) {
            this.showMessage(mType.error, 'Thông báo', message + ' không thành công', 'notify');
        }
    }


    async onSavePackage() {
        if (this.validateData()){
            const result = this.onBindingData();
            // type 1 insert
            if (result.id && result.id > 0){
                await this.createUpdateApi(result, 2);
            }else{
                await this.createUpdateApi(result, 1);
            }
        }
    }

    onCancelPackage() {
        this.appPackage = new AppPackageModel();
        this.onHideDialog();
    }

    private validateData() {
        return true;
    }

    onBindingData(): AppPackageModel{
        const data = new AppPackageModel();
        if (this.shareData && this.shareData.userInfo){
            data.packageName = this.appPackage.packageName;
            data.packageType = this.appPackage.packageType;
            data.packageEffectiveTime = this.appPackage.packageEffectiveTime;
            data.packageMaximumInvoice = this.appPackage.packageMaximumInvoice;
            data.packageDescribe = this.appPackage.packageDescribe;
            data.active = this.appPackage.active;

            if (this.appPackage.id && this.appPackage.id > 0){
                data.id = this.appPackage.id;
                data.packageCode = this.appPackage.packageCode;
                data.createdBy = this.appPackage.createdBy;
                data.createdDate = this.appPackage.createdDate;
                data.lastModifiedBy = this.shareData.userInfo.userName;
                data.lastModifiedDate = new Date();
            }else{
                data.createdBy = this.shareData.userInfo.userName;
                data.createdDate = new Date();
            }
        }

        return data;
    }
}
