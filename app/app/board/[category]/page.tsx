import React from "react";
import { PostListItem } from "./components/PostListItem";

const BoardCategoryView: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <PostListItem
        id="1"
        title="post"
        username="sans"
        commentCount={1000}
        viewCount={1000}
        createdAt="23.06.01"
      />
      <PostListItem
        id="1"
        title="post"
        username="sans"
        commentCount={1000}
        viewCount={1000}
        createdAt="23.06.01"
      />
      <PostListItem
        id="1"
        title="post"
        username="sans"
        commentCount={1000}
        viewCount={1000}
        createdAt="23.06.01"
      />
      <PostListItem
        id="1"
        title="post"
        username="sans"
        commentCount={1000}
        viewCount={1000}
        createdAt="23.06.01"
      />
      <PostListItem
        id="1"
        title="post"
        username="sans"
        commentCount={1000}
        viewCount={1000}
        createdAt="23.06.01"
      />
      <PostListItem
        id="1"
        title="post"
        username="sans"
        commentCount={1000}
        viewCount={1000}
        createdAt="23.06.01"
      />
      <PostListItem
        id="1"
        title="post"
        username="sans"
        commentCount={1000}
        viewCount={1000}
        createdAt="23.06.01"
      />
    </div>
  );
};

export default BoardCategoryView;
