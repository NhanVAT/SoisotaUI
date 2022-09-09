import {Component} from '@angular/core';
import {AppBreadcrumbService} from '../app.breadcrumb.service';

@Component({
    templateUrl: './flexbox.component.html',
    styleUrls: ['./flexbox.scss']
})
export class FlexboxComponent {
    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Utilities' },
            { label: 'FlexBox', routerLink: ['/utilities/flexbox'] }
        ]);
    }
}
