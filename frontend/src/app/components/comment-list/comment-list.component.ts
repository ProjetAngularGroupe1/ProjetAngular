import { Component, Input } from '@angular/core'
import { CommentDataModel } from '../../models/comment.model'


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {
    @Input() 
    comments!: CommentDataModel[] | null

    constructor() {}
}
