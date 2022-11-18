import {Component, OnInit, ViewChild} from '@angular/core';
import {AppBank} from '../../models/app-bank.model';
import {Table} from 'primeng/table';
import {AppBreadcrumbService} from '../../../../app-systems/app-breadcrumb/app.breadcrumb.service';
import {iComponentBase, iServiceBase, mType, ShareData} from 'src/app/modules/compoents-customer-module/components-customer';
import {ConfirmationService, MessageService} from 'primeng/api';
import * as API from '../../../../services/apiURL';


@Component({
    selector: 'app-danh-muc-ngan-hang',
    templateUrl: './danh-muc-ngan-hang.component.html',
    styleUrls: ['./danh-muc-ngan-hang.component.scss']
})
export class DanhMucNganHangComponent extends iComponentBase implements OnInit {
    lstAppBank: AppBank[] = [];
    selectedBanks: AppBank[] = [];
    displayDialogCreateBank: boolean = false;
    headerDialog: string = '';
    lstNhomBank: any[] = [];
    bankModel: AppBank = new AppBank();
    loading: boolean;

    @ViewChild('dt') table: Table;

    constructor(public breadcrumbService: AppBreadcrumbService,
                private shareData: ShareData,
                public messageService: MessageService,
                private confirmationService: ConfirmationService,
                private iServiceBase: iServiceBase) {
        super(messageService, breadcrumbService);
        this.onInitListNhomBank();
    }

    ngOnInit(): void {
        this.loadAllBank();
    }

    async loadAllBank(){
        this.loading = true;
        try {
            const response = await this.iServiceBase.getDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.GET_ALL_APP_BANK);
            if (response && response.length){
               this.lstAppBank = response;
            }
            this.loading = false;
        }catch (e) {
            console.log('khong load dc');
        }
    }

    onInitListNhomBank() {
        this.lstNhomBank = [
            {label: 'Ngân hàng Nội địa', value: "1"},
            {label: 'Ngân hàng Quốc tế', value: "2"}
        ];
    }

    onDisplayDialog(header: string){
        this.headerDialog = header;
        this.displayDialogCreateBank = true;
    }

    onHideDialog(){
        this.bankModel = new AppBank();
        this.displayDialogCreateBank = false;
    }

    onCreateBank() {
        this.bankModel = new AppBank();
        this.bankModel.bankCode = '';
        this.bankModel.active = true;

        this.onDisplayDialog('Thêm mới phân quyền');
    }

    async createBank(bank: AppBank){
        const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.INSERT_APP_BANK, bank);
        if (response && response.success){
            this.showMessage(mType.success, 'Thông báo', 'Thêm Ngân hàng thành công', 'notify');
            this.loadAllBank();
        }else{
            this.showMessage(mType.error, 'Thông báo', 'Thêm Ngân hàng không thành công', 'notify');
        }
    }

    onDeleteListBank() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc muốn xoá danh sách Ngân hàng này chứ??',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteListBank();
            }
        });
    }

    async deleteListBank(){
        const params = this.selectedBanks.map(b => b.id);
        const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.DELETE_LIST_APP_BANK, params);
        if (response && response.success){
            this.showMessage(mType.success, 'Thông báo', 'Xoá danh sách Ngân hàng thành công', 'notify');
            this.loadAllBank();
        }else{
            this.showMessage(mType.error, 'Thông báo', 'Xoá danh sách Ngân hàng không thành công', 'notify');
        }
    }

    onUpdateBank(bank) {
        this.bankModel = Object.assign({}, bank);
        this.onDisplayDialog('Chỉnh sửa Ngân hàng');
    }

    async updateBank(bank: AppBank){
        const response = await this.iServiceBase.putDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.UPDATE_APP_BANK, bank);
        if (response && response.success){
            this.showMessage(mType.success, 'Thông báo', 'Chỉnh sửa Ngân hàng thành công', 'notify');
            this.loadAllBank();
        }else{
            this.showMessage(mType.error, 'Thông báo', 'Chỉnh sửa Ngân hàng không thành công', 'notify');
        }
    }

    onDeleteBank(bank, event) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc muốn xoá mẫu Sms Email này chứ ?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteBank(bank);
            }
        });
    }

    async deleteBank(bank: AppBank){
        const param =  bank.id;
        const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.DANHMUC, API.API_DANH_MUC.DELETE_APP_BANK, param);
        if (response && response.success){
            this.showMessage(mType.success, 'Thông báo', 'Xoá ngân hàng thành công', 'notify');
            this.loadAllBank();
        }else{
            this.showMessage(mType.error, 'Thông báo', 'Xoá ngân hàng không thành công', 'notify');
        }
    }

    onSaveBank() {
        if (this.validateData()){
           const result = this.onBindingData();
           if (result.id && result.id > 0){
               this.updateBank(result);
           }else{
               this.createBank(result);
           }
        }
        this.onHideDialog();
    }
    private onBindingData(): AppBank {
        const data = new AppBank();
        if (this.shareData && this.shareData.userInfo){
            data.bankName = this.bankModel.bankName;
            data.bankType = this.bankModel.bankType;
            data.bankDescribe = this.bankModel.bankDescribe;
            data.active = this.bankModel.active;

            // update
            if (this.bankModel.id && this.bankModel.id > 0){
                data.id = this.bankModel.id;
                data.bankCode = this.bankModel.bankCode;
                data.createdBy = this.bankModel.createdBy;
                data.createdDate = this.bankModel.createdDate;
                data.lastModifiedBy = this.shareData.userInfo.userName;
                data.lastModifiedDate = new Date();
            }else{
                data.createdBy = this.shareData.userInfo.userName;
                data.createdDate = new Date();
            }
        }
        return data;
    }

    private validateData() {
        return true;
    }

    onCancelBank() {
        this.bankModel = new AppBank();
        this.onHideDialog();
    }

}
