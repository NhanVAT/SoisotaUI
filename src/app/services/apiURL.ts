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
}

export class SERVICE_GATEWAY {
    public static USER = "ServiceReport-Report-context-root/resources/serviceReport/";
    public static ROLE = "ServiceCommon-busCommon-context-root/resources/sercommon/";
    public static DANHMUC = "ServiceDichVu-DichVu-context-root/resources/serviceDichVu/";
}
