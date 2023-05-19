export interface Message {
    vote: number;
    content: Content;
    creator: string;
}

export interface Content {
    text: string;
    image: Blob;
    video: Blob;
};