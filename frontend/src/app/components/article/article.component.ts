import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ArticleModel } from '../../models/article.model'
import { CommentModel } from '../../models/comment.model'
import { ArticleService } from '../../services/article.service'
import { CommentService } from '../../services/comment.service'
import { UserService } from '../../services/user.service'
import { lastValueFrom } from 'rxjs'
import { IArticle, IUser, IUserGetDto } from 'shared'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NotEmptyValidator } from '../../validators/not-empty.validator';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    isLoggedIn: boolean = false
    loggedUser!: IUser
    isArticleLoaded: boolean = false
    isCommentsLoaded: boolean = false
    isArticleCreatedByLoggedUser: boolean = false
    articleId!: number 
    article!: ArticleModel
    commentForm!: FormGroup
    comments!: CommentModel[]

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router, 
        private userService: UserService, 
        private articleService: ArticleService, 
        private commentService: CommentService,
    ) {}

    ngOnInit(): void {

        this.isLoggedIn = this.userService.isLoggedIn()

        if (this.isLoggedIn) {
            this.loggedUser = this.userService.getLoggedUser()
        }

        this.commentForm = this.fb.group({
            body : this.fb.control('', [NotEmptyValidator()]),
        })

        this.route.paramMap.subscribe(params => {
            this.articleId = Number(params.get('id'))
            
            this.isArticleLoaded = false
            this.articleService.getArticle(this.articleId).subscribe((article: IArticle) => {
                if (!article) {
                    this.router.navigate(['/404'])
                }

                this.isArticleLoaded   = true
                this.article           = article
                this.article.createdAt = new Date(article.createdAt)
                this.article.updatedAt = new Date(article.updatedAt)

                this.userService.getUser(this.article.userId).subscribe((user: IUserGetDto) => {
                    this.article.user = user as IUser
                })

                if (this.article.userId === this.loggedUser.id) {
                    this.isArticleCreatedByLoggedUser = true
                }
            })
            
            this.isCommentsLoaded = false
            this.commentService.getAllArticleComments(this.articleId).subscribe((comments) => {
                this.isCommentsLoaded = true
                this.comments = comments
            })
        })
    }

    async onSubmit(): Promise<void> {
        if (this.commentForm.valid) {
            this.isCommentsLoaded = false

            const user = this.userService.getLoggedUser();

            if (user) {
                lastValueFrom(this.commentService.publishComment(user.id, this.articleId, this.commentForm.value.body)).then(() => {
                    lastValueFrom(this.commentService.getAllArticleComments(this.articleId)).then((comments) => {
                        this.isCommentsLoaded = true
                        this.comments = comments
                    })
                })
            } else {
                // TODO
            }
        }
    }
}
