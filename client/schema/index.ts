export type User = {
  id: number;
  name: string;
  email: string;
  points: number;
  createdAt: number;
};

export type Tag = {
  id: number;
  name: string;
};

export type Writer = {
  id: number;
  name: string;
  biography: string;
};

export type Book = {
  id: number;
  title: string;
  coverImage: string;
  points: number;
  writers: Array<Writer>;
  tags: Array<Tag>;
};
