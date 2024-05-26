export type BoardCategory = {
  id: string;
  name: string;
  children: BoardCategory[] | null;
  isWritable: boolean;
  isRequireSuper: boolean;
};

export type Post = {
  id: string;
  title: string;
  user: User;
  commentCount: number;
  viewCounts: number;
  updatedAt: string;
  likeCount: number;
};

export type User = {
  id: string;
  authorName: string;
  IsAdmin: boolean;
};
