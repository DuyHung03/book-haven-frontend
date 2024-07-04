export interface BookEntity {
    bookId: string;
    title: string;
    authorName: string;
    publicationYear: number;
    isbn: string;
    pageCount: number;
    price: string;
    imgUrls?: Array<string>;
    description?: string;
    rating?: number;
    genreNameList?: Array<string>;
    inStock: number;
}
