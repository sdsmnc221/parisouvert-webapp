export class Photo {
    id: number;
    url: string;
    caption?: string;
    source: string;
    sourceUrl: string;
    dateAdded: string;
    evId: number;
    userId?: number;

    constructor(id: number,
                url: string,
                source: string,
                sourceUrl: string,
                dateAdded: string,
                evId: number,
                userId?: number | null,
                caption?: string) {
        
        this.id = id;
        this.url = url;
        this.source = source;
        this.sourceUrl = sourceUrl;
        this.dateAdded = dateAdded;
        this.evId = evId;
        this.userId = (userId) ? userId : 0;
        this.caption = (caption) ? caption : '';
    }
}