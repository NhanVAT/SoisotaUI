import {Component, OnInit, ViewChild} from '@angular/core';
import {AppBreadcrumbService} from "../../../../app-systems/app-breadcrumb/app.breadcrumb.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {
    iComponentBase,
    iServiceBase, mType,
    ShareData
} from 'src/app/modules/compoents-customer-module/components-customer';
import {Table} from "primeng/table";
import {AppMenu} from "../../models/appmenu.model";
import {NodeService} from "../../../../demo/service/nodeservice";
import * as API from "../../../../services/apiURL";
import {IconService} from "../../../../demo/service/iconservice";

@Component({
    selector: 'app-quan-tri-menu',
    templateUrl: './quan-tri-menu.component.html',
    styleUrls: ['./quan-tri-menu.component.scss']
})
export class QuanTriMenuComponent extends iComponentBase implements OnInit {
    lstAppMenu: any[] = [];
    colsTreeTableAppMenu: any[];
    selectedMenus: any[] = [];
    displayDialogCreateMenu: boolean = false;
    headerDialog: string = '';
    menuModel: AppMenu = new AppMenu();
    loading: boolean;

    lstMenuParent: any[] = [];
    lstAllAppMenu: any[] = [];
    lstModule: any[] = [];
    lstIcon: any[] = [];
    filteredIcons: any [];

    @ViewChild('dt') table: Table;

    constructor(public breadcrumbService: AppBreadcrumbService,
                private shareData: ShareData,
                public messageService: MessageService,
                private confirmationService: ConfirmationService,
                private iServiceBase: iServiceBase,
                private nodeService: NodeService,
                private iconService: IconService) {
        super(messageService, breadcrumbService);

        this.breadcrumbService.setItems([
            {label: 'Quản trị hệ thống'},
            {label: 'Quản trị menu', routerLink: ['/Home/QTriHThong/QuanTriMenu']}
        ]);

        this.onInitListModule();
        this.onInitListMenuIcon();
    }

    ngOnInit(): void {
        // this.nodeService.getFilesystem().then(files => this.lstAppMenu = files);
        this.getAllMenu();
    }

