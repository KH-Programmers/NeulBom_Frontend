export type BoardCategory = {
  id: string;
  name: string;
  children: BoardCategory[] | null;
  isWritable: boolean;
  isRequireSuper: boolean;
};

export type User = {
  id: string;
  authorName: string;
  isAdmin: boolean;
};
