"use client";

import React from "react";

import { Post } from "../types";
import { PostListItem } from "./components/PostListItem";
import axios from "axios";
import { useParams } from "next/navigation";

export default async function BoardCategoryView() {
  let { category } = useParams();
  const [posts, setPosts] = React.useState<Post[]>([]);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URI!}/board/1/`,
      {
        headers: {
          Authorization: "Token 1a548373a375c942c7d38985b0d6031b",
        },
      }
    );
    setPosts(await response.data);
  } catch (e) {
    setPosts([]);
    console.error(e);
  }

  console.log(posts);

  return (
    <div className="flex flex-col gap-4 w-full">
      {posts.map((post: Post, k) => (
        <PostListItem
          key={k}
          id={post.id}
          title={post.title}
          username={post.authorName}
          commentCount={post.commentCount}
          viewCount={post.viewCounts}
          createdAt={post.updatedAt}
        />
      ))}
    </div>
  );
}
