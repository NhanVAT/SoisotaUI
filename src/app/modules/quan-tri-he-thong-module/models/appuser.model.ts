import {AbstractAuditing} from "../../compoents-customer-module/models/abstract-auditing.model";

export interface AppUser extends AbstractAuditing {
    id: number;
    email: string;
    password: string;
    userId: any;
    userName: string;
    appRoles: any;
}
