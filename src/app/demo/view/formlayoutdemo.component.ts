import {Component} from '@angular/core';
import {AppBreadcrumbService} from '../../app.breadcrumb.service';

@Component({
    templateUrl: './formlayoutdemo.component.html'
})
export class FormLayoutDemoComponent {

    selectedState: any = null;

    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'UI Kit' },
            { label: 'Form Layout', routerLink: ['/uikit/formlayout'] }
        ]);
    }

    states: any[] = [
        {name: 'Arizona', code: 'Arizona'},
        {name: 'California', value: 'California'},
        {name: 'Florida', code: 'Florida'},
        {name: 'Ohio', code: 'Ohio'},
        {name: 'Washington', code: 'Washington'}
    ];
}
