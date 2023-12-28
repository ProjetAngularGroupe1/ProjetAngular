import { Directive, ElementRef } from'@angular/core'

@Directive({
    selector:'[highlightDirective]'
})

export class HightlightDirective {
    constructor(private el: ElementRef) {
        this.el.nativeElement.style.backgroundColor = 'yellow'
    }
}