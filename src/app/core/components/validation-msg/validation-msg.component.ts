import {Component, HostBinding, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'ba-validation-msg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-msg.component.html',
  styleUrls: ['./validation-msg.component.scss'],
  // host:{
  //   'class':'invalid-feedback'
  // }
})
export class ValidationMsgComponent {
  @Input({required: true, alias: 'of'})
  control: AbstractControl | null | undefined;

  @HostBinding('class.invalid-feedback')
  isInvalidClass = true;
}
