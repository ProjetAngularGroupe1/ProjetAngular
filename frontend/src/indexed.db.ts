import Dexie, { Table } from "dexie";
import { IArticle, IComment } from "shared";

export class IndexedDb extends Dexie {
    comments!: Table<IComment, number>;

    constructor() {
        super('myDb');

        this.version(1).stores({
            comments: '++id',
        });

        this.on('populate', () => {});
    }
}

export const db = new IndexedDb();
