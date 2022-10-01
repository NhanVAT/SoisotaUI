import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {Injector, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentCustomerModule} from '../compoents-customer-module/component-customer.modules';
import {ComponentModule} from '../components-module/component.modules';
import {LoginComponent} from './components/login-component/login.component';
import {SettingUserComponent} from './components/setting-user-component/setting-user.component';
import {RegisterComponent} from './components/register-component/register.component';
import {QuanTriMenuComponent} from './components/quan-tri-menu/quan-tri-menu.component';
import {RouterModule, Routes} from "@angular/router";
import {QuanTriPhanQuyenComponent} from './components/quan-tri-phan-quyen/quan-tri-phan-quyen.component';
import {QuanTriNguoiDungComponent} from './components/quan-tri-nguoi-dung/quan-tri-nguoi-dung.component';
import { WelcomeComponent } from './components/welcome-component/welcome.component';
import {AppComponent} from '../../app.component';

const routes: Routes = [
    {path: 'QuanTriMenu', component: QuanTriMenuComponent},
    {path: 'QuanTriNguoiDung', component: QuanTriNguoiDungComponent},
    {path: 'QuanTriPhanQuyen', component: QuanTriPhanQuyenComponent},
]

@NgModule({
    imports: [
        ComponentModule,
        ComponentCustomerModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        LoginComponent,
        SettingUserComponent,
        RegisterComponent,
        QuanTriMenuComponent,
        QuanTriPhanQuyenComponent,
        QuanTriNguoiDungComponent,
        WelcomeComponent,
    ],
    exports: [
        LoginComponent,
        SettingUserComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class QuanTriHeThongModule {
    constructor(private injector: Injector) {
    }
}
