import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
    isLoggedIn: boolean = false;

    constructor (private router: Router, private userService: UserService) {}

    ngOnInit(): void {
        // TODO: use another way to check is logged in every time we go see the component
        this.router.events.subscribe(() => {
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
