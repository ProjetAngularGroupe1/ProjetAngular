import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { ArticleModel } from '../../models/article.model'
import { ArticleService } from "../../services/article.service"
import { Router } from '@angular/router'


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent {
    @Output()
    emitArticle: EventEmitter<ArticleModel> = new EventEmitter<ArticleModel>()

    articleForm: FormGroup

    constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router) { 
        this.articleForm = this.fb.group({
            title : new FormControl('', [Validators.required]),
            body : new FormControl('', [Validators.required]),
        }, { updateOn:'submit' })
    }

    onSubmit(): void {
        if (this.articleForm.valid) {
            // let new_article: ArticleModel = new ArticleModel()
    
            // new_article.title         = this.articleForm.value.title
            // new_article.body          = this.articleForm.value.body
            // new_article.author        = "Author"
            // new_article.creation_date = new Date()
            // new_article.update_date   = new Date()
            // new_article.like_count    = 0
    
            // this.emitArticle.emit(new_article)

            // this.router.navigate(['/articles', new_article.id ])
        }
    }
}
