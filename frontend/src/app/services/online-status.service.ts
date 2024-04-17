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
        window.addEventListener('online' , () => this.internalConnectionChanged.next(window.navigator.onLine));
        window.addEventListener('offline', () => this.internalConnectionChanged.next(window.navigator.onLine));
    }
}
