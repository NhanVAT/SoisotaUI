import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppCodeModule} from 'src/app/app-systems/app-code/app.code.component';
import {LoadingComponent} from './components/loading-component/loading.component';
import {iComponentBase} from './functions/iComponentBase.component';
import {iServiceBase} from './functions/iServiceBase';
import {NumberReplacerPipe} from './pipes/customerNumber.pipe';
import {ComponentModule} from '../components-module/component.modules';
import {StyleClassModule} from 'primeng/styleclass';
import {OpenPagePopupComponent} from './components/open-page-popup/open-page-popup.component';

@NgModule({
    imports: [
        ComponentModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AppCodeModule,
        StyleClassModule
    ],
    providers: [
        iServiceBase,
    ],
    declarations: [
        iComponentBase,
        LoadingComponent,
        NumberReplacerPipe,
        OpenPagePopupComponent,
    ],
    exports: [
        iComponentBase,
        LoadingComponent,
        NumberReplacerPipe,
        OpenPagePopupComponent
    ],
})
export class ComponentCustomerModule {
}
