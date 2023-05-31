export type BoardCategory = {
  id?: string;
  name: string;
  children?: BoardCategory[];
};
