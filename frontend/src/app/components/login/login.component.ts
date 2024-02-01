import { Component } from '@angular/core'
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


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
            username : this.fb.control('', [Validators.required]),
            password : this.fb.control('', [Validators.required]),
        })
    }

    onSubmit(): void {
        this.error = ''

        if (this.loginForm.valid) {
            // let isUser = this.userService.isUser(this.loginForm.value.username, this.loginForm.value.password)

            // if (isUser) {
            //     this.userService.logIn()
            //     this.router.navigate(['/'])
            // } else {
            //     this.error = 'User not found'
            // }
        }
    }
}
