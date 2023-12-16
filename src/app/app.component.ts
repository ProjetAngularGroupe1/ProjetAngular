import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isLoggedIn: boolean = false;

    constructor (private router: Router, private userService: UserService) {}

    ngOnInit(): void {
        // TODO: use another way to check is logged in every time we go see the component
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.isLoggedIn = this.userService.isLoggedIn();
            }
        });
    }
}
