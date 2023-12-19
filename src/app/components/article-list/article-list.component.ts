import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { ArticleService } from '../../services/article.service'
import { ArticleModel } from '../../models/article.model'
import { Observable } from 'rxjs'


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
    isLoggedIn: boolean = false
    articles$: Observable<ArticleModel[]> = new Observable<ArticleModel[]>();

    constructor (private router: Router, private userService: UserService, private articleService: ArticleService) {}

    ngOnInit(): void {
        this.articles$ = this.articleService.getAllArticles()

        // TODO: use another way to check is logged in every time we go see the component
        this.router.events.subscribe(() => {
            this.isLoggedIn = this.userService.isLoggedIn()
        })

        this.userService.logInSignal$.subscribe(() => {
            this.isLoggedIn = this.userService.isLoggedIn()
        })

        this.userService.logOutSignal$.subscribe(() => {
            this.isLoggedIn = this.userService.isLoggedIn()
        })
    }
}
