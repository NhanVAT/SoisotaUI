import {AbstractAuditing} from '../../compoents-customer-module/models/abstract-auditing.model';

export class AppSmsEmailModel extends AbstractAuditing{
    id: number;
    active: boolean;
    templateCode: string;
    templateContent: string;
    templateDescribe: string;
    templateName: string;
    templateType: string;
}
