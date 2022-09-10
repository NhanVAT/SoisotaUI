import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoadingService} from "../../shared-data-services/loading.service";


@Component({
    selector: 'cmis-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

    @Input() isLoading: boolean;
    @Output() onTimeout: EventEmitter<any> = new EventEmitter<any>();
    @Input('timeout') timeout: any;

    constructor(public loadingService: LoadingService) {
    }
}
