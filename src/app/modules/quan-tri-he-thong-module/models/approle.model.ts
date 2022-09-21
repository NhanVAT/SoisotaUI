import {AbstractAuditing} from "../../compoents-customer-module/models/abstract-auditing.model";

export interface AppRole extends AbstractAuditing {
    roleId: string;
    id: number;
    roleName: string;
    menus: any;
    active: boolean;
    createdBy: string;
    createdDate: any;
    lastModifiedBy: string;
    lastModifiedDate: any;
}
