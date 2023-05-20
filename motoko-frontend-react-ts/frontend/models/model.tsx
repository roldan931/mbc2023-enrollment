export interface Message {
    vote: number;
    content: ContentMessage;
    creator: string;
}

export interface ContentMessage {
    text: string;
    image: Blob;
    video: Blob;
};