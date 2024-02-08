import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ArticleModel } from '../../models/article.model'
import { ArticleService } from "../../services/article.service"
import { UserService } from 'src/app/services/user.service'
import { Router } from '@angular/router'
import { lastValueFrom } from 'rxjs'
import { IArticle } from '@blog/shared'


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css']
})
export class ArticleNewComponent {
    @Output()
    emitArticle: EventEmitter<ArticleModel> = new EventEmitter<ArticleModel>()

    articleForm: FormGroup

    constructor(
        private fb: FormBuilder, 
        private articleService: ArticleService, 
        private userService: UserService, 
        private router: Router,
    ) { 
        this.articleForm = this.fb.group({
            title : this.fb.control('', [Validators.required]),
            body : this.fb.control('', [Validators.required]),
        })
    }

    async onSubmit(): Promise<void> {
        if (this.articleForm.valid) {
            if (this.userService.isLoggedIn()) {
                const user = this.userService.getLoggedUser();
                lastValueFrom(this.articleService.publishArticle(user.id, this.articleForm.value.title, this.articleForm.value.body)).then((article: IArticle) => {
                    this.router.navigate(['/articles', article.id ])
                })
            }
        }
    }
}
