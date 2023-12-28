import { Injectable } from '@angular/core'
import { UserDataModel } from '../models/user.model'
import { ArticleDataModel } from '../models/article.model'
import { CommentDataModel } from '../models/comment.model'


@Injectable()
export class MockDataService {
    mockUserList: UserDataModel[] = [
        new UserDataModel(0, 'admin', 'password', 'admin@test.com'),
        new UserDataModel(1, 'Rick' , 'password', 'rick@test.com'),
        new UserDataModel(2, 'James', 'password', 'james@test.com'), 
        new UserDataModel(3, 'Alan' , 'password', 'alan@test.com'),
    ]

    mockArticleList: ArticleDataModel[] = [
        new ArticleDataModel(0, 3, 'My First Article'         , 'This is the body of my first article.'),
        new ArticleDataModel(1, 3, 'Is the earth flat ?'      , 'Yes.'),
        new ArticleDataModel(2, 2, 'How to double jump IRL'   , 'Jump another time in mid air.'),
        new ArticleDataModel(3, 2, 'To be or not to be'       , 'That is the question.'),
        new ArticleDataModel(4, 1, 'Chicken review'           , 'Nice.'),
        new ArticleDataModel(5, 1, 'How to get rich in 3 days', 'Buy bitcoins.'),
    ]

    mockCommentList: CommentDataModel[] = [
        new CommentDataModel(0, 1, 0, 'Lol'),
        new CommentDataModel(1, 2, 0, 'Lmao'),
        new CommentDataModel(2, 3, 0, 'Kepp it up !'),
        new CommentDataModel(3, 1, 1, 'Nice'),
        new CommentDataModel(4, 3, 2, 'Great advice' ),
        new CommentDataModel(5, 3, 3, 'Never post an article again'),
        new CommentDataModel(6, 2, 4, 'KYS'),
        new CommentDataModel(7, 2, 5, 'Love you'),
    ]
}
