import {Component} from '@angular/core';
import {AppBreadcrumbService} from '../app.breadcrumb.service';

@Component({
    templateUrl: './text.component.html',
    styles: [`
        .demo-container {
            border: 1px solid var(--surface-d);
        }
    `]
})
export class TextComponent {

    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Utilities' },
            { label: 'Text', routerLink: ['/utilities/text'] }
        ]);
    }
}
