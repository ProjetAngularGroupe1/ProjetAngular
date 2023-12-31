import { Component } from '@angular/core'
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'


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
            username : new FormControl('', [Validators.required]),
            password : new FormControl('', [Validators.required]),
        }, { updateOn:'submit' })
    }

    onSubmit(): void {
        this.error = ''

        if (this.loginForm.valid) {
            let isUser = this.userService.isMockupUser(this.loginForm.value.username, this.loginForm.value.password)

            if (isUser) {
                this.userService.logIn()
                this.router.navigate(['/'])
            } else {
                this.error = 'User not found'
            }
        }
    }
}
