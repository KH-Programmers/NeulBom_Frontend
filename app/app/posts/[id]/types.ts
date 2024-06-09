export type Comment = {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
  isAnonymous: boolean;
  isAdmin: boolean;
  canDelete: boolean;
  children: Comment[];
};

export type Article = {
  id: string;
  categories: string[][];
  title: string;
  text: string;
  authorName: string;
  comments: Array<Comment>;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  canDelete: boolean;
  isAnonymous: boolean;
  isAdmin: boolean;
  isLiked: boolean;
};
