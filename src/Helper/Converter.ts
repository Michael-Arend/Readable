import { IComment } from "../Interfaces";

export const CommentObjInArray = (comments: IComment[]) => {
  const commentArray: IComment[] = [];
  Object.keys(comments).forEach((key: any) =>
    commentArray.push({
      id: comments[key].id,
      parentId: comments[key].parentId,
      timestamp: comments[key].timestamp,
      body: comments[key].body,
      author: comments[key].author,
      voteScore: comments[key].voteScore,
      deleted: comments[key].deleted,
      parentDeleted: comments[key].parentDeleted,
    })
  );
  return commentArray;
};
