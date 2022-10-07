import {AbstractAuditing} from "../../compoents-customer-module/models/abstract-auditing.model";

export class AppRole extends AbstractAuditing {

    roleId: string;
    roleKey: string;
    id: number;
    roleName: string;
    roleDescribe: string;
    menus: any;
    lstMenuId: any[];

}
