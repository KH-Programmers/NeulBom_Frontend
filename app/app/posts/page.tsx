"server-only";
import React from "react";
import ConetentEditor from './[id]/components/ContentEditor';

const PostCreatePage: React.FC = () => {
  return (
    <div className="px-6">
      <div className="max-w-[768px] mx-auto mt-12">
        <div className="text-2xl font-bold">글쓰기</div>
        <ConetentEditor/>
      </div>
    </div>
  );
};

export default PostCreatePage;
