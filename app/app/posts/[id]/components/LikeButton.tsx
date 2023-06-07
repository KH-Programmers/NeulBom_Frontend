"use client"
import { GET } from '@/utils/request'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { TbHeart } from 'react-icons/tb'

interface likeAction {
  likeCount:number; 
  url:string; 
  token:RequestCookie;
}

export const LikeButton: React.FC<likeAction> = ({likeCount, url, token}) => { 
  let count = likeCount;
  const  like = async() => {
    await GET(`${url}/like/`, token.value);
  }
  
  return(
    <button className="border-2 p-2 border-red-500 text-red-500 rounded-lg flex gap-2 items-center hover:bg-red-500 hover:text-white transition-all"
      onClick={like}
    >
        <TbHeart size={20} />
      <div className="text-sm">{count}</div>
    </button>
  )
}
