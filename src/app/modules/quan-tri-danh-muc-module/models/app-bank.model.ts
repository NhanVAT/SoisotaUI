import {AbstractAuditing} from "../../compoents-customer-module/models/abstract-auditing.model";

export class AppBank extends AbstractAuditing {
    id: number;
    bankCode: string;
    bankName: string;
    bankType: string;
    bankDescribe: string;
}
