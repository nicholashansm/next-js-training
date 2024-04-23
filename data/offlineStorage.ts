import Dexie, { Table } from 'dexie';

export interface FavoriteProduct {
    id: string;
    name: string;
    createdAt: Date;
}

export class OfflineDatabaseDexie extends Dexie {
    favorites!: Table<FavoriteProduct, string>;

    constructor() {
        super('OfflineDatabaseDexie');
        this.version(1).stores({
            favorites: 'id, name'
        });
    }
}

export const db = new OfflineDatabaseDexie();