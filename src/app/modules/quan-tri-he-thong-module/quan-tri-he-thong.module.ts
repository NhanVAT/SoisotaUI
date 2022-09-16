import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentCustomerModule } from '../compoents-customer-module/component-customer.modules';
import { ComponentModule } from '../components-module/component.modules';
import { LoginComponent } from './components/login-component/login.component';
import { SettingUserComponent } from './components/setting-user-component/setting-user.component';
import { RegisterComponent } from './components/register-component/register.component';


@NgModule({
    imports: [
        ComponentModule,
        ComponentCustomerModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        SettingUserComponent,
        RegisterComponent,
    ],
    exports: [
        LoginComponent,
        SettingUserComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    entryComponents: [
    ],
    bootstrap: []
})
export class QuanTriHeThongModule {
    constructor(private injector: Injector) {
    }
}
