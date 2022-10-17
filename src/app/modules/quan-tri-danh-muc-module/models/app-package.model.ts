import {AbstractAuditing} from '../../compoents-customer-module/models/abstract-auditing.model';

export class AppPackageModel extends AbstractAuditing{
    id: number;
    packageCode: string;
    packageName: string;
    packageType: string;
    packageEffectiveTime: number;
    packageMaximumInvoice: number;
    packageDescribe: string;
}
