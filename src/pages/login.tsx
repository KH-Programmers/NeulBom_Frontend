import React from "react";

const SignUp = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border-4 border-[#9E1915] rounded-lg w-[40%] h-[50%] flex justify-center items-center flex-col">
        <div className="flex items-center w-[60%]">
          <h1 className="font-black whitespace-nowrap text-4xl 2xl:text-5xl ">NeulBom</h1>
          <h1 className="font-black text-4xl 2xl:text-5xl ml-2 mr-2 ">X</h1>
          <div className="w-1/6 h-1/6">
            <img alt="" src="../assets/lion.png" className=""/>
          </div>
        </div>

        <form className="flex flex-col border border-[#9E1915] rounded-lg w-[55%]">
              <div className="flex flex-row shadow-inner rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9E1915] hover:ring-2">
                <img src="../assets/person.png" alt="이미지" className="bg-white object-cover"/>
                <input placeholder="아이디" className="border-none w-full"/>
              </div>
              
              <div className="flex flex-row shadow-inner rouded-lg focus:outline-none focus:ring-2 focus:ring-[#9E1915] hover:ring-2">
                <img src="../assets/payment.png" alt="" className="bg-white object-cover"/>
                <input type="password" placeholder="비밀번호" className="w-full"/>
              </div>

          </form>
        
        <div className="bg-[#9E1915] text-center w-[60%] mr-[15%] ml-[15%]"> 로그인 </div>
          <input type="checkbox" className="appearance-none checked:bg-blue-500 ..." />
        </div>
    </div>
  );
};

export default SignUp;
