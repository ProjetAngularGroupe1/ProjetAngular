import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { ArticleModel } from '../../models/article.model'
import { ArticleService } from "../../services/article.service"
import { UserService } from 'src/app/services/user.service'
import { Router } from '@angular/router'
import { lastValueFrom } from 'rxjs'
import { IArticle } from 'src/app/interfaces/article.interface'


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent {
    @Output()
    emitArticle: EventEmitter<ArticleModel> = new EventEmitter<ArticleModel>()

    articleForm: FormGroup

    constructor(private fb: FormBuilder, private articleService: ArticleService, private userService: UserService, private router: Router) { 
        this.articleForm = this.fb.group({
            title : new FormControl('', [Validators.required]),
            body : new FormControl('', [Validators.required]),
        }, { updateOn:'submit' })
    }

    async onSubmit(): Promise<void> {
        if (this.articleForm.valid) {
            lastValueFrom(this.articleService.publishArticle(this.articleForm.value.title, this.articleForm.value.body)).then((article: IArticle) => {
                // this.router.navigate(['/articles', article.id ])
            })
        }
    }
}
