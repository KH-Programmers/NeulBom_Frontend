import { redirect } from "next/navigation";
import React from "react";

const Board: React.FC = () => {
  return redirect("/app/board/popular");
};

export default Board;
