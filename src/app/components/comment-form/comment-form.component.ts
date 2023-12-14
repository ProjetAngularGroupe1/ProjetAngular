import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

import { CommentModel } from '../../models/comment.model';

import { CommentService } from "../../services/comment.service"

import { RegexValidator } from '../../validators/regex.validator'

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
            firstname : new FormControl('', [Validators.required, Validators.minLength(3), RegexValidator(/bob/i)]),
            lastname  : new FormControl(),
        }, { updateOn:'submit' })
    }

    onSubmit(): void {
        let new_first_name = this.commentForm.value.firstname;

        let h: CommentModel = new CommentModel()

        this.emitComment.emit(h)
    }
}
