import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { ArticleDataModel } from '../../models/article.model'
import { ArticleService } from "../../services/article.service"
import { UserService } from 'src/app/services/user.service'
import { Router } from '@angular/router'
import { lastValueFrom } from 'rxjs'


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent {
    @Output()
    emitArticle: EventEmitter<ArticleDataModel> = new EventEmitter<ArticleDataModel>()

    articleForm: FormGroup

    constructor(private fb: FormBuilder, private articleService: ArticleService, private userService: UserService, private router: Router) { 
        this.articleForm = this.fb.group({
            title : new FormControl('', [Validators.required]),
            body : new FormControl('', [Validators.required]),
        }, { updateOn:'submit' })
    }

    async onSubmit(): Promise<void> {
        if (this.articleForm.valid) {
            let user    = await lastValueFrom(this.userService.getCurrentUser())
            let article = await this.articleService.publishArticle(user.id, this.articleForm.value.title, this.articleForm.value.body)

            if (user && article) {
                this.emitArticle.emit()
                this.router.navigate(['/articles', article.id ])
            }
        }
    }
}
