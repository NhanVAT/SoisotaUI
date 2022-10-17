import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AppUser} from '../../models/appuser.model';
import {iServiceBase} from '../../../compoents-customer-module/functions/iServiceBase';
import * as API from '../../../../services/apiURL';
import {Table} from 'primeng/table';
import {
    iComponentBase,
    mType
} from '../../../compoents-customer-module/functions/iComponentBase.component';
import {AppBreadcrumbService} from '../../../../app-systems/app-breadcrumb/app.breadcrumb.service';
import {ShareData} from '../../../compoents-customer-module/shared-data-services/sharedata.service';
import {AppRole} from '../../models/approle.model';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-quan-tri-nguoi-dung',
    templateUrl: './quan-tri-nguoi-dung.component.html',
    styleUrls: ['./quan-tri-nguoi-dung.component.scss'],
})

export class QuanTriNguoiDungComponent extends iComponentBase implements OnInit {

    userDialog: boolean;
    listAppUser: AppUser[] = [];
    listAppRole: AppRole[] = [];
    appUser: AppUser;
    selectedUsers: AppUser[] = [];
    selectedRoles: AppRole[] = [];
    loading: boolean;
    submitted: boolean;
    statuses: any[];
    userModel: AppUser = new AppUser();
    headerDialog: string;
    arrayAction: any[];

    @ViewChild('dt') table: Table;

    constructor(public breadcrumbService: AppBreadcrumbService,
                private shareData: ShareData,
                public messageService: MessageService,
                private confirmationService: ConfirmationService,
                private iServiceBase: iServiceBase,
                private sanitizer: DomSanitizer
    ) {
        super(messageService, breadcrumbService);
    }

    ngOnInit() {
        this.initlistActionDefault();
        this.loadAllUser();
        this.getAllRole();
    }

    initlistActionDefault() {
        this.arrayAction = [
            {name: 'Tác vụ', value: 'action'},
            {name: 'Sửa', value: 'editUser'},
            {name: 'Xóa', value: 'deleteUser'}
        ];
    }

    onCreateUser() {
        this.submitted = false;
        this.selectedRoles = [];
        this.userModel = new AppUser();

        this.userModel.active = true;

        this.headerDialog = 'Thêm mới người dùng';
        this.userDialog = true;
    }

    onUpdateUser(user: AppUser) {
        const headerDialog = `Cập nhật người dùng: ${user.fullName}`;
        this.submitted = false;
        this.userDialog = true;

        this.userModel = Object.assign({}, user);
        let fullname = this.userModel.fullName;
        let firstName = fullname.split(' ')[0];
        this.userModel.firstName = firstName;
        let lastName = fullname.split(' ').slice(1, fullname.length).join(' ');
        this.userModel.lastName = lastName;
        this.selectedRoles = [];
        for (let i = 0; i < user.appRoles.length; i++) {
            this.selectedRoles.push(this.listAppRole.filter(val => val.id === user.appRoles[i].id)[0]);
        }
    }

