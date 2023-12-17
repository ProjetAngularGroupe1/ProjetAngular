import { Observable, of } from"rxjs"
import { delay } from"rxjs/operators"
import { Injectable } from'@angular/core'
import { ArticleModel } from"../models/article.model"
import { MockDataService } from '../services/mock-data.service'


@Injectable()
export class ArticleService {
    constructor (private mockDataService: MockDataService) {}

    getAllArticles(): Observable<Array<ArticleModel>> {
        return of(this.mockDataService.mockArticleList).pipe(delay(1000))
    }
}
