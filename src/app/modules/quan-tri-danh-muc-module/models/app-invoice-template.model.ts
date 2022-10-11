import {AbstractAuditing} from '../../compoents-customer-module/models/abstract-auditing.model';

export class AppInvoiceTemplateModel extends AbstractAuditing{
    id: number;
    templateCode: string;
    templateName: string;
    templateType: string;
    templateDescribe: string;
    templateData: any[];
    templateDataBase64: string;
}
