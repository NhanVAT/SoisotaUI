import {AbstractAuditing} from "../../compoents-customer-module/models/abstract-auditing.model";

export interface AppMenu extends AbstractAuditing {
    id: number;
    menuBadge: string;
    menuBadgeClass: string;
    menuIcon: string;
    menuId: string;
    menuName: string;
    menuOrder: string;
    menuParent: string;
    menuPrjName: string;
    menuRouterLink: string;
    menuTarget: string;
    menuUrl: string;
}
