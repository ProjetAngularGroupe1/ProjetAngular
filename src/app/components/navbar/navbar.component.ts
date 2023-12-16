import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { UserService } from '../../services/user.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isLoggedIn: boolean = false;

    constructor (private router: Router, private userService: UserService) {}

    ngOnInit(): void {
        // TODO: Combine all this
        this.router.events.subscribe(event => {
            this.isLoggedIn = this.userService.isLoggedIn();
        })

        this.userService.logInSignal$.subscribe(() => {
            this.isLoggedIn = this.userService.isLoggedIn();
        })

        this.userService.logOutSignal$.subscribe(() => {
            this.isLoggedIn = this.userService.isLoggedIn();
        })
    }
}
