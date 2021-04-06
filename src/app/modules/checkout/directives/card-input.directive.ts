import { Directive } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
    selector: '[nmoCardInput]',
    host: {
        '(input)': 'format($event.target.value)'
    }
})
export class CardInputDirective {

    constructor (private control: NgControl) {}

    formatCC(value: string) {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || ''
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i+4))
        }

        if (parts.length) {
            return parts.join(' ')
        } else {
            return value
        }
    }


    format(value: string) {
        const cc = this.formatCC(value);
        this.control.control?.setValue(cc);
    }
}