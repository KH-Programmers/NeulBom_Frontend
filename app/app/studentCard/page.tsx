import React from "react";
import Image from "next/image";

import Barcode from '@/assets/barcode.svg';

const StudentCard: React.FC = () => {
  const user: {
    username: string;
    studentId: string;
    profileImg: string | null;
    barcodeImg: string;
  } = {
    username: "송찬우",
    studentId: "30716",
    profileImg:
      "https://cdn.discordapp.com/avatars/299895531701010442/b245fd3cc8b5c487b5e186d1cd3170d4.png?size=1024",
    barcodeImg: require('../../../assets/barcode.svg')
  };
  return (
    <div>
      <div className="w-1/3 h-auto rounded-full mx-auto">
        {user.profileImg ? (
          <Image
            src={user.profileImg}
            alt=""
            width={1024}
            height={1024}
            className="rounded-t-2xl"
          />
        ) : (
          <div></div>
        )}
      </div>
      <h1 className="w-min whitespace-nowrap mx-auto text-6xl font-black mt-4">
        {user.username}
      </h1>
      <h1 className="w-min whitespace-nowrap mx-auto text-3xl font-black opacity-50">
        {user.studentId}
      </h1>
      <Image src={Barcode} alt="" width={1024} height={1024} />
    </div>
  );
};

export default StudentCard;
