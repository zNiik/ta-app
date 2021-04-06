import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(control.value)) {
            return { email: true };
        }

        return null;
    }
}

export function phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const re = /^(?:0)(?:2|3|4|6|7|9|50|51|52|55|56)[0-9]{7}$/;

        if (!re.test(control.value)) {
            return { phone: true };
        }

        return null;
    }
}

export function cardNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const re = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
        const value = control.value ? control.value : '';

        if (!re.test(value.replace(/\s/g,''))) {
            return { cardNumber: true };
        }

        return null;
    }
}

export function cardExpiryDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const re = /(0|1)[0-9]\/(19|20)[0-9]{2}/;
        
        if (!re.test(control.value)) {
            return { cardExpiryDate: true };
        }

        return null;
    }
}