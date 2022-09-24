// tslint:disable
export class PHAN_HE {

    public static USER = "User";
    public static ROLE = "Role";
    public static DANHMUC = "DanhMuc";
    public static QTHT = "QTHT";
}

// Service User
export class API_USER {
    public static SIGNIN = "signin";
    public static GET_INFO_CURRENT_USER = "getInfoCurrentUser";
    public static REGISTER = "register";
}

// Service Role
export class API_ROLE {
    public static GET_DVI_QLY = "getDviqly";
}

// Service Danh Mục
export class API_DANH_MUC {
    public static GET_DVI_QLY = "getDviqly";
}

// Service QTHT
export class API_QTHT {
    public static GET_ALL_ROLE = "getAllRole";

    public static GET_ALL_MENU = "getAllMenu";
    public static INSERT_APP_ROLE = "insertAppRole";
    public static UPDATE_APP_ROLE = "updateAppRole";
    public static DELETE_APP_ROLE = "deleteAppRole";
    public static DELETE_LIST_APP_ROLE = "deleteListAppRole";
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
