import {Component, HostListener, OnInit} from '@angular/core';
import {FilterService, MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {CountryService} from '../../../../demo/service/countryservice';

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
    displaymodalSearch: boolean;
    listLinkFooter: any[] = [];
    address: any;
    y: any = 0;
    lengthListRestaurant: any = 0;
    yAbsolute: any = 0;
    selectedCountry: any[];
    filteredCountries: any[];
    countries: any[];
  constructor(private router: Router, private countryService: CountryService, private filterService: FilterService) { }

  ngOnInit(): void {
      this.onInitPage();
      this.countryService.getCountries().then(countries => {
          this.countries = countries;
      });
  }
    filterCountry(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.countries.length; i++) {
            let country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
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

        this.lengthListRestaurant = document.getElementById('main_home').offsetHeight;
        this.yAbsolute = this.lengthListRestaurant - 637 ;
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
    showModalDialogSearch(){
        this.displaymodalSearch = true;
    }

    closeDialogSearch(){
        this.displaymodalSearch = false;
    }

    private onInitListLinkFooter() {
        this.listLinkFooter = [
            {name : 'Giới thiệu', url : '/' },
            {name : 'Trung trợ giúp', url : '/' },
            {name : 'Liên hệ', url : '/' }
        ];
    }

    @HostListener("document:scroll")
    onScrollBanner(){
        this.y = window.scrollY;
        console.log(this.y);
        if (this.y >= this.yAbsolute){
            console.log('vao' + this.yAbsolute);
            let top = this.lengthListRestaurant - 635;
            document.getElementById('scroll_div').style.position = 'absolute';
            document.getElementById('scroll_div').style.top = top   + 'px';
        }else{
            document.getElementById('scroll_div').style.position = 'fixed';
            document.getElementById('scroll_div').style.top = '0px';
        }
    }


}

