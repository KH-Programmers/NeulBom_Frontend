export type BoardCategory = {
  id?: string;
  name: string;
  children?: BoardCategory[];
};

export type Post = {
  id: string;
  title: string;
  authorName: string;
  commentCount: number;
  viewCounts: number;
  updatedAt: string;
  likeCount: number;
};
