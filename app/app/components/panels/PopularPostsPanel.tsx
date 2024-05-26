import React from "react";
import { Post } from "../../board/types";

export const PopularPostsPanel: React.FC<{
  posts: Post[];
}> = ({ posts }) => {
  return (
    <div className="grid gap-4 p-2">
      {posts.map((post, k) => {
        return (
          <div key={k} className="p-4 bg-gray-200 rounded-xl">
            <a className="text-xl" href={`/app/posts/${post.id}/`}>
              {post.title}
            </a>
            <div className="mt-1 font-light text-sm overflow-hidden text-ellipsis text-black/60">
              {post.user.authorName}
            </div>
          </div>
        );
      })}
    </div>
  );
};
