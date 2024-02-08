import { Observable, of, lastValueFrom } from"rxjs"
import { delay } from"rxjs/operators"
import { Injectable } from'@angular/core'
import { ArticleModel } from"../models/article.model"
import { CommentModel } from '../models/comment.model'
import { HttpClient } from "@angular/common/http"
import { IArticle }  from "@blog/shared"


@Injectable()
export class ArticleService {
    constructor (
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

    getAllUserLikedArticles(id: number): Observable<IArticle[]> {
        return this.http.get<IArticle[]>(`http://localhost:3000/users/${ id }/likes/articles`)
    }

    publishArticle(userId: number, title: string, body: string) : Observable<IArticle> {
        let article: IArticle = {} as IArticle
        
        article.userId = userId
        article.title  = title
        article.body   = body

        return this.http.post<IArticle>('http://localhost:3000/articles', article)
    }

    editArticle(id: number, title: string, body: string) : Observable<IArticle> {
        let article: IArticle = {} as IArticle
        
        // TODO: get user
        article.id      = id
        article.userId = 0
        article.title   = title
        article.body    = body

        return this.http.patch<IArticle>(`http://localhost:3000/articles/${ id }/`, article)
    }

    deleteArticle(id: number): Observable<any> {
        return this.http.delete(`http://localhost:3000/articles/${ id }/`)
    }
}
