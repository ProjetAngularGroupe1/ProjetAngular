import { Observable, of, lastValueFrom } from"rxjs"
import { delay } from"rxjs/operators"
import { Injectable } from'@angular/core'
import { ArticleDataModel } from"../models/article.model"
import { CommentDataModel } from '../models/comment.model'
import { MockDataService } from '../services/mock-data.service'


@Injectable()
export class ArticleService {
    constructor (private mockDataService: MockDataService) {}

    getAllArticles(): Observable<ArticleDataModel[]> {
        return of(this.mockDataService.mockArticleList).pipe(delay(500))
    }

    getAllUserArticles(id: number): Observable<ArticleDataModel[]> {
        return of(this.mockDataService.mockArticleList.filter(c => c.user_id === id)).pipe(delay(500))
    }

    getArticle(id: number): Observable<ArticleDataModel>  {
        return of(this.mockDataService.mockArticleList[id]).pipe(delay(500))
    }

    async publishCommentOnArticle(id: number, body: string): Promise<boolean> {
        let article = await lastValueFrom(
            this.getArticle(id)
        ) 

        if (article) {
            this.mockDataService.mockCommentList.push(new CommentDataModel(this.mockDataService.mockCommentList.length, article.user_id, article.id, body))
            return true
        } else {
            return false
        }
    }
}
