import React from "react";

import { Post } from "../types";
import { PostListItem } from "./components/PostListItem";
import axios from "axios";

export default async function BoardCategoryView() {
  try {
    const posts = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URI!}/board/1`
    );
    console.log(await posts.data);
  } catch (e) {
    throw e;
  }
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
}
