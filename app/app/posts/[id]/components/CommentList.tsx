"use client"

import React from 'react'
import { Article, CommentElement } from '../types'
import { Comment } from "./Comment";
import { CommentInput } from './CommentInput';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface CommentList {
  article:Article;
  requestUrl:string;
  token:RequestCookie;
}
export const CommentList:React.FC<CommentList> = ({article, requestUrl, token}) => {
  const [comments, setComments] = React.useState<CommentElement[]>(article.comments)
  
  const comment = comments.map((comment:CommentElement, k:number) => (
    <Comment
      key={k}
      nested={false}
      CommentElement={comment}
      parentUrl={requestUrl}
      token={token}
    />
  ))
  const commentCount = comments.length;
  const commentSubmit= (comment:string) => {
    const newComment: CommentElement = {
      id: comments.length + 1,
      author_name: article.author_name,
      content: comment,
      reply: [],
    };

    setComments((prevComments) => [...prevComments, newComment]);
  } 
  return(
    <div className="mt-8">
          <div className="text-2xl font-bold">댓글({commentCount})</div>
          <div className="mt-4">
            <CommentInput 
              nested={false}
              url={requestUrl}
              token={token}
              parentCommentId={0}
              onCommentSubmit={commentSubmit}
            />
          </div>
          <div id="comment" className="mt-4 bg-white rounded-xl shadow-md divide-y">
            {comment}
          </div>
        </div>
  )
}