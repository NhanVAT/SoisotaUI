import {AbstractAuditing} from '../../compoents-customer-module/models/abstract-auditing.model';

export class AppUser implements AbstractAuditing {
    constructor() {
    }

    id: number;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    password: string;
    confirmPassword: string;
    address: string;
    phone: string;
    userId: any;
    userName: string;
    appRoles: any;
    active: boolean;
    createdBy: string;
    createdDate: any;
    lastModifiedBy: string;
    lastModifiedDate: any;
    lstRoleId: any[];
}
