import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'myCurrency'
})

export class NumberReplacerPipe implements PipeTransform {

    transform(value: any, digits?: string): string {
        if (!value || value.toString().trim().length <= 0) {
            return '0';
        } else {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }
}
