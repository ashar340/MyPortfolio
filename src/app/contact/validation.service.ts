import { FormControl } from '@angular/forms';

export class ValidationService {

  emailValidator(control: FormControl) {
    if (!control.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return {invalidEmail: true};
    }
  }

  namevalidator(control: FormControl) {
    if (control.value.match(/^\s/)) {
      return {invalidName: true};
    }
    if (control.value.match(/[0-9]/)) {
      return {invalidName: true};
    }
  }
}
