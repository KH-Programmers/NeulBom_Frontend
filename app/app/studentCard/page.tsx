import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { cookies } from "next/headers";

import { GoPerson } from "react-icons/go";

import { GET } from "@utils/request";
import Barcode from "@components/Barcode";

export const metadata: Metadata = {
  title: "NeulBom 학생증",
  description: "당신의 학생증을 확인하세요.",
};

const StudentCard: React.FC = async () => {
  const requestUserInformation = await GET(
    "/user/",
    cookies().get("accessToken")?.value,
  );
  if (!requestUserInformation) {
    return <div>바코드를 불러오는 중 오류가 발생했습니다.</div>;
  }

  const userData: {
    username: string;
    studentId: string;
    profileImg?: string;
  } = await requestUserInformation.data['data'];

  return (
    <div className="absolute m-0 top-1/2 -translate-y-1/2 w-full">
      <div className="max-w-64 w-1/3 h-auto rounded-full mx-auto">
        {userData.profileImg ? (
          <Image
            src={userData.profileImg}
            alt=""
            width={1024}
            height={1024}
            className="rounded-t-2xl"
          />
        ) : (
          <div className="flex items-center w-fit mx-auto">
            <GoPerson size={128} />
          </div>
        )}
      </div>
      <h1 className="w-min whitespace-nowrap mx-auto text-6xl font-black mt-6 drop-shadow-md">
        {userData.username}
      </h1>
      <h1 className="w-min whitespace-nowrap mx-auto text-3xl font-black opacity-50">
        {userData.studentId}
      </h1>
      {/* <Image src={Barcode} alt="" className="w-full max-w-80 mx-auto mt-8" /> */}
      <div className="w-full mx-auto mt-8">
        <Barcode className='w-full' value={userData.studentId} />
      </div>

      {/*<div*/}
      {/*  dangerouslySetInnerHTML={{ __html: user.barcodeImg }}*/}
      {/*  className="w-full max-w-80 mx-auto mt-8 svg-size"*/}
      {/*/>*/}
    </div>
  );
};

export default StudentCard;
