import { Component, Input, OnInit } from '@angular/core'
import { CommentModel } from '../../models/comment.model'
import { IArticle, IUser, IUserGetDto } from 'shared'
import { UserService } from 'src/app/services/user.service'
import { ArticleService } from 'src/app/services/article.service'


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
    @Input() 
    comments!: CommentModel[]

    @Input()
    show_users: boolean = false

    @Input()
    show_articles: boolean = false

    constructor(
        private userService: UserService, 
        private articleService: ArticleService, 
    ) {}

    ngOnInit(): void {
        this.comments?.forEach(comment => {
            if (this.show_users) {
                this.userService.getUser(comment.userId).subscribe((user: IUserGetDto) => {
                    comment.user = user as IUser
                })
            }

            if (this.show_articles) {
                this.articleService.getArticle(comment.articleId).subscribe((article: any) => { // TODO: remove any
                    comment.article = article as IArticle
                })
            }
        })
    }
}
