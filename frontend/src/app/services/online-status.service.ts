import { Injectable } from'@angular/core';
import { Subject } from'rxjs';
import { CommentModel } from '../models/comment.model';
import { db } from '../../indexed.db';
import { CommentService } from './comment.service';

declare const window: any;

@Injectable({ providedIn:'root' })
export class OnlineStatusService {
    private internalConnectionChanged = new Subject<boolean>();

    get connectionChanged() {
        return this.internalConnectionChanged.asObservable();
    }

    isOnline(): boolean {
        return !!window.navigator.onLine;
    }

    constructor(
        private commentService: CommentService
    ) {
        window.addEventListener('online' , () => this.updateOnlineStatus());
        window.addEventListener('offline', () => this.updateOnlineStatus());
    }

    private async updateOnlineStatus() {
        this.internalConnectionChanged.next(window.navigator.onLine);

        if (this.isOnline()) {
            console.log('online');

            const comments = (await db.comments.toArray()).map(c => c as CommentModel);

            comments?.forEach(comment => {
                this.commentService.publishComment(comment.userId, comment.articleId, comment.body)
            });

            db.comments.clear();
        }  else {
            console.log('offline');
        }

    }
}
