import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[appUppercase]',
})
export class Uppercase {

  constructor(
      private elementref : ElementRef,
      private ngControl: NgControl,
  ) {
  }

  @HostListener('input', ['$event.target'])onInput(input : HTMLInputElement) {
      const value = input.selectionStart;
      this.ngControl.control?.setValue(input.value.toUpperCase());
      input.setSelectionRange(value, value);
  }

}
