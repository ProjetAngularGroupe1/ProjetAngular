import { AbstractControl,ValidationErrors, ValidatorFn } from "@angular/forms";

export function RegexValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return nameRe.test(control.value) ? { regexError : { value: control.value } } : null; 
    };
}