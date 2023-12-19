import { Observable, of } from"rxjs"
import { delay } from"rxjs/operators"
import { Injectable } from'@angular/core'
import { ArticleModel } from"../models/article.model"
import { MockDataService } from '../services/mock-data.service'


@Injectable()
export class ArticleService {
    constructor (private mockDataService: MockDataService) {}

    getAllArticles(): Observable<ArticleModel[]> {
        return of(this.mockDataService.mockArticleList).pipe(delay(500))
    }

    getAllUserArticles(id: number): Observable<ArticleModel[]> {
        return of(this.mockDataService.mockArticleList.filter(c => c.user_id === id)).pipe(delay(500))
    }

    getArticle(id: number): Observable<ArticleModel>  {
        return of(this.mockDataService.mockArticleList[id]).pipe(delay(500))
    }
}
