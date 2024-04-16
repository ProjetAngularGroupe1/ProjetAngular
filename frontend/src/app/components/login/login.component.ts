import { Component } from '@angular/core'
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NotEmptyValidator } from '../../validators/not-empty.validator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup
    error: string = ""

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
        this.loginForm = this.fb.group({
            username : this.fb.control('', [NotEmptyValidator()]),
            password : this.fb.control('', [NotEmptyValidator()]),
        })
    }

    async onSubmit(): Promise<void> {
        this.error = ''

        if (this.loginForm.valid) {
            const logged = await this.userService.logIn(this.loginForm.value.username, this.loginForm.value.password)

            if (logged) {
                this.router.navigate(['/'])
            } else {
                this.error = 'User not found'
            }
        }
    }
}
