import {Component} from '@angular/core';
import {AppBreadcrumbService} from '../../app.breadcrumb.service';

@Component({
    templateUrl: './documentation.component.html',
    styles: [`
        .docs h1 {
            margin-top: 30px;
        }

        .docs pre.doc-command {
            font-family: monospace;
            background-color: #2d353c;
            color: #dddddd;
            padding: 1em;
            font-size: 14px;
            border-radius: 3px;
            overflow: auto;
        }

        .inline-code {
            background-color: #0C2238;
            color: #dddddd;
            font-style: normal;
            font-size: 13px;
            padding: 0 .5em;
        }`
    ]
})
export class DocumentationComponent {

    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Start' },
            { label: 'Documentation', routerLink: ['/documentation'] }
        ]);
    }
}
