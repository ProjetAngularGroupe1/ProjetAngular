import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { CommentModel } from '../models/comment.model'
import { MockDataService } from '../services/mock-data.service'


@Injectable()
export class CommentService {
    constructor (private mockDataService: MockDataService) {}

    getAllComments(): Observable<CommentModel[]> {
        return of(this.mockDataService.mockCommentList).pipe(delay(500))
    }

    getAllUserComments(id: number): Observable<CommentModel[]> {
        return of(this.mockDataService.mockCommentList.filter(c => c.user_id === id)).pipe(delay(500))
    }

    getAllArticleComments(id: number): Observable<CommentModel[]> {
        return of(this.mockDataService.mockCommentList.filter(c => c.article_id === id)).pipe(delay(500))
    }

    getComment(id: number): Observable<CommentModel> {
        return of(this.mockDataService.mockCommentList[id]).pipe(delay(500))
    }
}
