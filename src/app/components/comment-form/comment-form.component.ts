import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { CommentModel } from '../../models/comment.model'
import { ArticleService } from "../../services/article.service"


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
    @Input()
    article_id!: number

    @Output()
    emitComment: EventEmitter<CommentModel> = new EventEmitter<CommentModel>()

    commentForm: FormGroup

    constructor(private fb: FormBuilder, private articleService: ArticleService) { 
        this.commentForm = this.fb.group({
            body : new FormControl('', [Validators.required]),
        }, { updateOn:'submit' })
    }

    onSubmit(): void {
        if (this.commentForm.valid) {
            this.articleService.publishCommentOnArticle(this.article_id, this.commentForm.value.body)
            this.emitComment.emit()
        }
    }
}
