export type BoardCategory = {
  id?: string;
  name: string;
  children?: BoardCategory[];
};

export type Post = {
  id: string;
  title: string;
  user : user;
  commentCount: number;
  viewCounts: number;
  updatedAt: string;
  likeCount: number;
};

export type user = {
  id:string;
  authorName:string;
  isAdmin:boolean;
}