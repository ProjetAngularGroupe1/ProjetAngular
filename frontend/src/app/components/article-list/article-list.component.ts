import { Component, OnInit, Input } from '@angular/core'
import { ArticleModel } from '../../models/article.model'
import { IUser, IUserGetDto } from 'shared'
import { UserService } from 'src/app/services/user.service'


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
    @Input() 
    articles!: ArticleModel[]

    constructor (
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        this.articles.forEach(article => {
            this.userService.getUser(article.userId).subscribe((user: IUserGetDto) => {
                article.user = user as IUser
            })
        })
    }
}
