import {
    Component,
    ComponentFactoryResolver,
    Input,
    OnInit,
    ReflectiveInjector,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

@Component({
    selector: 'iPopupForm',
    templateUrl: './open-page-popup.component.html',
    styleUrls: ['./open-page-popup.component.scss']
})
export class OpenPagePopupComponent implements OnInit {

    @Input() width = 0;
    @Input() height = 0;
    @Input() strHearder: string;


    display = false;
    compInstance: any;
    currentComponent: any = null;
    @ViewChild('container', {read: ViewContainerRef}) target: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {

    }

    @Input() set componentData(data: { component: any, inputs: any }) {
        setTimeout(() => {
            if (!data) {
                return;
            }
            console.log('vao componentData');
// Inputs need to be in the following format to be resolved properly
            const inputProviders = Object.keys(data.inputs).map((inputName) => ({
                provide: inputName,
                useValue: data.inputs[inputName]
            }));
            const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

// We create an injector out of the data we want to pass down and this components injector
            const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.target.parentInjector);

// We create a factory out of the component we want to create
            const factory = this.componentFactoryResolver.resolveComponentFactory(data.component);

// We create the component using the factory and the injector
            const component = factory.create(injector);
// We insert the component into the dom container
            this.target.insert(component.hostView);

// We can destroy the old component is we like by calling destroy
            if (this.currentComponent) {
                this.currentComponent.destroy();
            }

            this.currentComponent = component;
            this.display = true;
        }, 0);
    }


    hideDialog() {
        this.display = false;
    }

    getValue(value: any) {
        console.log(value);
    }

    ngOnInit() {
        this.display = false;
    }

    getHeight(): number {
// return window.screen.height * 0.9;
        if (this.height == 0) {
            return window.innerHeight * 0.9;
        } else {
            return this.height;
        }

    }

    getWidth(): number {
        if (this.width == 0) {
// return window.screen.width * 0.95;
            return window.innerWidth * 0.95;
        } else {
            return this.width;
        }
    }
}
