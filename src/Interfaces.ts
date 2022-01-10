export interface IPost {
  id: string;
  timestamp: number;
  title: string;
  body: string;
  author: string;
  category: string;
  voteScore: number;
  deleted: boolean;
  comments: IComment[];
  commentCount: number;
}

export interface IComment {
  id: string;
  parentId: string;
  timestamp: number;
  body: string;
  author: string;
  voteScore: number;
  deleted: boolean;
  parentDeleted: boolean;
}

export interface ICategory {
  name: string;
  url: string;
}

export interface IAction {
  type: string;
  posts: IPost[];
  categories: ICategory[];
}
