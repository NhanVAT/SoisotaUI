import {AbstractAuditing} from "../../compoents-customer-module/models/abstract-auditing.model";

export class AppRole implements AbstractAuditing {

    constructor() {
    }

    roleId: string;
    roleKey: string;
    id: number;
    roleName: string;
    roleDescribe: string;
    menus: any;
    lstMenuId: any[];
    active: boolean;
    createdBy: string;
    createdDate: any;
    lastModifiedBy: string;
    lastModifiedDate: any;
}
