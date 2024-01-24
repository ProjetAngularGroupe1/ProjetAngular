import { Component, EventEmitter, Output, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ArticleModel } from '../../models/article.model'
import { ArticleService } from "../../services/article.service"
import { UserService } from 'src/app/services/user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { lastValueFrom } from 'rxjs'
import { IArticle } from '@blog/shared'


@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css'
})
export class ArticleEditComponent implements OnInit {
    isLoggedIn: boolean = false
    articleId!: number 
    isArticleLoaded: boolean = false
    article!: ArticleModel

    @Output()
    emitArticle: EventEmitter<ArticleModel> = new EventEmitter<ArticleModel>()

    articleForm: FormGroup

    constructor(
        private fb: FormBuilder, 
        private articleService: ArticleService, 
        private userService: UserService, 
        private router: Router,
        private route: ActivatedRoute,
    ) { 
        this.articleForm = this.fb.group({
            title : this.fb.control('', [Validators.required]),
            body : this.fb.control('', [Validators.required]),
        })
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.articleId = Number(params.get('id'))
            
            this.isArticleLoaded = false
            this.articleService.getArticle(this.articleId).subscribe((a: IArticle) => {
                if (!a) {
                    this.router.navigate(['/404'])
                }

                this.isArticleLoaded = true
                this.article = new ArticleModel(a.id, 0, a.title, a.body) // TODO: use current user

                this.articleForm.setValue( { title : a.title, body : a.body })
            })
        })

        this.router.events.subscribe(() => {
            this.isLoggedIn = this.userService.isLoggedIn()
        })
    }

    // TODO: Shouldn't be able to submit if there is no edit on the article
    async onSubmit(): Promise<void> {
        if (this.articleForm.valid) {
            if (this.articleForm.value.title !== this.article.title || this.articleForm.value.body !== this.article.body) {
                lastValueFrom(this.articleService.editArticle(this.articleId, this.articleForm.value.title, this.articleForm.value.body)).then((article: IArticle) => {
                    this.router.navigate(['/articles', article.id ])
                })
            } else {
                console.log("No modification found")
            }
        }
    }
}
