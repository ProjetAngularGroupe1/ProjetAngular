import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { ArticleService } from '../../services/article.service'
import { ArticleDataModel } from '../../models/article.model'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    isLoggedIn: boolean = false
    isArticlesLoaded: boolean = false
    articles!: ArticleDataModel[]

    constructor (
        private router: Router, 
        private userService: UserService, 
        private articleService: ArticleService
    ) {}

    ngOnInit(): void {
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

        this.isArticlesLoaded = false
        this.articleService.getAllMockupArticles().subscribe((articles) => {
            this.isArticlesLoaded = true
            this.articles = articles
        })

        this.articleService.getAllArticles().subscribe((articles) => {
            console.log(articles)
        })
    }
}
