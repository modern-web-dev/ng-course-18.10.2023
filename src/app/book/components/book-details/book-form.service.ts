import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, NonNullableFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {inject} from "@angular/core";

const maxLength5: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return control.value.length <= 5 ? null : {maxLength5: "Value too long"}
}
const maxLength: (maxLength: number) => (control: AbstractControl) => ValidationErrors | null = (maxLength: number) => {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.length <= maxLength ? null : {maxLength: {currentLength: control.value.length, maxLength: maxLength}}
  }
}
const defaultStringValidators = [maxLength(5)];

interface BookForm {
  title: FormControl<string>,
  author: FormGroup<{ firstName: FormControl<string>, lastName: FormControl<string> }>
}

export class BookFormService {

  fb = inject(NonNullableFormBuilder);

  prepareForm() {
    // return this.fb.group({
    //   title: ['', [...defaultStringValidators]],
    //   author: this.fb.group({
    //     firstName: ['', defaultStringValidators],
    //     lastName: ['', defaultStringValidators],
    //   })
    // });

    return new FormGroup<BookForm>({
      title: new FormControl('', {nonNullable: true, validators: [...defaultStringValidators]}),
      author: new FormGroup({
        firstName: new FormControl('', {nonNullable: true, validators: defaultStringValidators}),
        lastName: new FormControl('', {nonNullable: true, validators: defaultStringValidators}),
      })
    });
  }
}
