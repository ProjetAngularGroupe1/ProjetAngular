import { CommentModel } from './comment.model';

export class ArticleModel {
    id: number;
    title: string;
    author: string;
    body: string;
    creation_date: Date;
    update_date: Date;
    like_count: number;
    comments: Array<CommentModel>;
   
    constructor() {
        this.id            = 0;
        this.title         = "Article Title";
        this.author        = "Article Comment Author";
        this.body          = "Article Body";
        this.creation_date = new Date();
        this.update_date   = new Date();
        this.like_count    = 10;
        this.comments      = new Array<CommentModel>();
    }
}