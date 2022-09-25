import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {AppBreadcrumbService} from "../../../../app-systems/app-breadcrumb/app.breadcrumb.service";
import {AppRole} from "../../models/approle.model";
import {
    iComponentBase,
    iServiceBase, mType,
    ShareData
} from 'src/app/modules/compoents-customer-module/components-customer';
import * as API from "../../../../services/apiURL";
import {
    ConfirmationService,
    LazyLoadEvent,
    MessageService,
    SelectItem,
    TreeNode
} from "primeng/api";
import {AppMenu} from "../../models/appmenu.model";

@Component({
    selector: 'app-quan-tri-phan-quyen',
    templateUrl: './quan-tri-phan-quyen.component.html',
    styleUrls: ['./quan-tri-phan-quyen.component.scss']
})
export class QuanTriPhanQuyenComponent extends iComponentBase implements OnInit {
    lstAppRole: AppRole[] = [];
    lstAppMenu: AppMenu[] = [];
    selectedRoles: AppRole[] = [];
    displayDialogCreateRole: boolean = false;
    headerDialog: string = '';
    lstNhomRole: any[] = [];
    lstTreeMenu: TreeNode[] = [];
    roleModel: AppRole = new AppRole();
    loading: boolean;

    @ViewChild('dt') table: Table;

    constructor(public breadcrumbService: AppBreadcrumbService,
                private shareData: ShareData,
                public messageService: MessageService,
                private confirmationService: ConfirmationService,
                private iServiceBase: iServiceBase,) {
        super(messageService, breadcrumbService);

        this.breadcrumbService.setItems([
            {label: 'Quản trị hệ thống'},
            {label: 'Quản trị phân quyền', routerLink: ['/Home/QTriHThong/QuanTriPhanQuyen']}
        ]);

        this.onInitListNhomPhanQuyen();
    }

    ngOnInit() {
        this.getAllRole();
        this.getAllMenu();
    }

    onInitListNhomPhanQuyen() {
        this.lstNhomRole = [
            {label: 'Quản trị viên', value: "ROLE_ADMIN"},
            {label: 'Người dùng', value: "ROLE_USER"}
        ];
    }

