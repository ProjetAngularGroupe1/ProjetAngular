import { from, Observable, of } from"rxjs"
import { delay, concatMap } from"rxjs/operators"
import { Injectable } from'@angular/core'
import { ArticleModel } from"../models/article.model"

@Injectable()
export class ArticleService {
    mockArticleList: Array<ArticleModel> = [
        new ArticleModel(),
        new ArticleModel(), 
        new ArticleModel(),
    ]

    getAllArticles(): Observable<Array<ArticleModel>> {
        return of(this.mockArticleList).pipe(delay(1000))
    }

    rotateAllArticles(): Observable<ArticleModel> {
        return from(this.mockArticleList).pipe(
            concatMap(item => of(item).pipe(
                delay(5000)
            ))
        )
    }
}
