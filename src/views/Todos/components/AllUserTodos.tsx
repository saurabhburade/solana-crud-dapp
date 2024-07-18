"use client";
import {
  useFetchAllUserTodos,
  useFetchSingleTodo,
  useTodoProgram,
} from "@/hooks/todos";
import React, { useMemo, useState } from "react";
import _ from "lodash";
import { useWallet } from "@solana/wallet-adapter-react";
import { getTodoPda, getUserPda } from "@/helpers/pda";
import TodoRow from "./TodoRow";
import { Todo } from "@/types/todo";

type Props = {
  userTodosData: any;
  handleCheckTodo: (
    idx: number,
    isChecked: boolean,
    cb?: (txhash: string, error?: string) => void
  ) => void;
  handleDeleteTodo: (
    idx: number,
    cb?: (txhash: string, error?: string) => void
  ) => void;
  handleUpdateTodo: (
    content: string,
    idx: number,
    cb?: (txhash: string, error?: string) => void
  ) => void;
  isLoadingProp?: boolean;
};
function AllUserTodos({
  userTodosData,
  handleCheckTodo,
  handleDeleteTodo,
  handleUpdateTodo,
  isLoadingProp,
}: Props) {
  const memoTodos = useMemo(() => {
    const indexedTodos = _.sortBy(userTodosData?.data, (o) => o?.account?.idx);
    const groupedTodos = _.groupBy(indexedTodos, (o) => o?.account?.checked);
    const checkedTodos = groupedTodos?.true;
    const uncheckedTodos = groupedTodos?.false;

    return { indexedTodos, checkedTodos, uncheckedTodos };
  }, [userTodosData]);

  return (
    <div className="w-full flex flex-col items-center">
      {isLoadingProp && (
        <>
          <div className="p-5 bg-base-100 my-2 rounded-2xl grid grid-cols-[3fr_1fr] lg:w-1/2 items-center animate-pulse">
            <div className="flex items-center gap-3">
              <p className="opacity-70 h-[2em] w-[2em] rounded-lg bg-base-300/90 animate animate-pulse"></p>

              <p className="opacity-70 h-[2em] w-[10em] rounded-lg bg-base-300/90 animate animate-pulse"></p>
            </div>
            <div className="flex justify-end items-center gap-3">
              <p className="opacity-70 h-[2em] w-[2em] rounded-lg bg-base-300/90 animate animate-pulse"></p>
              <p className="opacity-70 h-[2em] w-[2em] rounded-lg bg-base-300/90 animate animate-pulse"></p>
            </div>
          </div>
          <div className="p-5 bg-base-100 my-2 rounded-2xl grid grid-cols-[3fr_1fr] lg:w-1/2 items-center animate-pulse">
            <div className="flex items-center gap-3">
              <p className="opacity-70 h-[2em] w-[2em] rounded-lg bg-base-300/90 animate animate-pulse"></p>

              <p className="opacity-70 h-[2em] w-[10em] rounded-lg bg-base-300/90 animate animate-pulse"></p>
            </div>
            <div className="flex justify-end items-center gap-3">
              <p className="opacity-70 h-[2em] w-[2em] rounded-lg bg-base-300/90 animate animate-pulse"></p>
              <p className="opacity-70 h-[2em] w-[2em] rounded-lg bg-base-300/90 animate animate-pulse"></p>
            </div>
          </div>
          <div className="p-5 bg-base-100 my-2 rounded-2xl grid grid-cols-[3fr_1fr] lg:w-1/2 items-center animate-pulse">
            <div className="flex items-center gap-3">
              <p className="opacity-70 h-[2em] w-[2em] rounded-lg bg-base-300/90 animate animate-pulse"></p>

              <p className="opacity-70 h-[2em] w-[10em] rounded-lg bg-base-300/90 animate animate-pulse"></p>
            </div>
            <div className="flex justify-end items-center gap-3">
              <p className="opacity-70 h-[2em] w-[2em] rounded-lg bg-base-300/90 animate animate-pulse"></p>
              <p className="opacity-70 h-[2em] w-[2em] rounded-lg bg-base-300/90 animate animate-pulse"></p>
            </div>
          </div>
        </>
      )}
      {memoTodos?.indexedTodos?.map(
        ({ account }: { account: Todo }, idx: number) => {
          return (
            <TodoRow
              key={account?.content}
              content={account?.content}
              checked={account?.checked}
              idx={account?.idx}
              handleCheckTodo={handleCheckTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleUpdateTodo={handleUpdateTodo}
              isLoadingProp={isLoadingProp}
            />
          );
        }
      )}
    </div>
  );
}

export default AllUserTodos;
