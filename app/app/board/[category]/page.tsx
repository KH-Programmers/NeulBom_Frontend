import React from "react";
import { PostListItem } from "./components/PostListItem";
import { arrayBuffer } from 'stream/consumers';
import axios from 'axios';


const BoardCategoryView: React.FC = () => {

  return (
    <div className="flex flex-col gap-4 w-full">
    </div>
  );
};

export default BoardCategoryView;

export async function getlistById(id:number) {
  const result = await (await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/board/` + id, {
    headers: {
      Authorization: "Token 45979edbfe8f6dafeb44e2884e1ea282"
    }
  })).data;

  console.log(result)
  return result
}