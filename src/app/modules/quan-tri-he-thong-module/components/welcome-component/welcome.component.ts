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

  constructor(private router: Router) { }

  ngOnInit(): void {
      this.initTabMenu();
      this.initSelectList();
  }

    private initTabMenu() {
        this.items = [
            {label: 'Đồ ăn', styleClass : 'p-menuitem-active'},
            {label: 'Thực phẩm' , url: '/login'},
            {label: 'Siêu thi', url: '/register'},
            {label: 'Quán ăn', url: ''},
            {label: 'Quán nước', url: ''}
        ];

        this.activeItem = this.items[0];
    }

    activeMenu(event) {
        let node = event.target.parentNode;

        let menuitem = document.getElementsByClassName("p-menuitem");
        for (let i = 0; i < menuitem.length; i++) {
            menuitem[i].classList.remove("active");
        }
        node.classList.add("active");
    }

    private initSelectList() {
        this.selectsItem = [
            {label: 'Đồng Hới', value: '1'},
            {label: 'abc', value: '2'},
        ];
    }

    onLogin() {
        this.router.navigate(['/login']);
    }
}
