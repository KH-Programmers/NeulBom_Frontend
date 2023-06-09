import React from "react";

export const PopularPostsPanel: React.FC<{
  posts: Array<{
    id: number;
    authorName: string;
    title: string;
    commentCount: number;
    viewCounts: number;
    updatedAt: string;
    likeCount: number;
  }>;
}> = ({ posts }) => {
  return (
    <div className="divide-y">
      {posts.map((x, k) => {
        return (
          <div key={k} className="p-4">
            <div className="text-xl">{x.title}</div>
            <div className="mt-1 font-light text-sm overflow-hidden text-ellipsis text-black/60">
              {x.authorName}
            </div>
          </div>
        );
      })}
    </div>
  );
};
