import { type } from 'os';

export type CommentElement = {
  id: number;
  author_name: string;
  content: string;
  reply: Array<CommentElement>;
}

export type Category = {
  board_name:string;
  board_EN:string;
}

export type Article = {
  id:number;
  author_name:string;
  board_model:Array<Category>;
  title:string;
  text:string;
  comments:Array<CommentElement>;
  viewcounts:number;
  like_count:number;
  dislike_count:number;
  updated_at:string;
}