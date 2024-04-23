import Dexie, { Table } from 'dexie';

export interface FavoriteProduct {
    id: string;
    createdAt: Date;
}

export class OfflineDatabaseDexie extends Dexie {
    favorites!: Table<FavoriteProduct>;

    /**
     *
     */
    constructor() {
        super('offlineDatabase');
        this.version(1).stores({
            friends: 'id, createdAt'
        });
    }
}

export const db = new OfflineDatabaseDexie();