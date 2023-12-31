import { Observable, of, lastValueFrom } from"rxjs"
import { delay } from"rxjs/operators"
import { Injectable } from'@angular/core'
import { ArticleDataModel } from"../models/article.model"
import { CommentDataModel } from '../models/comment.model'
import { MockDataService } from '../services/mock-data.service'
import { HttpClient } from "@angular/common/http"
import { IArticle } from "../interfaces/article.interface"


@Injectable()
export class ArticleService {
    constructor (
        private mockDataService: MockDataService,
        private http: HttpClient,
    ) {}

    getArticle(id: number): Observable<IArticle> {
        return this.http.get<IArticle>(`http://localhost:3000/articles/${ id }`)
    }

    getAllArticles(): Observable<IArticle> {
        return this.http.get<IArticle>('http://localhost:3000/articles')
    }

    getAllUserArticles(id: number): Observable<IArticle[]> {
        return this.http.get<IArticle[]>(`http://localhost:3000/users/${ id }/articles`)
    }

    getAllMockupArticles(): Observable<ArticleDataModel[]> {
        return of(this.mockDataService.mockArticleList).pipe(delay(500))
    }

    getAllMockupUserArticles(id: number): Observable<ArticleDataModel[]> {
        return of(this.mockDataService.mockArticleList.filter(c => c.user_id === id)).pipe(delay(500))
    }

    getMockupArticle(id: number): Observable<ArticleDataModel> {
        return of(this.mockDataService.mockArticleList[id]).pipe(delay(500))
    }

    async publishCommentOnMockupArticle(id: number, body: string): Promise<boolean> {
        let article = await lastValueFrom(
            this.getMockupArticle(id)
        ) 

        if (article) {
            this.mockDataService.mockCommentList.push(new CommentDataModel(this.mockDataService.mockCommentList.length, article.user_id, article.id, body))
            return true
        } else {
            return false
        }
    }

    async publishMockupArticle(user_id: number, title: string, body: string): Promise<ArticleDataModel> {
        this.mockDataService.mockArticleList.push(new ArticleDataModel(this.mockDataService.mockArticleList.length, user_id, title, body))

        let article = await lastValueFrom(this.getMockupArticle(this.mockDataService.mockArticleList.length - 1)) 

        return article
    }
}
