import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CommentModel } from '../../models/comment.model'
import { ArticleService } from "../../services/article.service"


@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrl: './comment-edit.component.css'
})
export class CommentEditComponent {
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
        }
    }
}
