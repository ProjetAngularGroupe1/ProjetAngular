import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CommentModel } from '../../models/comment.model'
import { ArticleService } from "../../services/article.service"


@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.css']
})
export class CommentNewComponent {
    @Input()
    articleId!: number

    @Output()
    emitComment: EventEmitter<CommentModel> = new EventEmitter<CommentModel>()

    commentForm: FormGroup

    constructor(private fb: FormBuilder, private articleService: ArticleService) { 
        this.commentForm = this.fb.group({
            body : this.fb.control('', [Validators.required]),
        })
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