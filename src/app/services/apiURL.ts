// tslint:disable
export class PHAN_HE {

    public static USER = "User";
    public static ROLE = "Role";
    public static DANHMUC = "DanhMuc";
    public static QTHT = "QTHT";
    public static SMSEMAIL = "smsemail";
}

// Service User
export class API_USER {
    public static SIGNIN = "signin";
    public static GET_INFO_CURRENT_USER = "getInfoCurrentUser";
    public static REGISTER = "register";
    public static CHECK_EMAIL = "checkEmail"
}

// Service Role
export class API_ROLE {
    public static GET_DVI_QLY = "getDviqly";
}

// Service Danh Mục
export class API_DANH_MUC {
    public static GET_DVI_QLY = "getDviqly";
    public static GET_ALL_INVOICE_TEMPLATE = "getAllInvoiceTemplate";
    public static INSERT_INVOICE_TEMPLATE = "insertAppInvoiceTemplate";
    public static UPDATE_INVOICE_TEMPLATE = "updateAppInvoiceTemplate";
    public static DELETE_INVOICE_TEMPLATE = "deleteAppInvoiceTemplate";
    public static DELETE_LIST_INVOICE_TEMPLATE = "deleteListAppInvoiceTemplate";
    public static GET_VIEW_INVOICE_TEMPLATE = "getViewInvoiceTemplate";
    public static GET_ALL_SMS_EMAIL_TEMPLATE = "getAllSmsEmailTemplate";
    public static INSERT_SMS_EMAIL_TEMPLATE = "insertAppSmsEmailTemplate";
    public static UPDATE_SMS_EMAIL_TEMPLATE = "updateAppSmsEmailTemplate";
    public static DELETE_SMS_EMAIL_TEMPLATE = "deleteAppSmsEmailTemplate";
    public static DELETE_LIST_SMS_EMAIL_TEMPLATE = "deleteListAppSmsEmailTemplate";
    public static GET_VIEW_SMS_EMAIL_TEMPLATE = "getViewSmsEmailTemplate";
}

// Service QTHT
export class API_QTHT {
    public static GET_ALL_ROLE = "getAllRole";
    public static GET_ALL_MENU = "getAllMenu";
    public static INSERT_APP_ROLE = "insertAppRole";
    public static UPDATE_APP_ROLE = "updateAppRole";
    public static DELETE_APP_ROLE = "deleteAppRole";
    public static DELETE_LIST_APP_ROLE = "deleteListAppRole";
    public static INSERT_APP_MENU = "insertAppMenu";
    public static UPDATE_APP_MENU = "updateAppMenu";
    public static DELETE_APP_MENU = "deleteAppMenu";
    public static DELETE_LIST_APP_MENU = "deleteListAppMenu";
    public static GET_ALL_USER = "getAllUser";
    public static INSERT_APP_USER = "insertAppUser";
    public static UPDATE_APP_USER = "updateAppUser";
    public static DELETE_APP_USER = "deleteAppUser";
    public static DELETE_LIST_APP_USER = "deleteListAppUser";

}

export class SERVICE_GATEWAY {
    public static USER = "ServiceReport-Report-context-root/resources/serviceReport/";
    public static ROLE = "ServiceCommon-busCommon-context-root/resources/sercommon/";
    public static DANHMUC = "ServiceDichVu-DichVu-context-root/resources/serviceDichVu/";
}

// Service SMSEMAIL
export class API_SMSEMAIL{
    public static SEND_EMAIL_BY_CONTENT = "sendEmailByContent"
    public static SEND_SMS_BY_CONTENT = "sendSMSByContent"
}
