import React from "react";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ConetentEditor from './[id]/components/ContentEditor';

const PostCreatePage: React.FC = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return redirect("/signin");
  }

  return (
    <div className="px-6">
      <div className="max-w-[768px] mx-auto mt-12">
        <div className="text-2xl font-bold">글쓰기</div>
        <ConetentEditor token={token}/>
      </div>
    </div>
  );
};

export default PostCreatePage;
