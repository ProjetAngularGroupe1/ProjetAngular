import { Directive, ElementRef } from'@angular/core';

@Directive({
    selector:'[firstDirective]'
})

export class FirstDirective {
    constructor(private el: ElementRef) {
        this.el.nativeElement.style.backgroundColor = 'yellow';
    }
}