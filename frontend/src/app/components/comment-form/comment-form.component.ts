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
    articleId!: number

    @Output()
    emitComment: EventEmitter<CommentModel> = new EventEmitter<CommentModel>()

    commentForm: FormGroup

    constructor(private fb: FormBuilder, private articleService: ArticleService) { 
        this.commentForm = this.fb.group({
            body : new FormControl('', [Validators.required]),
        }, { updateOn:'submit' })
    }

    async onSubmit(): Promise<void> {
        // TODO: send comment here and http post in article component
        if (this.commentForm.valid) {
            let success = await this.articleService.publishCommentOnMockupArticle(this.articleId, this.commentForm.value.body)
            
            if (success) {
                this.emitComment.emit()
            } else {
                console.log('Can\'t post comment')
            }
        }
    }
}
