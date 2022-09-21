import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {AppBreadcrumbService} from "../../../../app-systems/app.breadcrumb.service";
import {AppRole} from "../../models/approle.model";
import {
    iServiceBase,
    ShareData
} from 'src/app/modules/compoents-customer-module/components-customer';
import * as API from "../../../../services/apiURL";

@Component({
    selector: 'app-quan-tri-phan-quyen',
    templateUrl: './quan-tri-phan-quyen.component.html',
    styleUrls: ['./quan-tri-phan-quyen.component.scss']
})
export class QuanTriPhanQuyenComponent implements OnInit {
    lstAppRole: AppRole[];
    selectedRoles: AppRole[];

    @ViewChild('dt') table: Table;

    activityValues: number[] = [0, 100];

    constructor(private breadcrumbService: AppBreadcrumbService,
                private shareData: ShareData,
                private iServiceBase: iServiceBase,) {
        this.breadcrumbService.setItems([
            {label: 'Quản trị hệ thống'},
            {label: 'Quản trị phân quyền', routerLink: ['/Home/QTriHThong/QuanTriPhanQuyen']}
        ]);
    }

    ngOnInit() {
        this.getAllRole();
    }

    async getAllRole() {
        try {
            let response = await this.iServiceBase.getDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.GET_ALL_ROLE);

            if (response && response.length) {
                this.lstAppRole = response;
            }
        } catch (e) {
            console.log(e);
        }
    }

}
