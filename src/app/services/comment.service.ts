import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { CommentDataModel } from '../models/comment.model'
import { MockDataService } from '../services/mock-data.service'


@Injectable()
export class CommentService {
    constructor (
        private mockDataService: MockDataService
    ) {}

    getAllComments(): Observable<CommentDataModel[]> {
        return of(this.mockDataService.mockCommentList).pipe(delay(200))
    }

    getAllUserComments(id: number): Observable<CommentDataModel[]> {
        return of(this.mockDataService.mockCommentList.filter(c => c.user_id === id)).pipe(delay(200))
    }

    getAllArticleComments(id: number): Observable<CommentDataModel[]> {
        return of(this.mockDataService.mockCommentList.filter(c => c.article_id === id)).pipe(delay(200))
    }

    getComment(id: number): Observable<CommentDataModel> {
        return of(this.mockDataService.mockCommentList[id]).pipe(delay(200))
    }
}
