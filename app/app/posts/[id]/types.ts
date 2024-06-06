export type CommentElement = {
  id: number;
  authorName: string;
  content: string;
  reply: Array<CommentElement>;
};

export type Article = {
  id: string;
  categories: string[];
  title: string;
  text: string;
  authorName: string;
  comments: Array<CommentElement>;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  canDelete: boolean;
  isAnonymous: boolean;
  isAdmin: boolean;
  isLiked: boolean;
};
