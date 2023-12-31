import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { ArticleService } from '../../services/article.service'
import { ArticleModel } from '../../models/article.model'


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
    @Input() 
    articles!: ArticleModel[] | null 

    constructor (
        private router: Router, 
        private userService: UserService, 
        private articleService: ArticleService
    ) {}

    ngOnInit(): void {

    }
}
