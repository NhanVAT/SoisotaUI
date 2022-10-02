import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    items: MenuItem[] = [];
    activeItem: MenuItem;
    selectsItem: any[] = [];
    selectedItem: any;
    displayModal: boolean;
    listLinkFooter: any[] = [];
    address: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
      this.onInitPage();
  }
    private onInitPage() {
        this.onInitTabMenu();
        this.onInitSelectList();
        this.onInitListLinkFooter();

        this.address = {
            content: 'Soisota Team \nthành phố Đồng Hới, tỉnh Quảng Bình',
            phone: '0922211222',
            email: 'soisotasupport@gmail.com'
        };
            //
            // `Soisota \nthành phố Đồng Hới, tỉnh Quảng Bình \nSố điện thoại: 0922211222 ` +
            // `\nEmail: <a href="mailto:soisotasupport@gmail.com">`;
    }

    private onInitTabMenu() {
        this.items = [
            {label: 'Đồ ăn', url: '/', id: 'menu1'},
            {label: 'Thực phẩm' , url: '/login', id: 'menu2'},
            {label: 'Siêu thi', url: '/register', id: 'menu3'},
            {label: 'Quán ăn', url: '', id: 'menu4'},
            {label: 'Quán nước', url: '', id: 'menu5'}
        ];

        this.activeItem = this.items[0];
    }

    private onInitSelectList() {
        this.selectsItem = [
            {label: 'Đồng Hới', value: '1'},
            {label: 'abc', value: '2'},
        ];
    }

    onLogin() {
        this.router.navigate(['/login']);
    }

    onClickTabMenu(event, idMenu) {
        //console.log(idMenu);
        event.preventDefault();
        for (let i = 0; i < this.items.length; i++) {
            document.getElementById(this.items[i].id).style.borderBottom = 'none';
        }
        document.getElementById(idMenu).style.borderBottom = '4px red solid';
    }
    showModalDialog() {
        this.displayModal = true;
    }

    private onInitListLinkFooter() {
        this.listLinkFooter = [
            {name : 'Giới thiệu', url : '/' },
            {name : 'Trung trợ giúp', url : '/' },
            {name : 'Liên hệ', url : '/' }
        ];
    }


}
