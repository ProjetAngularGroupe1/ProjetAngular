export class CommentModel {
    id: number;
    body: string;
    author: string;
    creation_date: Date;
    update_date: Date;
    like_count: number;

    constructor() {
        this.id            = 0;
        this.body          = "Comment body";
        this.author        = "Comment author";
        this.creation_date = new Date();
        this.update_date   = new Date();
        this.like_count    = 8;
    }
}