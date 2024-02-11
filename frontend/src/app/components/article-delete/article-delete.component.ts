import { Component, EventEmitter, Output, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ArticleModel } from '../../models/article.model'
import { ArticleService } from "../../services/article.service"
import { UserService } from 'src/app/services/user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { lastValueFrom } from 'rxjs'
import { IArticle } from 'shared'

@Component({
  selector: 'app-article-delete',
  templateUrl: './article-delete.component.html',
  styleUrl: './article-delete.component.css'
})
export class ArticleDeleteComponent implements OnInit {
    isLoggedIn: boolean = false
    articleId!: number 
    isArticleLoaded: boolean = false
    article!: ArticleModel

    constructor(
        private fb: FormBuilder, 
        private articleService: ArticleService, 
        private userService: UserService, 
        private router: Router,
        private route: ActivatedRoute,
    ) { 
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
                this.article = new ArticleModel(a.id, a.userId, a.title, a.body)
            })
        })

        this.router.events.subscribe(() => {
            this.isLoggedIn = this.userService.isLoggedIn()
        })
    }

    async deleteArticle(): Promise<void> {
        lastValueFrom(this.articleService.deleteArticle(this.articleId)).then((x) => {
            this.router.navigate(['/'])
        })
    }
}
