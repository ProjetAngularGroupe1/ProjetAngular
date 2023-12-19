import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ArticleModel } from '../../models/article.model'
import { CommentModel } from '../../models/comment.model'
import { ArticleService } from '../../services/article.service'
import { UserService } from '../../services/user.service'
import { Observable } from 'rxjs'


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    isLoggedIn: boolean = false
    article$: Observable<ArticleModel> = new Observable<ArticleModel>();

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private articleService: ArticleService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            let id = params.get('id')
            if (id) {
                this.article$ = this.articleService.getArticle(Number(id));
            }
        })

        this.router.events.subscribe(() => {
            this.isLoggedIn = this.userService.isLoggedIn()
        })
    }

    getComment(comment: CommentModel) {
        console.log(comment)
    }
}
