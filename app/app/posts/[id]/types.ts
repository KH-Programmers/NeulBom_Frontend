export type CommentElement = {
  id: number;
  authorName: string;
  content: string;
  reply: Array<CommentElement>;
};

export type Article = {
  id: string;
  title: string;
  text: string;
  user: {
    authorName: string;
    isAdmin: boolean;
    isLiked: boolean;
  };
  comments: Array<CommentElement>;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  canDelete: boolean;
  isAnonymous: boolean;
  isAdmin: boolean;
};