    async updateUser(user) {
        const response = await this.iServiceBase.putDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.UPDATE_APP_USER, user);
        if (response && response.success) {
            this.showMessage(mType.success, 'Thông báo', 'Cập nhật người dùng thành công!', 'notify');

            // load again
            await this.loadAllUser();

            this.userDialog = false;
        } else {
            this.showMessage(mType.error, 'Thông báo', 'Cập nhật người dùng không thành công. Vui lòng xem lại!', 'notify');
        }
    }

    onDeleteUser(user: AppUser, event) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Bạn có chắc muốn xoá người dùng này chứ ' + user.fullName + ' (' + user.userId + ') ' + '?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteUser(user);
            }
        });
    }

    async deleteUser(user: AppUser) {
        try {
            let param = user.userName;

            let response = await this.iServiceBase.postDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.DELETE_APP_USER, param);

            if (response != '') {
                this.showMessage(mType.success, "Thông báo", "Xóa người dùng thành công!", 'notify');

                //lấy lại danh sách All Role
                this.loadAllUser();

            } else {
                this.showMessage(mType.error, "Thông báo", "Xóa người không thành công. Vui lòng xem lại!", 'notify');
            }
        } catch (e) {
            console.log(e);
        }
    }

    async deleteListUser() {
        try {
            let param = this.selectedUsers.map(o => o.id);
            let response = await this.iServiceBase.postDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.DELETE_LIST_APP_USER, param, true);
            if (response) {
                this.showMessage(mType.success, "Thông báo", "Xóa người dùng thành công!", 'notify');
                this.loadAllUser();
            } else {
                this.showMessage(mType.success, "Thông báo", "Xóa người dùng không thành công. Vui lòng xem lại!", 'notify');
            }
        } catch (e) {
            console.log(e);
        }
    }

    onDeleteListUser() {
        console.log(123);
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn xóa những người dùng đã chọn ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteListUser();
            }
        });
    }

    async loadAllUser() {
        this.listAppUser = [];
        this.selectedRoles = [];
        try {
            this.loading = true;

            const response = await this.iServiceBase.getDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.GET_ALL_USER);

            if (response && response.length) {
                this.listAppUser = response;

                if (this.listAppUser && this.listAppUser.length) {
                    this.listAppUser.forEach(user => {
                        if (user.avatarImage) {
                            user.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${user.avatarImage}`);
                        }
                    });
                }
            }

            this.loading = false;
        } catch (e) {
            console.log(e);
            this.loading = false;
        }
    }

    async getAllRole() {
        this.listAppRole = [];
        try {
            this.loading = true;
            const response = await this.iServiceBase.getDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.GET_ALL_ROLE);
            if (response && response.length) {
                this.listAppRole = response;
                //console.log(this.listAppRole);
            }
            this.loading = false;
        } catch (e) {
            console.log(e);
            this.loading = false;
        }
    }

    bindingDataUserModel(): AppUser {
        const result = new AppUser();
        if (this.shareData && this.shareData.userInfo) {
            result.lstRoleId = [];
            this.selectedRoles.forEach(each => {
                result.lstRoleId.push(each.id);
            });

            // update
            if (this.userModel.id && this.userModel.id > 0) {
                result.id = this.userModel.id;
                result.userId = this.userModel.userId;
                result.fullName = this.userModel.firstName + ' ' + this.userModel.lastName;
                result.userName = this.userModel.userName;
                result.email = this.userModel.email;
                result.password = this.userModel.password;
                result.confirmPassword = this.userModel.confirmPassword;
                result.phone = this.userModel.phone;
                result.address = this.userModel.address;
                result.createdBy = this.userModel.createdBy;
                result.createdDate = this.userModel.createdDate;
                result.active = this.userModel.active;
                result.lastModifiedBy = this.shareData.userInfo.userName;
                result.lastModifiedDate = new Date();
            } else {
                result.fullName = this.userModel.firstName + ' ' + this.userModel.lastName;
                result.userName = this.userModel.userName;
                result.email = this.userModel.email;
                result.password = this.userModel.password;
                result.confirmPassword = this.userModel.confirmPassword;
                result.phone = this.userModel.phone;
                result.address = this.userModel.address;
                result.active = this.userModel.active;
                result.userId = result.userName;
                result.createdBy = this.shareData.userInfo.userName;
                result.createdDate = new Date();
            }
        }
        return result;
    }

    async createUser(userEnity) {
        try {
            let param = userEnity;
            let respone = await this.iServiceBase.postDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.INSERT_APP_USER, param, true);
            if (respone && respone.success) {
                this.showMessage(mType.success, "Thông báo", "Thêm mới người dùng thành công!", 'notify');
                this.userDialog = false;

                this.loadAllUser();
                this.userDialog = false;
            } else {
                this.showMessage(mType.error, "Thông báo", "Thêm mới nggưi dùng không thành công. Vui lòng xem lại!", 'notify');
            }
        } catch (e) {
            console.log(e);
        }
    }

    onSaveUser() {
        const userEnity = this.bindingDataUserModel();
        if (this.validateUserModel()) {
            if (userEnity && userEnity.id && userEnity.id > 0) {
                this.updateUser(userEnity);
            } else {
                this.createUser(userEnity);
            }
        }

    }

    onCancelUser() {
        this.userDialog = false;
        this.submitted = false;
    }

    validateUserModel(): boolean {
        if (!this.userModel.firstName || this.userModel.firstName == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập họ!", 'notify');
            return false;
        }
        if (!this.userModel.lastName || this.userModel.lastName == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập tên!", 'notify');
            return false;
        }
        if (!this.userModel.userName || this.userModel.userName == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập tên đăng nhập!", 'notify');
            return false;
        }
        if (!this.userModel.password || this.userModel.password == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập mật khẩu!", 'notify');
            return false;
        }
        if (!this.userModel.confirmPassword || this.userModel.confirmPassword == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập lại mật khẩu!", 'notify');
            return false;
        }
        if (this.userModel.password !== this.userModel.confirmPassword) {
            this.showMessage(mType.warn, "Thông báo", "Mật khẩu không giống nhau! ", 'notify');
            return false;
        }
        if (!this.userModel.phone || this.userModel.phone == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập số điện thoại! ", 'notify');
            return false;
        }
        if (!this.userModel.email || this.userModel.email == '') {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa nhập emai! ", 'notify');
            return false;
        }
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (re.test(this.userModel.email) == false) {
            this.showMessage(mType.warn, "Thông báo", "Bạn nhập email chưa đúng! ", 'notify');
            return false;
        }
        var reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (reg.test(this.userModel.phone) == false) {
            this.showMessage(mType.warn, "Thông báo", "Số điện thoại bạn nhập không đúng! ", 'notify');
            return false;
        }
        if (!this.selectedRoles || this.selectedRoles.length === 0) {
            this.showMessage(mType.warn, "Thông báo", "Bạn chưa chọn phân quyền! ", 'notify');
            return false;
        }
        return true;
    }
}


