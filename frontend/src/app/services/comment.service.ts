import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { CommentModel } from '../models/comment.model'
import { MockDataService } from '../services/mock-data.service'
import { IComment } from '../interfaces/comment.interface'
import { HttpClient } from '@angular/common/http'


@Injectable()
export class CommentService {
    constructor (
        private mockDataService: MockDataService,
        private http: HttpClient,
    ) {}

    getAllComments(): Observable<IComment[]> {
        return this.http.get<IComment[]>('http://localhost:3000/comments/')
    }

    getAllUserComments(id: number): Observable<IComment[]> {
        return this.http.get<IComment[]>(`http://localhost:3000/users/${ id }/comments`)
    }

    getAllUserLikedComments(id: number): Observable<IComment[]> {
        return this.http.get<IComment[]>(`http://localhost:3000/users/${ id }/likes/comments`)
    }

    getAllArticleComments(id: number): Observable<IComment[]> {
        return this.http.get<IComment[]>(`http://localhost:3000/articles/${ id }/comments`)
    }

    getComment(id: number): Observable<IComment> {
        return this.http.get<IComment>(`http://localhost:3000/comments/${ id }`)
    }

    publishComment(user_id: number, article_id: number, body: string): Observable<IComment> {
        let comment: IComment = {} as IComment

        comment.user_id    = user_id
        comment.article_id = article_id
        comment.body       = body

        return this.http.post<IComment>('http://localhost:3000/comments', comment)
    }
}
