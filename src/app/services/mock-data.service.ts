import { Injectable } from '@angular/core'
import { UserModel } from '../models/user.model'
import { ArticleModel } from '../models/article.model'
import { CommentModel } from '../models/comment.model'

@Injectable()
export class MockDataService {
    mockUserList: Array<UserModel> = [
        new UserModel('admin', 'password', 'admin@test.com'),
        new UserModel('Rick', 'password', 'rick@test.com'),
        new UserModel('James', 'password', 'james@test.com'), 
        new UserModel('Alan', 'password', 'alan@test.com'),
    ]

    mockArticleList: Array<ArticleModel> = [

    ]


    mockCommentList: Array<CommentModel> = [

    ]
}
