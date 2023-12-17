import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { CommentModel } from '../models/comment.model'
import { MockDataService } from '../services/mock-data.service'

@Injectable()
export class CommentService {

    constructor (private mockDataService: MockDataService) {}

    getAllComments(): Observable<Array<CommentModel>> {
        return of(this.mockDataService.mockCommentList).pipe(delay(1000))
    }
}
