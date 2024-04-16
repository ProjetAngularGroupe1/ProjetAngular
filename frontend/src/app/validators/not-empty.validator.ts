import { AbstractControl,ValidationErrors, ValidatorFn } from "@angular/forms"

export function NotEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isEmpty = control.value === null || control.value === undefined || control.value === '';
        return isEmpty ? { notEmpty: true } : null;
    };
}
