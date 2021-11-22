import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[lettersOnly]'
})
export class LettersOnlyDirective {

  constructor(private _element: ElementRef) { }


   @HostListener('input', ['$event.target.value'])
   onInput(value: string) {
     value = value.replace(/[^a-zA-Z ]/g, '');
     this._element.nativeElement.value = value;
   }
}