    async getAllRole() {
        this.lstAppRole = [];
        this.selectedRoles = [];
        try {
            this.loading = true;

            let response = await this.iServiceBase.getDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.GET_ALL_ROLE);

            if (response && response.length) {
                this.lstAppRole = response;
            }
            this.loading = false;
        } catch (e) {
            console.log(e);
            this.loading = false;
        }
    }

    async getAllMenu() {
        try {
            let response = await this.iServiceBase.getDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.GET_ALL_MENU);

            if (response && response.length) {
                this.lstAppMenu = response;

                //Tạo tree menu luôn nhé thím
                this.createTreeMenu(this.lstAppMenu);
            }
        } catch (e) {
            console.log(e);
        }
    }

    createTreeMenu(list) {
        var map = {}, node, roots = [], i;

        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; // initialize the map

            if (list[i].menuId == '-1') {
                list[i].children = []; // initialize the children
            }
        }

        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            node.key = node.id;
            node.label = node.menuName;
            node.icon = `pi pi-fw ${node.menuIcon}`;
            node.badge = node.menuBadge;
            node.badgeClass = node.menuBadgeClass;
            node.class = '';
            node.target = node.menuTarget;
            node.url = node.menuUrl;
            node.routerLink = `${node.menuPrjName}/${node.menuRouterLink}`

            if (node.menuParent != 0) {
                // if you have dangling branches check that map[node.parentId] exists
                list[map[node.menuParent]].children.push(node);
            } else {
                roots.push(node);
            }
        }

        this.lstTreeMenu = roots;
    }

    bindingDataRoleModel(): AppRole {
        let result = new AppRole();
        if (this.shareData && this.shareData.userInfo) {
            //gán lại menu không lỗi
            result.lstMenuId = [];
            this.roleModel.menus.forEach(menu => {
                result.lstMenuId.push(menu.id);
            });

            if (this.roleModel.id && this.roleModel.id > 0) {
                //Update
                result.id = this.roleModel.id;
                result.roleId = this.roleModel.roleId;
                result.roleKey = this.roleModel.roleKey;
                result.roleName = this.roleModel.roleName;
                result.roleDescribe = this.roleModel.roleDescribe;
                result.active = this.roleModel.active;
                result.lastModifiedBy = this.shareData.userInfo.userName;
                result.lastModifiedDate = new Date();
                result.createdBy = this.roleModel.createdBy;
                result.createdDate = this.roleModel.createdDate;

            } else {
                //Insert
                result.roleId = this.roleModel.roleId;
                result.roleKey = this.roleModel.roleKey;
                result.roleName = this.roleModel.roleName;
                result.roleDescribe = this.roleModel.roleDescribe;
                result.active = this.roleModel.active;
                result.createdBy = this.shareData.userInfo.userName;
                result.createdDate = new Date();
            }
        }

        return result;
    }

    onCreateRole() {
        this.headerDialog = 'Thêm mới phân quyền';

        this.roleModel.roleId = 'ROLE_ADMIN';
        this.roleModel.active = true;
        this.roleModel.lstMenuId = [];
        this.roleModel = new AppRole();

        this.displayDialogCreateRole = true;
    }

    onUpdateRole(role: AppRole) {
        this.headerDialog = `Cập nhật phân quyền: ${role.roleName}`;

        this.roleModel = role;

        this.roleModel.menus.forEach(menu => {
            menu.key = menu.id;
        })

        this.displayDialogCreateRole = true;
    }

    onDeleteRole(role: AppRole, event) {
        this.confirmationService.confirm({
            target: event.target,
            message: `Bạn có chắc chắn xóa phân quyền ${role.roleName} này ?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //confirm action
                this.deleteRole(role);
            },
            reject: () => {
                //reject action
            }
        });
    }

    onDeleteListRole() {
        this.confirmationService.confirm({
            key: 'deleteList',
            message: 'Bạn có chắc chắn xóa những phân quyền đã chọn ?',
            accept: () => {
                //Actual logic to perform a confirmation
                this.deleteListRole();
            }
        });
    }

    onSaveRole() {
        let roleEnity = this.bindingDataRoleModel();

        if (this.validateRoleModel()) {
            if (roleEnity && roleEnity.id && roleEnity.id > 0) {
                this.updateRole(roleEnity);
            } else {
                this.createRole(roleEnity);
            }
        }
    }

    onCancelRole() {
        this.roleModel = new AppRole();

        this.displayDialogCreateRole = false;
    }

    validateRoleModel(): boolean {
        if (!this.roleModel.roleKey || this.roleModel.roleKey == '') {
            this.showMessage(mType.warn, "Thông báo", "Mã phân quyền không được để trống. Vui lòng nhập!", 'notify');
            return false;
        }

        if (!this.roleModel.roleName || this.roleModel.roleName == '') {
            this.showMessage(mType.warn, "Thông báo", "Tên phân quyền không được để trống. Vui lòng nhập!", 'notify');
            return false;
        }

        if (!this.roleModel.roleId || this.roleModel.roleId == '') {
            this.showMessage(mType.warn, "Thông báo", "Mã nhóm phân quyền không được để trống. Vui lòng chọn!", 'notify');
            return false;
        }

        return true;
    }

    async createRole(roleEnity) {
        try {
            let param = roleEnity;

            let response = await this.iServiceBase.postDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.INSERT_APP_ROLE, param, true);

            if (response && response.success) {
                this.showMessage(mType.success, "Thông báo", "Thêm mới phân quyền thành công!", 'notify');

                this.displayDialogCreateRole = false;

                //lấy lại danh sách All Role
                this.getAllRole();

                //Clear Role model đã tạo
                this.roleModel = new AppRole();
            } else {
                this.showMessage(mType.error, "Thông báo", "Thêm mới phân quyền không thành công. Vui lòng xem lại!", 'notify');
            }
        } catch (e) {
            console.log(e);
        }
    }

    async updateRole(roleEnity) {
        try {
            let param = roleEnity;

            let response = await this.iServiceBase.putDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.UPDATE_APP_ROLE, param, true);

            if (response && response.success) {
                this.showMessage(mType.success, "Thông báo", "Cập nhật phân quyền thành công!", 'notify');

                this.displayDialogCreateRole = false;

                //lấy lại danh sách All Role
                this.getAllRole();

                //Clear Role model đã tạo
                this.roleModel = new AppRole();
            } else {
                this.showMessage(mType.error, "Thông báo", "Cập nhật phân quyền không thành công. Vui lòng xem lại!", 'notify');
            }
        } catch (e) {
            console.log(e);
        }
    }

    async deleteRole(roleEnity) {
        try {
            let param = roleEnity.id;

            let response = await this.iServiceBase.postDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.DELETE_APP_ROLE, param, true);

            if (response && response.success) {
                this.showMessage(mType.success, "Thông báo", "Xóa phân quyền thành công!", 'notify');

                //lấy lại danh sách All Role
                this.getAllRole();

            } else {
                this.showMessage(mType.error, "Thông báo", "Xóa phân quyền không thành công. Vui lòng xem lại!", 'notify');
            }
        } catch (e) {
            console.log(e);
        }
    }

    async deleteListRole() {
        try {
            let param = this.selectedRoles.map(o => o.id);

            let response = await this.iServiceBase.postDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.DELETE_LIST_APP_ROLE, param, true);

            if (response) {
                this.showMessage(mType.success, "Thông báo", "Xóa phân quyền thành công!", 'notify');

                //lấy lại danh sách All Role
                this.getAllRole();

            } else {
                this.showMessage(mType.error, "Thông báo", "Xóa phân quyền không thành công. Vui lòng xem lại!", 'notify');
            }
        } catch (e) {
            console.log(e);
        }
    }
}
