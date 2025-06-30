import { Directive, HostListener, Input } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[maxLengthBlock]',
  standalone: true
})
export class MaxLengthBlockDirective {
  @Input('maxLengthBlock') maxLength = 0;

  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event?.target as HTMLInputElement;
    if (input.value.length > this.maxLength) {
      input.value = input.value.slice(0, this.maxLength);
      this.control.control?.setValue(input.value);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement);

    const specialKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    if (specialKeys.includes(event.key)) return;

    if (input.value.length >= this.maxLength) {
      event.preventDefault();
    }
  }

}