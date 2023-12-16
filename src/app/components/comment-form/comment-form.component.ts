import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { CommentModel } from '../../models/comment.model';
import { CommentService } from "../../services/comment.service"


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
    @Output()
    emitComment: EventEmitter<CommentModel> = new EventEmitter<CommentModel>();

    commentForm: FormGroup;

    constructor(private fb: FormBuilder, private commentService: CommentService) { 
        this.commentForm = this.fb.group({
            body : new FormControl('', [Validators.required]),
        }, { updateOn:'submit' })
    }

    onSubmit(): void {
        if (this.commentForm.valid) {
            let new_comment: CommentModel = new CommentModel()
    
            new_comment.body          = this.commentForm.value.body;
            new_comment.author        = "Author";
            new_comment.creation_date = new Date();
            new_comment.update_date   = new Date();
            new_comment.like_count    = 0;
    
            this.emitComment.emit(new_comment)
        }
    }
}
