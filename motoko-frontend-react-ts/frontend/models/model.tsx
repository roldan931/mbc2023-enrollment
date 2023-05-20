export interface Message {
    messageId: number;
    vote: number;
    content: ContentMessage;
    creator: string;
}

export interface ContentMessage {
    text: string;
    image: Blob;
    video: Blob;
};