import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

import { ArticleModel } from '../../models/article.model';

import { ArticleService } from "../../services/article.service"

import { RegexValidator } from '../../validators/regex.validator'

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent {
    @Output()
    emitArticle: EventEmitter<ArticleModel> = new EventEmitter<ArticleModel>();

    articleForm: FormGroup;

    constructor(private fb: FormBuilder, private articleService: ArticleService) { 
        this.articleForm = this.fb.group({
            firstname : new FormControl('', [Validators.required, Validators.minLength(3), RegexValidator(/bob/i)]),
            lastname  : new FormControl(),
        }, { updateOn:'submit' })
    }

    onSubmit(): void {
        let new_first_name = this.articleForm.value.firstname;

        let h: ArticleModel = new ArticleModel()

        this.emitArticle.emit(h)
    }
}
