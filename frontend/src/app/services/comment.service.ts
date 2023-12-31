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

    getAllArticleComments(id: number): Observable<IComment[]> {
        return this.http.get<IComment[]>(`http://localhost:3000/articles/${ id }/comments`)
    }

    getComment(id: number): Observable<IComment> {
        return this.http.get<IComment>(`http://localhost:3000/comments/${ id }`)
    }

    getMockupAllComments(): Observable<CommentModel[]> {
        return of(this.mockDataService.mockCommentList).pipe(delay(200))
    }

    getAllMockupUserComments(id: number): Observable<CommentModel[]> {
        return of(this.mockDataService.mockCommentList.filter(c => c.user_id === id)).pipe(delay(200))
    }

    getAllMockupArticleComments(id: number): Observable<CommentModel[]> {
        return of(this.mockDataService.mockCommentList.filter(c => c.article_id === id)).pipe(delay(200))
    }

    getMockupComment(id: number): Observable<CommentModel> {
        return of(this.mockDataService.mockCommentList[id]).pipe(delay(200))
    }
}
