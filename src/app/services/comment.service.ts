import { from, Observable, of } from"rxjs";
import { delay, concatMap } from"rxjs/operators";
import { Injectable } from'@angular/core';
import { CommentModel } from"../models/comment.model";

@Injectable()
export class CommentService {
    mockCommentList: Array<CommentModel> = [
        new CommentModel(),
        new CommentModel(), 
        new CommentModel(),
    ]

    getAllComments(): Observable<Array<CommentModel>> {
        return of(this.mockCommentList).pipe(delay(1000));
    }

    rotateAllComments(): Observable<CommentModel> {
        return from(this.mockCommentList).pipe(
            concatMap(item => of(item).pipe(
                delay(5000)
            ))
        );
    }
}
