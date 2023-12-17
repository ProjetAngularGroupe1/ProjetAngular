import { Injectable } from '@angular/core'
import { UserModel } from '../models/user.model'
import { ArticleModel } from '../models/article.model'
import { CommentModel } from '../models/comment.model'


@Injectable()
export class MockDataService {
    mockUserList: Array<UserModel> = [
        new UserModel(0, 'admin', 'password', 'admin@test.com'),
        new UserModel(1, 'Rick' , 'password', 'rick@test.com'),
        new UserModel(2, 'James', 'password', 'james@test.com'), 
        new UserModel(3, 'Alan' , 'password', 'alan@test.com'),
    ]

    mockArticleList: Array<ArticleModel> = [
        new ArticleModel(0, 'My First Article'         , 'Alan' , 'This is the body of my first article.'),
        new ArticleModel(1, 'Is the earth flat ?'      , 'Rick' , 'Yes.'),
        new ArticleModel(2, 'How to double jump IRL'   , 'Rick' , 'Jump another time in mid air.'),
        new ArticleModel(3, 'To be or not to be'       , 'Alan' , 'That is the question.'),
        new ArticleModel(4, 'Chicken review'           , 'James', 'Nice.'),
        new ArticleModel(5, 'How to get rich in 3 days', 'James', 'Buy bitcoins.'),
    ]

    mockCommentList: Array<CommentModel> = [
        new CommentModel(0, 'Lol', 'James'),
        new CommentModel(1, 'Nice', 'James'),
        new CommentModel(2, 'Great advice !', 'Rick'),
        new CommentModel(3, 'Never post an article again.', 'Rick'),
        new CommentModel(4, 'KYS', 'Alan'),
        new CommentModel(5, 'Love you', 'Alan'),
    ]
}
