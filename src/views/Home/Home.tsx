import Header from "@/components/Header/Header";
import React from "react";

import UserTodos from "../Todos/UserTodos";
type Props = {};

function Home({}: Props) {
  return (
    <div className="h-screen">
      <Header />
      <div className="container mx-auto p-4 flex justify-center w-full ">
        <UserTodos />
      </div>
    </div>
  );
}

export default Home;
