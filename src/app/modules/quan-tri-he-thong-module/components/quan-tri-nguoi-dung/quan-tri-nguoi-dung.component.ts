import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AppUser} from '../../models/appuser.model';
import {iServiceBase} from '../../../compoents-customer-module/functions/iServiceBase';
import * as API from '../../../../services/apiURL';
import {Table} from 'primeng/table';
import {iComponentBase, mType} from '../../../compoents-customer-module/functions/iComponentBase.component';
import {AppBreadcrumbService} from '../../../../app-systems/app.breadcrumb.service';
import {ShareData} from '../../../compoents-customer-module/shared-data-services/sharedata.service';
import {AppRole} from '../../models/approle.model';


@Component({
  selector: 'app-quan-tri-nguoi-dung',
  templateUrl: './quan-tri-nguoi-dung.component.html',
  styleUrls: ['./quan-tri-nguoi-dung.component.scss'],
})

export class QuanTriNguoiDungComponent extends iComponentBase implements OnInit {

    userDialog: boolean;
    listAppUser: AppUser[] = [];
    listAppRole: AppRole[];
    appUser: AppUser;
    selectedUsers: AppUser[];
    selectedRoles: AppRole[];
    loading: boolean;
    submitted: boolean;
    statuses: any[];
    userModel: AppUser = new AppUser();
    headerDialog: string;
    arrayAction: any[] = [
        {name: 'Action', value: 'action'},
        {name: 'Edit', value: 'editUser'},
        {name: 'Delete', value: 'deleteUser'}
    ];

    @ViewChild('dt') table: Table;
    constructor(public breadcrumbService: AppBreadcrumbService,
                private shareData: ShareData,
                public messageService: MessageService,
                private confirmationService: ConfirmationService,
                private iServiceBase: iServiceBase,
    ) { super(messageService, breadcrumbService);
    }
    ngOnInit() {
        this.loadAllUser();
        this.getAllRole();
    }

    onChangeAction(user: AppUser, selectValue: any) {
        switch (selectValue.value){
            case 'editUser':
                this.onEditUser(user);
                break;
            case 'deleteUser':
                this.onDeleteUser(user);
                break;
        }
        // console.log(valueOption +"-" + deviceValue );

    }

    openNew() {
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.listAppUser = this.listAppUser.filter(val => !this.selectedUsers.includes(val));
                this.selectedUsers = null;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
            }
        });
    }

     onEditUser(user: AppUser) {
        const headerDialog = `Cập nhật người dùng: ${user.fullName}`;
        this.userModel = user;
        this.selectedRoles = user.appRoles;
        console.log(this.selectedRoles);
        this.openDialog(headerDialog);

    }
    async editUser(user){
        const response = await this.iServiceBase.postDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.UPDATE_APP_USER, user);
        if (response && response.success) {
            this.showMessage(mType.success, 'Thông báo', 'Cập nhật người dùng thành công!', 'notify');

            // load again
            await this.loadAllUser();

        } else {
            this.showMessage(mType.error, 'Thông báo', 'Cập nhật người dùng không thành công. Vui lòng xem lại!', 'notify');
        }
    }

    onDeleteUser(user: AppUser) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc muốn xoá người dùng này chứ ' + user.fullName + ' (' + user.userId + ') ' + '?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteUser(user);
            }
        });
    }
    deleteUser(user: AppUser){
    }
    async loadAllUser() {
        try {
            const response = await this.iServiceBase.getDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.GET_ALL_USER);
            if (response && response.length) {
                this.loading = true;
                this.listAppUser = response;
                console.log(this.listAppUser);
                this.loading = false;
            }
        }catch (e){
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
            }
            this.loading = false;
        } catch (e) {
            console.log(e);
            this.loading = false;
        }
    }
    bindingDataUserModel(): AppUser{
        const result = new AppUser();
        if (this.shareData && this.shareData.userInfo){
            if (this.userModel.id && this.userModel.id > 0){
                result.userId = this.userModel.userId;
                result.fullName = this.userModel.firstName + ' ' + this.userModel.lastName;
                result.userName = this.userModel.userName;
                result.email = this.userModel.email;
                result.password = this.userModel.password;
                result.phone = this.userModel.phone;
                result.address = this.userModel.address;
                result.appRoles = this.selectedRoles;
            }
            else{
                result.userId = this.userModel.userId;
                result.fullName = this.userModel.firstName + ' ' + this.userModel.lastName;
                result.userName = this.userModel.userName;
                result.email = this.userModel.email;
                result.password = this.userModel.password;
                result.phone = this.userModel.phone;
                result.address = this.userModel.address;
                result.appRoles = this.selectedRoles;
        }}
        return result;
    }
    // async createUser(userEnity){
    //     try{
    //     let param = userEnity;
    //     let respone = await this.iServiceBase.postDataAsync(API.PHAN_HE.QTHT, API.API_QTHT.INSERT_APP_USER, param, true);
    //     if (respone && respone.success){
    //         this.showMessage(mType.success,"Thông báo", "Thêm mới người dùng thành công!",'notify' );
    //         this.userDialog = false;
    //         this.loadAllUser();
    //         this.userModel = new AppUser();
    //     }else {
    //         this.showMessage(mType.error, "Thông báo", "Thêm mới nggưi dùng không thành công. Vui lòng xem lại!", 'notify');
    //         }
    //     } catch (e) {
    //     console.log(e);
    // }
    // }
    saveUser(){
        console.log(this.selectedRoles);
        const userEnity = this.bindingDataUserModel();
        this.editUser(userEnity);
        console.log('aaaaa');
        console.log(userEnity);
    }
    onCreateUser(){
    this.openDialog('Tạo người dùng mới');
}
    openDialog(header: string) {
        this.headerDialog = header;
        this.submitted = false;
        this.userDialog = true;
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }
}


