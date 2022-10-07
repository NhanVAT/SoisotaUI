import {Component, OnInit, ViewChild} from '@angular/core';
import {AppBank} from "../../models/app-bank.model";
import {Table} from "primeng/table";
import {AppBreadcrumbService} from "../../../../app-systems/app-breadcrumb/app.breadcrumb.service";
import {
    iComponentBase,
    iServiceBase,
    ShareData
} from 'src/app/modules/compoents-customer-module/components-customer';
import {ConfirmationService, MessageService} from "primeng/api";

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
    }

    onInitListNhomBank() {
        this.lstNhomBank = [
            {label: 'Ngân hàng Nội địa', value: "1"},
            {label: 'Ngân hàng Quốc tế', value: "2"}
        ];
    }

    onCreateBank() {
        this.headerDialog = 'Thêm mới phân quyền';

        this.bankModel = new AppBank();
        this.bankModel.bankCode = '';
        this.bankModel.active = true;

        this.displayDialogCreateBank = true;
    }

    onDeleteListBank() {
    }

    onUpdateBank(bank) {
    }

    onDeleteBank(bank, event) {
    }

    onSaveBank() {
    }

    onCancelBank() {
    }

}
