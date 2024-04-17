import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ArticleModel } from '../../models/article.model'
import { CommentModel } from '../../models/comment.model'
import { ArticleService } from '../../services/article.service'
import { CommentService } from '../../services/comment.service'
import { UserService } from '../../services/user.service'
import { OnlineStatusService } from '../../services/online-status.service'
import { lastValueFrom } from 'rxjs'
import { IArticle, IComment, IUser, IUserGetDto } from 'shared'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NotEmptyValidator } from '../../validators/not-empty.validator';
import { db } from '../../../indexed.db';

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
    commentsIDB!: CommentModel[]

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router, 
        private userService: UserService, 
        private articleService: ArticleService, 
        private commentService: CommentService,
        private onlineService: OnlineStatusService,
    ) {}

    async ngOnInit(): Promise<void> {
        this.onlineService.connectionChanged.subscribe(async () => {
            if (this.onlineService.isOnline()) {
                const comments = (await db.comments.toArray()).map(c => c as CommentModel);
    
                comments?.forEach(comment => {
                    this.commentService.publishComment(comment.userId, comment.articleId, comment.body)
                });
    
                db.comments.clear();
            }
        })
        
        this.isLoggedIn = this.userService.isLoggedIn()

        if (this.isLoggedIn) {
            this.loggedUser = this.userService.getLoggedUser()
        }

        this.commentForm = this.fb.group({
            body : this.fb.control('', [NotEmptyValidator()]),
        })

        this.route.paramMap.subscribe(async params => {
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

                if (this.article.userId === this.loggedUser?.id) {
                    this.isArticleCreatedByLoggedUser = true
                }
            })
            
            this.isCommentsLoaded = false
            this.commentService.getAllArticleComments(this.articleId).subscribe((comments) => {
                this.isCommentsLoaded = true
                this.comments = comments
            })

            this.commentsIDB = (await db.comments.toArray())
                .filter(c => c.articleId === this.articleId)
                .map(c => c as CommentModel);
        })
    }

    async onSubmit(): Promise<void> {
        if (this.commentForm.valid) {
            this.isCommentsLoaded = false

            const user = this.userService.getLoggedUser();

            if (user) {
                if (this.onlineService.isOnline()) {
                    lastValueFrom(this.commentService.publishComment(user.id, this.articleId, this.commentForm.value.body)).then(() => {
                        lastValueFrom(this.commentService.getAllArticleComments(this.articleId)).then((comments) => {
                            this.isCommentsLoaded = true
                            this.comments = comments
                        })
                    })
                } else {
                    let comment: IComment = {} as IComment;
                    comment.userId    = user.id
                    comment.articleId = this.articleId
                    comment.body      = this.commentForm.value.body
                    comment.createdAt = new Date();
                    comment.updatedAt = new Date();

                    await db.comments.add({...comment}).then(async () => {
                        this.commentsIDB = (await db.comments.toArray())
                        .filter(c => c.articleId === this.articleId)
                        .map(c => c as CommentModel);
                    });
                }
            } else {
                // TODO
            }
        }
    }
}
