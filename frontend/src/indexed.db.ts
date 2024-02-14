import Dexie, { Table } from "dexie";
import { IArticle, IComment } from "shared";

export class IndexedDb extends Dexie {
    articles!: Table<IArticle, number>;
    comments!: Table<IComment, number>;

    constructor() {
        super('myDb'); // On choisit le nom du Singleton

        // On initialise l'id du 1er item de la table
        this.version(1).stores({
            articles: '++id', 
            comments: '++id',
        });

        this.on('populate', () => this.bukAddTest());
    }

    async bukAddTest() {
        await db.articles.bulkAdd([
            { id: 0, userId: 1, title: "test", body: "test", createdAt: new Date(), updatedAt: new Date() },
            { id: 1, userId: 1, title: "test", body: "test", createdAt: new Date(), updatedAt: new Date() },
        ]);

        await db.comments.bulkAdd([
            { id: 1, userId: 1,  articleId: 1,  body: "test", createdAt: new Date(), updatedAt: new Date() },
            { id: 2, userId: 1,  articleId: 1,  body: "test", createdAt: new Date(), updatedAt: new Date() },
        ]);
    }
}

export const db = new IndexedDb();
