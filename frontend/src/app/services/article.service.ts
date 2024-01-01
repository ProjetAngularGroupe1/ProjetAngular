import { Observable, of, lastValueFrom } from"rxjs"
import { delay } from"rxjs/operators"
import { Injectable } from'@angular/core'
import { ArticleModel } from"../models/article.model"
import { CommentModel } from '../models/comment.model'
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

    getAllArticles(): Observable<IArticle[]> {
        return this.http.get<IArticle[]>('http://localhost:3000/articles')
    }

    getAllUserArticles(id: number): Observable<IArticle[]> {
        return this.http.get<IArticle[]>(`http://localhost:3000/users/${ id }/articles`)
    }

    publishArticle(title: string, body: string) : Observable<IArticle> {
        let article: IArticle = {} as IArticle
        
        // TODO: get user
        article.user_id = 0
        article.title   = title
        article.body    = body

        return this.http.post<IArticle>('http://localhost:3000/articles', article)
    }

    editArticle(id: number, title: string, body: string) : Observable<IArticle> {
        let article: IArticle = {} as IArticle
        
        // TODO: get user
        article.id      = id
        article.user_id = 0
        article.title   = title
        article.body    = body

        return this.http.patch<IArticle>(`http://localhost:3000/articles/${ id }/`, article)
    }

    deleteArticle(id: number): Observable<any> {
        return this.http.delete(`http://localhost:3000/articles/${ id }/`)
    }

    getAllMockupArticles(): Observable<ArticleModel[]> {
        return of(this.mockDataService.mockArticleList).pipe(delay(500))
    }

    getAllMockupUserArticles(id: number): Observable<ArticleModel[]> {
        return of(this.mockDataService.mockArticleList.filter(c => c.user_id === id)).pipe(delay(500))
    }

    getMockupArticle(id: number): Observable<ArticleModel> {
        return of(this.mockDataService.mockArticleList[id]).pipe(delay(500))
    }

    async publishCommentOnMockupArticle(id: number, body: string): Promise<boolean> {
        let article = await lastValueFrom(
            this.getMockupArticle(id)
        ) 

        if (article) {
            this.mockDataService.mockCommentList.push(new CommentModel(this.mockDataService.mockCommentList.length, article.user_id, article.id, body))
            return true
        } else {
            return false
        }
    }

    async publishMockupArticle(user_id: number, title: string, body: string): Promise<ArticleModel> {
        this.mockDataService.mockArticleList.push(new ArticleModel(this.mockDataService.mockArticleList.length, user_id, title, body))

        let article = await lastValueFrom(this.getMockupArticle(this.mockDataService.mockArticleList.length - 1)) 

        return article
    }
}
