import { User } from "./user.model";

export interface Comment {
    id: number;
    threadId: number | undefined; //the comment Id to which this comment replies
    replyingTo: string | undefined; //the user to which this comment replies, could be different from the the user of threadId
    content: string;
    createdAt: Date;
    score: number;
    user: User;
    replies: Comment[] | undefined;
}