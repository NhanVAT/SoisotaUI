import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {Injector, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentCustomerModule} from '../compoents-customer-module/component-customer.modules';
import {ComponentModule} from '../components-module/component.modules';
import {RouterModule, Routes} from '@angular/router';
import {
    DanhMucNganHangComponent
} from './components/danh-muc-ngan-hang/danh-muc-ngan-hang.component';
import {DanhMucGoiCuocComponent} from './components/danh-muc-goi-cuoc/danh-muc-goi-cuoc.component';
import {
    DanhMucMauHoaDonComponent
} from './components/danh-muc-mau-hoa-don/danh-muc-mau-hoa-don.component';
import { DanhMucSmsEmailComponent } from './components/danh-muc-sms-email/danh-muc-sms-email.component'


const routes: Routes = [
    {path: 'DanhMucNganHang', component: DanhMucNganHangComponent},
    {path: 'DanhMucGoiCuoc', component: DanhMucGoiCuocComponent},
    {path: 'DanhMucMauHoaDon', component: DanhMucMauHoaDonComponent},
    {path: 'DanhMucMauSMSEmail', component: DanhMucSmsEmailComponent},
];

@NgModule({
    imports: [
        ComponentModule,
        ComponentCustomerModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),

    ],
    declarations: [
        DanhMucNganHangComponent,
        DanhMucGoiCuocComponent,
        DanhMucMauHoaDonComponent,
        DanhMucSmsEmailComponent
    ],
    exports: [],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    entryComponents: [],
    bootstrap: []
})
export class QuanTriDanhMucModule {
    constructor(private injector: Injector) {
    }
}
