import React from "react";
import { PostListItem } from "./components/PostListItem";
import axios from 'axios';

interface List {
  list: Array<{
    id: number,
    author_name: string,
    title: string,
    text: string,
    comment_count: number,
    viewcounts: number,
    updated_at:string,
    like_count: number,
  }>,
}

const BoardCategoryView: React.FC<List> = ({list}) => {
  console.log(list);

  return (
    <div className="flex flex-col gap-4 w-full">
      {
        list.map((post) => {
          return (
            <PostListItem
              id={post.id}
              title={post.title}
              username={post.author_name}
              commentCount={post.comment_count}
              viewCount={post.viewcounts}
              createdAt={post.updated_at}
            />
          )
        })
      }
      
    </div>
  );
};

export default BoardCategoryView;

export async function getServerSideProps() {
  const response = await (await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/board/1`, {
    headers: {
      Authorization: "Token 45979edbfe8f6dafeb44e2884e1ea282"
    }
  })).data;

  const result = response.json()

  console.log(result)

  return {
    props: {
      list : result,
    },
  };
}