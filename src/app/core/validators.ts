import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const maxLength5: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return control.value.length <= 5 ? null : {maxLength5: "Value too long"}
}
export const maxLength: (maxLength: number) => (control: AbstractControl) => ValidationErrors | null = (maxLength: number) => {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.length <= maxLength ? null : {maxLength: {currentLength: control.value.length, maxLength: maxLength}}
  }
}
export const defaultStringValidators = [maxLength(5)];