    async getAllMenu() {
        try {
            let response = await this.iServiceBase.getDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.GET_ALL_MENU);

            if (response && response.length) {
                this.lstAllAppMenu = response;

                //Tạo tree menu luôn nhé thím
                this.createTreeTableMenu(response);

                this.onInitListMenuParent(response);
            }
        } catch (e) {
            console.log(e);
        }
    }

    onInitListMenuIcon() {
        this.iconService.getIcons().subscribe(data => {
            const icons = data;
            icons.sort((icon1, icon2) => {
                icon1.properties.color = "#ffffff";
                if (icon1.properties.name < icon2.properties.name) {
                    return -1;
                } else if (icon1.properties.name < icon2.properties.name) {
                    return 1;
                } else {
                    return 0;
                }
            });

            this.lstIcon = data;
            this.filteredIcons = icons;
        });
    }

    onInitListMenuParent(listAppMenu) {
        if (listAppMenu && listAppMenu.length) {
            this.lstMenuParent = [{label: 'Menu cha', value: 0}];

            this.lstMenuParent = [...listAppMenu.map(menu => {
                return {
                    label: menu.menuName,
                    value: menu.id
                }
            }), ...this.lstMenuParent];
        }
    }

    onInitListModule() {
        this.lstModule = [
            {label: 'Quản trị Hệ thống', value: "QTriHThong"},
            {label: 'Quản trị Đối tác', value: "QTriDoiTac"},
            {label: 'Quản trị Cửa hàng', value: "QTriCuaHang"},
            {label: 'Quản trị Danh mục', value: "QTriDanhMuc"},
            {label: 'Khám phá', value: "KhamPha"},
            {label: 'Đặt giao hàng', value: "DatGiaoHang"}
        ]
    }

    createTreeTableMenu(list) {
        var map = {}, node, roots = [], i;

        for (i = 0; i < list.length; i += 1) {

            map[list[i].id] = i; // initialize the map

            if (list[i].menuId == '-1') {
                list[i].children = []; // initialize the children
            }
        }

        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            node.data = {
                id: node.id,
                menuName: node.menuName,
                menuIcon: node.menuIcon,
                menuBadge: node.menuBadge,
                menuBadgeClass: node.menuBadgeClass,
                menuOrder: node.menuOrder,
                menuParent: node.menuParent,
                menuTarget: node.menuTarget,
                menuUrl: node.menuUrl,
                active: node.active,
                createdBy: node.createdBy,
                createdDate: node.createdDate,
                class: '',
                menuRouterLink: node.menuRouterLink,
                menuPrjName: node.menuPrjName,

                key: node.id,
                label: node.menuName,
                icon: node.menuIcon,
                badge: node.menuBadge,
                badgeClass: node.menuBadgeClass,
                target: node.menuTarget,
                routerLink: node.menuRouterLink,
                url: node.menuUrl,
                prjName: node.menuPrjName,

            }


            if (node.menuParent != 0) {
                // if you have dangling branches check that map[node.parentId] exists
                list[map[node.menuParent]].children.push(node);
            } else {
                roots.push(node);
            }
        }

        this.lstAppMenu = roots;
    }

    bindingDataRoleModel(): AppMenu {
        let result = new AppMenu();
        if (this.shareData && this.shareData.userInfo) {
            if (this.menuModel.id && this.menuModel.id > 0) {
                //Update
                result.id = this.menuModel.id;
                result.menuBadge = this.menuModel.menuBadge;
                result.menuBadgeClass = this.menuModel.menuBadgeClass;
                result.menuIcon = this.menuModel.menuIcon;
                result.menuId = this.menuModel.menuId;
                result.menuName = this.menuModel.menuName;
                result.menuOrder = this.menuModel.menuOrder;
                result.menuParent = this.menuModel.menuParent;
                result.menuPrjName = this.menuModel.menuPrjName;
                result.menuRouterLink = this.menuModel.menuRouterLink;
                result.menuTarget = this.menuModel.menuTarget;
                result.menuUrl = this.menuModel.menuUrl;

                result.active = this.menuModel.active;
                result.lastModifiedBy = this.shareData.userInfo.userName;
                result.lastModifiedDate = new Date();
                result.createdBy = this.menuModel.createdBy;
                result.createdDate = this.menuModel.createdDate;

            } else {
                //Insert
                result.menuBadge = this.menuModel.menuBadge;
                result.menuBadgeClass = this.menuModel.menuBadgeClass;
                result.menuIcon = this.menuModel.menuIcon;
                result.menuId = '-1';
                result.menuName = this.menuModel.menuName;
                result.menuOrder = this.menuModel.menuOrder;
                result.menuParent = this.menuModel.menuParent;
                result.menuPrjName = this.menuModel.menuPrjName;
                result.menuRouterLink = `/${this.menuModel.menuRouterLink}`;
                result.menuTarget = this.menuModel.menuTarget;
                result.menuUrl = this.menuModel.menuUrl;

                result.active = this.menuModel.active;
                result.createdBy = this.shareData.userInfo.userName;
                result.createdDate = new Date();
            }
        }

        return result;
    }

    validateMenuModel(): boolean {
        if (!this.menuModel.menuName || this.menuModel.menuName == '') {
            this.showMessage(mType.warn, "Thông báo", "Tên menu không được để trống. Vui lòng nhập!", 'notify');
            return false;
        }

        if (!this.menuModel.menuIcon || this.menuModel.menuIcon == '') {
            this.showMessage(mType.warn, "Thông báo", "Icon vui không được để trống. Vui lòng chọn!", 'notify');
            return false;
        }

        if (!this.menuModel.menuOrder || this.menuModel.menuOrder == '') {
            this.showMessage(mType.warn, "Thông báo", "Thứ tự menu không được để trống. Vui lòng nhập!", 'notify');
            return false;
        }

        if (!this.menuModel.menuParent && typeof (this.menuModel.menuParent) != 'number') {
            this.showMessage(mType.warn, "Thông báo", "Menu cha không được để trống. Vui lòng chọn!", 'notify');
            return false;
        }

        if (!this.menuModel.menuPrjName) {
            this.showMessage(mType.warn, "Thông báo", "Module không được để trống. Vui lòng chọn!", 'notify');
            return false;
        }

        if (!this.menuModel.menuRouterLink || this.menuModel.menuRouterLink == '') {
            this.showMessage(mType.warn, "Thông báo", "Router Link không được để trống. Vui lòng nhập!", 'notify');
            return false;
        }

        return true;
    }

    onFilterIcon(event: KeyboardEvent): void {
        const searchText = (event.target as HTMLInputElement).value;

        if (!searchText) {
            this.filteredIcons = this.lstIcon;
        } else {
            this.filteredIcons = this.lstIcon.filter(it => {
                return it.icon.tags[0].includes(searchText);
            });
        }
    }

    onSelectIcon(icon) {
        for (let iconItem of this.filteredIcons) {
            iconItem.properties.color = "#ffffff"
        }

        for (let iconItem of this.lstIcon) {
            iconItem.properties.color = "#ffffff"
        }

        this.menuModel.menuIcon = `pi-${icon.properties.name}`;
        icon.properties.color = "#8a9aea";
    }

    onCreateMenu() {
        this.headerDialog = 'Thêm mới Menu';

        for (let iconItem of this.filteredIcons) {
            iconItem.properties.color = "#ffffff"
        }

        for (let iconItem of this.lstIcon) {
            iconItem.properties.color = "#ffffff"
        }

        //Clear Menu model đã tạo
        this.menuModel = new AppMenu();

        this.menuModel.active = true;


        this.displayDialogCreateMenu = true;
    }

    onDeleteListMenu() {
        this.confirmationService.confirm({
            key: 'deleteList',
            message: 'Bạn có chắc chắn xóa những menu đã chọn ?',
            accept: () => {
                //Actual logic to perform a confirmation
                this.deleteListMenu();
            }
        });
    }

    onUpdateMenu(menu: AppMenu) {
        this.headerDialog = `Cập nhật menu: ${menu.menuName}`;

        for (let iconItem of this.filteredIcons) {
            iconItem.properties.color = "#ffffff"
        }

        for (let iconItem of this.lstIcon) {
            iconItem.properties.color = "#ffffff"
        }

        this.menuModel = menu;

        //Cập nhật màu ở chỗ chọn icon nữa
        for (let iconItem of this.filteredIcons) {
            if (this.menuModel.menuIcon == `pi-${iconItem.properties.name}`) {
                iconItem.properties.color = "#8a9aea";
            }
        }

        //clear chính nó và con của nó khỏi list menu cha
        let lstMenu_sub = this.removeAllChirdInListMenu(this.lstAllAppMenu, this.menuModel.id);

        this.onInitListMenuParent(lstMenu_sub);

        this.displayDialogCreateMenu = true;
    }

    removeAllChirdInListMenu(listMenu, idParent) {
        //Lấy list con ra nào
        let lstMenuChild = listMenu.filter(o => o.menuParent == idParent);

        if (lstMenuChild && lstMenuChild.length) {
            // Xóa thăng con đi nào
            listMenu = listMenu.filter(o => o.id != idParent && o.menuParent != idParent);

            for (let itemChild of lstMenuChild) {
                listMenu = this.removeAllChirdInListMenu(listMenu, itemChild.id);
            }
        }

        return listMenu;
    }

    onDeleteMenu(menu: AppMenu, event) {
        this.confirmationService.confirm({
            target: event.target,
            message: `Bạn có chắc chắn xóa menu ${menu.menuName} này ?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //confirm action
                this.deleteMenu(menu);
            },
            reject: () => {
                //reject action
            }
        });
    }

    onSaveMenu() {
        let menuEnity = this.bindingDataRoleModel();

        if (this.validateMenuModel()) {
            if (menuEnity && menuEnity.id && menuEnity.id > 0) {
                this.updateMenu(menuEnity);
            } else {
                this.createMenu(menuEnity);
            }
        }
    }

    onCancelMenu() {
        this.displayDialogCreateMenu = false;
    }


    async createMenu(menuEnity) {
        try {
            let param = menuEnity;

            let response = await this.iServiceBase.postDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.INSERT_APP_MENU, param, true);

            if (response && response.success) {
                this.showMessage(mType.success, "Thông báo", "Thêm mới menu thành công!", 'notify');

                this.displayDialogCreateMenu = false;

                //lấy lại danh sách All Menu
                this.getAllMenu();

            } else {
                this.showMessage(mType.error, "Thông báo", "Thêm mới menu không thành công. Vui lòng xem lại!", 'notify');
            }
        } catch (e) {
            console.log(e);
        }
    }

    async updateMenu(menuEnity) {
        try {
            let param = menuEnity;

            let response = await this.iServiceBase.putDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.UPDATE_APP_MENU, param, true);

            if (response && response.success) {
                this.showMessage(mType.success, "Thông báo", "Cập nhật menu thành công!", 'notify');

                this.displayDialogCreateMenu = false;

                //lấy lại danh sách All Role
                this.getAllMenu();
            } else {
                this.showMessage(mType.error, "Thông báo", "Cập nhật menu không thành công. Vui lòng xem lại!", 'notify');
            }
        } catch (e) {
            console.log(e);
        }
    }

    async deleteMenu(menuEnity) {
        try {
            let param = menuEnity.id;

            let response = await this.iServiceBase.postDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.DELETE_APP_MENU, param, true);

            if (response && response.success) {
                this.showMessage(mType.success, "Thông báo", "Xóa menu thành công!", 'notify');

                //lấy lại danh sách All Role
                this.getAllMenu();

            } else {
                this.showMessage(mType.error, "Thông báo", "Xóa menu không thành công. Vui lòng xem lại!", 'notify');
            }
        } catch (e) {
            console.log(e);
        }
    }

    async deleteListMenu() {
        try {
            let param = this.selectedMenus.map(o => o.id);

            let response = await this.iServiceBase.postDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.DELETE_LIST_APP_MENU, param, true);

            if (response && response.success) {
                this.showMessage(mType.success, "Thông báo", "Xóa menu thành công!", 'notify');

                //lấy lại danh sách All Role
                this.getAllMenu();

            } else {
                this.showMessage(mType.error, "Thông báo", "Xóa menu không thành công. Vui lòng xem lại!", 'notify');
            }
        } catch (e) {
            console.log(e);
        }
    }
}
