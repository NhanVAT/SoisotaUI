import {Component, OnInit} from '@angular/core';
import {EventService} from '../demo/service/eventservice';
import {SelectItem} from 'primeng/api';
import {Product} from '../demo/domain/product';
import {ProductService} from '../demo/service/productservice';
import {AppBreadcrumbService} from '../app.breadcrumb.service';
import { AppMainComponent } from '../app.main.component';
import { AppComponent } from '../app.component';

@Component({
    templateUrl: './widgets.component.html'
})
export class WidgetsComponent implements OnInit {

    cities: SelectItem[];

    products: Product[];

    chartData: any;

    chartOptions: any;

    chartMonthlyData: any;

    radarChartData: any;

    events: any[];

    selectedCity: any;

    timelineEvents: any[];

    overviewChartData1: any;

    overviewChartData2: any;

    overviewChartData3: any;

    overviewChartData4: any;

    overviewChartOptions: any;

    constructor(public app: AppComponent, public appMain: AppMainComponent, private productService: ProductService,
                private eventService: EventService, private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Utilities' },
            { label: 'Widgets', routerLink: ['/utilities/widgets'] }
        ]);
    }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.eventService.getEvents().then(events => {this.events = events; });

        this.cities = [];
        this.cities.push({label: 'Select City', value: null});
        this.cities.push({label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}});
        this.cities.push({label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}});
        this.cities.push({label: 'London', value: {id: 3, name: 'London', code: 'LDN'}});
        this.cities.push({label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}});
        this.cities.push({label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}});

        this.chartData = this.getChartData();
        this.chartOptions = this.getChartOptions();

        this.overviewChartData1 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
            datasets: [{
                data: [50, 64, 32, 24, 18, 27, 20, 36, 30],
                borderColor: [
                    '#4DD0E1',
                ],
                backgroundColor: [
                    'rgba(77, 208, 225, 0.8)',
                ],
                borderWidth: 2,
                fill: true,
                tension: .4
            }
        ]};

        this.overviewChartData2 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
            datasets: [{
                data: [11, 30, 52, 35, 39, 20, 14, 18, 29],
                borderColor: [
                    '#4DD0E1',
                ],
                backgroundColor: [
                    'rgba(77, 208, 225, 0.8)',
                ],
                borderWidth: 2,
                fill: true,
                tension: .4
            }
        ]};

        this.overviewChartData3 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
            datasets: [{
                data: [20, 29, 39, 36, 45, 24, 28, 20, 15],
                borderColor: [
                    '#4DD0E1',
                ],
                backgroundColor: [
                    'rgba(77, 208, 225, 0.8)',
                ],
                borderWidth: 2,
                fill: true,
                tension: .4
            }
        ]};

        this.overviewChartData4 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
            datasets: [{
                data: [30, 39, 50, 21, 33, 18, 10, 24, 20],
                borderColor: [
                    '#4DD0E1',
                ],
                backgroundColor: [
                    'rgba(77, 208, 225, 0.8)',
                ],
                borderWidth: 2,
                fill: true,
                tension: .4
            }
        ]};

        this.overviewChartOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            scales: {
                y: {
                    display: false
                },
                x: {
                    display: false
                }
            },
            tooltips: {
                enabled: false
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        };

        this.setOverviewColors();

        this.appMain['refreshChart'] = () => {
            this.chartData = this.getChartData();
            this.chartOptions = this.getChartOptions();

            this.setOverviewColors();
        };

        this.chartMonthlyData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#80DEEA',
                    borderColor: 'white',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#0097A7',
                    borderColor: 'white',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.radarChartData = {
            labels: ['Ordered', 'Processed', 'Shipped', 'Delivered', 'Refunded'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [65, 59, 90, 81, 56]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: [28, 48, 40, 19, 96]
                }
            ]
        };

        this.timelineEvents = [
            {status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#E91E63'},
            {status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#FB8C00'},
            {status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-compass', color: '#673AB7'},
            {status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check-square', color: '#0097A7'}
        ];
    }

    setOverviewColors() {
        const { whiteBgColor, whiteBorderColor} = this.getOverviewColors();

        this.overviewChartData1.datasets[0].borderColor[0] = whiteBorderColor;
        this.overviewChartData1.datasets[0].backgroundColor[0] = whiteBgColor;

        this.overviewChartData2.datasets[0].borderColor[0] = whiteBorderColor;
        this.overviewChartData2.datasets[0].backgroundColor[0] = whiteBgColor;

        this.overviewChartData3.datasets[0].borderColor[0] = whiteBorderColor;
        this.overviewChartData3.datasets[0].backgroundColor[0] = whiteBgColor;

        this.overviewChartData4.datasets[0].borderColor[0] = whiteBorderColor;
        this.overviewChartData4.datasets[0].backgroundColor[0] = whiteBgColor;
    }

    getOverviewColors() {
        const isLight = this.app.layoutMode === 'light';
        return {
            whiteBorderColor: isLight ? '#ffffff' : '#ffffff',
            whiteBgColor: isLight ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.35)',
        };
    }

    getChartData() {
        const isLight = this.app.layoutMode === 'light';
        const completedColors = {
            borderColor: isLight ? '#00ACC1' : '#4DD0E1',
            backgroundColor: isLight ? 'rgb(0, 172, 193, .3)' : 'rgb(77, 208, 225, .3)'
        };
        const canceledColors = {
            borderColor: isLight ? '#FF9800' : '#FFB74D',
            backgroundColor: isLight ? 'rgb(255, 152, 0, .3)' : 'rgb(255, 183, 77, .3)'
        };

        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Completed',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    borderColor: completedColors.borderColor,
                    backgroundColor: completedColors.backgroundColor,
                    borderWidth: 2,
                    fill: true,
                    tension: .4
                },
                {
                    label: 'Cancelled',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    borderColor: canceledColors.borderColor,
                    backgroundColor: canceledColors.backgroundColor,
                    borderWidth: 2,
                    fill: true,
                    tension: .4
                }
            ]
        };
    }

    getChartOptions() {
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color') || 'rgba(0, 0, 0, 0.87)';
        const gridLinesColor = getComputedStyle(document.body).getPropertyValue('--divider-color') || 'rgba(160, 167, 181, .3)';
        return {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: gridLinesColor
                    }
                },
                x: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: gridLinesColor
                    }
                }
            }
        };
    }
}
