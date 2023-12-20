import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ArticleModel } from '../../models/article.model'
import { CommentModel } from '../../models/comment.model'
import { ArticleService } from '../../services/article.service'
import { CommentService } from '../../services/comment.service'
import { UserService } from '../../services/user.service'
import { Observable } from 'rxjs'


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    isLoggedIn: boolean = false
    articleId!: number 
    article$: Observable<ArticleModel>    = new Observable<ArticleModel>();
    comments$: Observable<CommentModel[]> = new Observable<CommentModel[]>();

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private articleService: ArticleService,  private commentService: CommentService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            let id = params.get('id')
            if (id) {
                this.articleId = Number(id)
                this.article$  = this.articleService.getArticle(this.articleId);
                this.comments$ = this.commentService.getAllArticleComments(this.articleId);
            }
        })

        this.router.events.subscribe(() => {
            this.isLoggedIn = this.userService.isLoggedIn()
        })
    }

    getComment(comment: CommentModel) {
        this.comments$ = this.commentService.getAllArticleComments(this.articleId);
    }
}
