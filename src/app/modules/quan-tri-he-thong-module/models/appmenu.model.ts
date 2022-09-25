import {AbstractAuditing} from "../../compoents-customer-module/models/abstract-auditing.model";
import {TreeNode} from "primeng/api";

export class AppMenu<T = any> implements AbstractAuditing, TreeNode {
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
    active: boolean;
    createdBy: string;
    createdDate: any;
    lastModifiedBy: string;
    lastModifiedDate: any;

    label?: string;
    data?: T;
    icon?: string;
    expandedIcon?: any;
    collapsedIcon?: any;
    children?: TreeNode<T>[];
    leaf?: boolean;
    expanded?: boolean;
    type?: string;
    parent?: TreeNode<T>;
    partialSelected?: boolean;
    styleClass?: string;
    draggable?: boolean;
    droppable?: boolean;
    selectable?: boolean;
    key?: string;
}
