import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[nmoNumberInput]'
})
export class NumberInputDirective implements OnInit {
    constructor(private el: ElementRef) {}

    ngOnInit() {
        this.el.nativeElement.onkeypress = (evt: KeyboardEvent) => {
            if (evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        };
    }
}