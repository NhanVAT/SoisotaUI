import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './demo/view/dashboard.component';
import {DashboardAnalyticsComponent} from './demo/view/dashboardanalytics.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppContactusComponent} from './pages/app.contactus.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLandingComponent} from './pages/app.landing.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {DisplayComponent} from './utilities/display.component';
import {ElevationComponent} from './utilities/elevation.component';
import {FlexboxComponent} from './utilities/flexbox.component';
import {GridComponent} from './utilities/grid.component';
import {IconsComponent} from './utilities/icons.component';
import {WidgetsComponent} from './utilities/widgets.component';
import {SpacingComponent} from './utilities/spacing.component';
import {TypographyComponent} from './utilities/typography.component';
import {TextComponent} from './utilities/text.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import {AppWizardComponent} from './pages/app.wizard.component';
import {
    LoginComponent,
    SettingUserComponent
} from './modules/quan-tri-he-thong-module/quan-tri-he-thong';
import {
    RegisterComponent
} from './modules/quan-tri-he-thong-module/components/register-component/register.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/register',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'Home', component: AppMainComponent,
        children: [

            {path: '', component: DashboardComponent},
            {path: 'favorites/dashboardanalytics', component: DashboardAnalyticsComponent},
            {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
            {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
            {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
            {path: 'uikit/input', component: InputDemoComponent},
            {path: 'uikit/button', component: ButtonDemoComponent},
            {path: 'uikit/table', component: TableDemoComponent},
            {path: 'uikit/list', component: ListDemoComponent},
            {path: 'uikit/tree', component: TreeDemoComponent},
            {path: 'uikit/panel', component: PanelsDemoComponent},
            {path: 'uikit/overlay', component: OverlaysDemoComponent},
            {path: 'uikit/menu', component: MenusDemoComponent},
            {path: 'uikit/media', component: MediaDemoComponent},
            {path: 'uikit/message', component: MessagesDemoComponent},
            {path: 'uikit/misc', component: MiscDemoComponent},
            {path: 'uikit/charts', component: ChartsDemoComponent},
            {path: 'uikit/file', component: FileDemoComponent},
            {path: 'utilities/display', component: DisplayComponent},
            {path: 'utilities/elevation', component: ElevationComponent},
            {path: 'utilities/flexbox', component: FlexboxComponent},
            {path: 'utilities/grid', component: GridComponent},
            {path: 'utilities/icons', component: IconsComponent},
            {path: 'utilities/widgets', component: WidgetsComponent},
            {path: 'utilities/spacing', component: SpacingComponent},
            {path: 'utilities/typography', component: TypographyComponent},
            {path: 'utilities/text', component: TextComponent},
            {path: 'pages/crud', component: AppCrudComponent},
            {path: 'pages/calendar', component: AppCalendarComponent},
            {path: 'pages/timeline', component: AppTimelineDemoComponent},
            {path: 'pages/invoice', component: AppInvoiceComponent},
            {path: 'pages/help', component: AppHelpComponent},
            {path: 'pages/empty', component: EmptyDemoComponent},
            {path: 'documentation', component: DocumentationComponent},

            // Hợp đồng module
            // {
            //     path: 'HopDong',
            //     loadChildren: () => import('./modules/hop-dong-module/hop-dong.module').then(m => m.HopDongModule),
            // },
            // Quản trị hệ thống module
            {
                path: 'QTriHThong',
                loadChildren: () => import('./modules/quan-tri-he-thong-module/quan-tri-he-thong.module').then(m => m.QuanTriHeThongModule),
            },
            // Quản trị đối tác module
            {
                path: 'QTriDoiTac',
                loadChildren: () => import('./modules/quan-tri-doi-tac-module/quan-tri-doi-tac.module').then(m => m.QuanTriDoiTacModule),
            },
            // Quản trị danh mục module
            {
                path: 'QTriDanhMuc',
                loadChildren: () => import('./modules/quan-tri-danh-muc-module/quan-tri-danh-muc.module').then(m => m.QuanTriDanhMucModule),
            },
            // Quản trị cửa hàng module
            {
                path: 'QTriCuaHang',
                loadChildren: () => import('./modules/quan-tri-cua-hang-module/quan-tri-cua-hang.module').then(m => m.QuanTriCuaHangModule),
            },


            {path: 'SettingUser', component: SettingUserComponent}
        ]
    },
    {path: 'error', component: AppErrorComponent},
    {path: 'access', component: AppAccessdeniedComponent},
    {path: 'notfound', component: AppNotfoundComponent},
    {path: 'contactus', component: AppContactusComponent},
    {path: 'landing', component: AppLandingComponent},
    {path: 'pages/wizard', component: AppWizardComponent},
    {path: '**', redirectTo: '/notfound'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
