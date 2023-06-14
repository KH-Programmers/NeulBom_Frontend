"use client"
import { GET } from '@/utils/request'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { TbHeart, TbHeartFilled } from 'react-icons/tb'
import React from 'react'

interface likeAction {
  likeCount:number; 
  url:string; 
  token:RequestCookie;
}

export const LikeButton: React.FC<likeAction> = ({likeCount, url, token}) => { 
  const [count, setCount] = React.useState(likeCount);
  const [isCounted, setIsCounted] = React.useState(false);
  
  const  like = async() => {
    if (!isCounted) {
      await GET(`${url}like/`, token.value);
      setCount(likeCount += 1);
      setIsCounted(true);
    }
  }

  const heart = (isCounted:Boolean) => {
    if (isCounted) {
      return(
        <TbHeartFilled size={20} />
      )
    } else {
      return(
        <TbHeart size={20} />
      )
    }
    
  }

  return(
    <button className="border-2 p-2 border-red-500 text-red-500 rounded-lg flex gap-2 items-center hover:bg-red-500 hover:text-white transition-all"
      onClick={like}
    >   
      {heart(isCounted)}
      <div className="text-sm">{count}</div>
    </button>
  )
}
