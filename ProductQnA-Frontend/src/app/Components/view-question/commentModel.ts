export class CommentModel{
    id:number
    text: string;
    questionId: number;
    userName:string;
    createdDate?:string;
    likeCount:number;
}