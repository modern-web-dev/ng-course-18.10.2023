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
import {defaultStringValidators} from "../../../core/validators";
import {Book, NewBook} from "../../model";

// interface BookForm {
//   title: FormControl<string>,
//   author: FormGroup<{ firstName: FormControl<string>, lastName: FormControl<string> }>
// }

type ControlsOf<T> = FormGroup<{
  [P in keyof T]: T[P] extends string | number ? FormControl<T[P]> : ControlsOf<T[P]>
}>

export class BookFormService {

  fb = inject(NonNullableFormBuilder);

  prepareForm(): ControlsOf<NewBook> {
    // return this.fb.group({
    //   title: ['', [...defaultStringValidators]],
    //   author: this.fb.group({
    //     firstName: ['', defaultStringValidators],
    //     lastName: ['', defaultStringValidators],
    //   })
    // });

    return new FormGroup({
      title: new FormControl('', {nonNullable: true, validators: [...defaultStringValidators]}),
      author: new FormGroup({
        firstName: new FormControl('', {nonNullable: true, validators: defaultStringValidators}),
        lastName: new FormControl('', {nonNullable: true, validators: defaultStringValidators}),
      })
    });
  }
}
