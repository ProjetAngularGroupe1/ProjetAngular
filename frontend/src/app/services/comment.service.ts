import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { CommentModel } from '../models/comment.model'
import { IComment }  from "shared"
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserService } from "./user.service"


@Injectable()
export class CommentService {
    constructor (
        private http: HttpClient,
        private userService: UserService,

    ) {}

    getAllComments(): Observable<IComment[]> {
        return this.http.get<IComment[]>('http://localhost:3000/comments/')
    }

    getAllUserComments(id: number): Observable<IComment[]> {
        return this.http.get<IComment[]>(`http://localhost:3000/users/${ id }/comments`)
    }

    getAllArticleComments(id: number): Observable<IComment[]> {
        return this.http.get<IComment[]>(`http://localhost:3000/articles/${ id }/comments`)
    }

    getComment(id: number): Observable<IComment> {
        return this.http.get<IComment>(`http://localhost:3000/comments/${ id }`)
    }

    publishComment(userId: number, articleId: number, body: string): Observable<IComment> {
        let comment: IComment = {} as IComment

        comment.userId    = userId
        comment.articleId = articleId
        comment.body      = body

        const httpOptions = {
            headers: new HttpHeaders({
                "Authorization": "Token " + this.userService.getJwt()
            })
        };


        return this.http.post<IComment>('http://localhost:3000/comments', comment, httpOptions)
    }
}
