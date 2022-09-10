import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-loading-module',
    templateUrl: './loading-module.component.html',
    styleUrls: ['./loading-module.component.scss']
})
export class LoadingModuleComponent implements OnInit {
    @Input('timeout') timeout: any;
    @Output() onTimeout: EventEmitter<any> = new EventEmitter<any>();

    public _isLoading = false;

    constructor() {
    }

    ngOnInit() {
    }

    @Input() set isLoading(value: boolean) {
        this._isLoading = value;
        document.body.style.cursor = value ? 'wait' : 'default';
    }

    Loaded() {
        this._isLoading = false;
        document.body.style.cursor = 'default';
    }

}
