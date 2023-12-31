import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ArticleModel } from '../../models/article.model'
import { CommentModel } from '../../models/comment.model'
import { ArticleService } from '../../services/article.service'
import { CommentService } from '../../services/comment.service'
import { UserService } from '../../services/user.service'


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    isLoggedIn: boolean = false
    isArticleLoaded: boolean = false
    isCommentsLoaded: boolean = false
    articleId!: number 
    article!: ArticleModel
    comments!: CommentModel[]

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private articleService: ArticleService,  private commentService: CommentService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.articleId = Number(params.get('id'))
            
            this.isArticleLoaded = false
            this.articleService.getMockupArticle(this.articleId).subscribe((article) => {
                if (!article) {
                    this.router.navigate(['/404'])
                }
                this.isArticleLoaded = true
                this.article = article
            })
            
            this.isCommentsLoaded = false
            this.commentService.getAllMockupArticleComments(this.articleId).subscribe((comments) => {
                this.isCommentsLoaded = true
                this.comments = comments
            })
        })
        
        this.router.events.subscribe(() => {
            this.isLoggedIn = this.userService.isLoggedIn()
        })
    }

    getMockupComment(comment: CommentModel) {
        this.isCommentsLoaded = false
        this.commentService.getAllMockupArticleComments(this.articleId).subscribe((comments) => {
            this.isCommentsLoaded = true
            this.comments = comments
        })
    }
}
