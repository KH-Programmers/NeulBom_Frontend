import Link from "next/link";
import React from "react";
import {
  TbCalendar,
  TbChevronRight,
  TbEye,
  TbHeart,
  TbShare,
} from "react-icons/tb";
import { Comment } from "./components/Comment";
import { CommentInput } from "./components/CommentInput";

const PostViewPage: React.FC = () => {
  return (
    <div className="px-6">
      <div className="container mx-auto mt-12">
        <article>
          <div className="flex gap-2 items-center">
            <Link href="/app/board/study" className="text-blue-500">
              공부
            </Link>

            <TbChevronRight className="text-black/40" />

            <Link href="/app/board/questions" className="text-blue-500">
              질문
            </Link>

            <TbChevronRight className="text-black/40" />

            <Link href="/app/board/question1" className="text-blue-500">
              1학년 과목
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold mt-2">제목</h1>
          <hr className="border-t border-black/40 mt-2" />
          <div className="flex mt-2">
            <div className="text-gray-500">(username)</div>
            <div className="flex-grow" />
            <div className="flex gap-4 items-center text-black/60">
              <div className="flex items-center gap-2">
                <TbEye size={20} />
                <span>1234</span>
              </div>
              <div className="flex items-center gap-2">
                <TbHeart size={20} />
                <span>10</span>
              </div>
              <div className="flex items-center gap-2">
                <TbCalendar size={20} />
                <span>23-06-01</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 mt-4 rounded-xl shadow-md">
            <div>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
              <p>wow this is body</p>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <button className="border-2 p-2 border-red-500 text-red-500 rounded-lg flex gap-2 items-center hover:bg-red-500 hover:text-white transition-all">
              <TbHeart size={20} />
              <div className="text-sm">100</div>
            </button>
            <div className="flex-grow w-0" />
            <button className="border-2 p-2 border-blue-500 text-blue-500 rounded-lg flex gap-2 items-center hover:bg-blue-500 hover:text-white transition-all">
              <TbShare size={20} />
            </button>
          </div>
        </article>
        <div className="mt-8">
          <div className="text-2xl font-bold">댓글</div>
          <div className="mt-4">
            <CommentInput />
          </div>
          <div className="mt-4 bg-white rounded-xl shadow-md divide-y">
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
        <div className="mt-16" />
      </div>
    </div>
  );
};

export default PostViewPage;
