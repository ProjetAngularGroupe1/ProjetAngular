import { Component, Input, OnInit } from '@angular/core'
import { CommentModel } from '../../models/comment.model'
import { UserService } from 'src/app/services/user.service'
import { IUser, IUserGetDto } from 'shared'


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
    @Input() 
    comments!: CommentModel[]

    constructor(
        private userService: UserService, 
    ) {}

    ngOnInit(): void {
        this.comments.forEach(comment => {
            this.userService.getUser(comment.userId).subscribe((user: IUserGetDto) => {
                comment.user = user as IUser
            })
        })
    }
}
