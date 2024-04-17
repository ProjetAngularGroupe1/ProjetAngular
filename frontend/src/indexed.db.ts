import Dexie, { Table } from "dexie";
import { IArticle, IComment } from "shared";

export class IndexedDb extends Dexie {
    comments!: Table<IComment, number>;
    stuffs!: Table<any, number>;

    constructor() {
        super('myDb');

        this.version(1).stores({
            comments: '++id',
            stuffs: '++id',
        });

        this.on('populate', () => {});
    }
}

export const db = new IndexedDb();
