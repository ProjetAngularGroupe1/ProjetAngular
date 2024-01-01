import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ArticleModel } from '../../models/article.model'
import { CommentModel } from '../../models/comment.model'
import { ArticleService } from '../../services/article.service'
import { CommentService } from '../../services/comment.service'
import { UserService } from '../../services/user.service'
import { lastValueFrom } from 'rxjs'
import { IArticle } from 'src/app/interfaces/article.interface'
import { IComment } from 'src/app/interfaces/comment.interface'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


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
        this.commentForm = this.fb.group({
            body : this.fb.control('', [Validators.required]),
        })

        this.route.paramMap.subscribe(params => {
            this.articleId = Number(params.get('id'))
            
            this.isArticleLoaded = false
            this.articleService.getArticle(this.articleId).subscribe((article: IArticle) => {
                if (!article) {
                    this.router.navigate(['/404'])
                }

                this.isArticleLoaded = true
                this.article = article
                this.article.created_at = new Date(article.created_at)
                this.article.updated_at = new Date(article.updated_at)
            })
            
            this.isCommentsLoaded = false
            this.commentService.getAllArticleComments(this.articleId).subscribe((comments) => {
                this.isCommentsLoaded = true

                console.log(comments)
                this.comments = comments
            })
        })
        
        this.router.events.subscribe(() => {
            this.isLoggedIn = this.userService.isLoggedIn()
        })
    }

    async onSubmit(): Promise<void> {
        if (this.commentForm.valid) {
            this.isCommentsLoaded = false
            // TODO: get user_id
            lastValueFrom(this.commentService.publishComment(0, this.articleId, this.commentForm.value.body)).then(() => {
                lastValueFrom(this.commentService.getAllArticleComments(this.articleId)).then((comments) => {
                    this.isCommentsLoaded = true
                    this.comments = comments
                })
            })
        }
    }

    async deleteArticle(): Promise<void> {
        lastValueFrom(this.articleService.deleteArticle(this.articleId)).then((x) => {
            this.router.navigate(['/'])
        })
    }
}
