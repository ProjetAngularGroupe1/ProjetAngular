import { Injectable } from '@angular/core'
import { UserModel } from '../models/user.model'
import { ArticleModel } from '../models/article.model'
import { CommentModel } from '../models/comment.model'


@Injectable()
export class MockDataService {
    mockUserList: UserModel[] = [
        new UserModel(0, 'admin', 'password'),
        new UserModel(1, 'Rick' , 'password'),
        new UserModel(2, 'James', 'password'), 
        new UserModel(3, 'Alan' , 'password'),
    ]

    mockArticleList: ArticleModel[] = [
        new ArticleModel(0, 3, 'My First Article'         , 'This is the body of my first article.'),
        new ArticleModel(1, 3, 'Is the earth flat ?'      , 'Yes.'),
        new ArticleModel(2, 2, 'How to double jump IRL'   , 'Jump another time in mid air.'),
        new ArticleModel(3, 2, 'To be or not to be'       , 'That is the question.'),
        new ArticleModel(4, 1, 'Chicken review'           , 'Nice.'),
        new ArticleModel(5, 1, 'How to get rich in 3 days', 'Buy bitcoins.'),
    ]

    mockCommentList: CommentModel[] = [
        new CommentModel(0, 1, 0, 'Lol'),
        new CommentModel(1, 2, 0, 'Lmao'),
        new CommentModel(2, 3, 0, 'Kepp it up !'),
        new CommentModel(3, 1, 1, 'Nice'),
        new CommentModel(4, 3, 2, 'Great advice' ),
        new CommentModel(5, 3, 3, 'Never post an article again'),
        new CommentModel(6, 2, 4, 'KYS'),
        new CommentModel(7, 2, 5, 'Love you'),
    ]
}
