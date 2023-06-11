"use client"
import { TbShare } from 'react-icons/tb'

export const ShareButton: React.FC = () => {
  const shareLink = () => {
    navigator.share({
    title: document.title,
    url: window.location.href,
    })
  }
  return(
    <button
      className="border-2 p-2 border-blue-500 text-blue-500 rounded-lg flex gap-2 items-center hover:bg-blue-500 hover:text-white transition-all disabled:border-black/20 disabled:text-black/20 disabled:hover:border-black/20 disabled:hover:text-black/20 disabled:hover:bg-transparent"
      disabled={typeof navigator === "undefined" || !navigator.share}
      onClick={shareLink}
    > <TbShare size={20} /></button>
  )
}