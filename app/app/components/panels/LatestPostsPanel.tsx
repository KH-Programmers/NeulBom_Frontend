import React from "react";

import { Article } from "../../posts/[id]/types";

export const LatestPostsPanel: React.FC<{
  posts: Article[];
}> = ({ posts }) => {
  return (
    <div className="grid gap-4 p-2">
      {posts.map((post, k) => {
        return (
          <div key={k} className="p-4 bg-gray-200 rounded-xl h-full">
            <a className="text-xl" href={`/app/posts/${post.id}/`}>
              {post.title}
            </a>
            <div className="mt-1 font-light text-sm overflow-hidden text-ellipsis text-black/60">
              {post.isAdmin
                ? "관리자"
                : post.isAnonymous
                  ? "익명"
                  : post.authorName}
            </div>
          </div>
        );
      })}
    </div>
  );
};
