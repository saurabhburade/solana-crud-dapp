"use client";

import React, { useState } from "react";
import AddTodos from "./components/AddTodos";
import AllUserTodos from "./components/AllUserTodos";
import { useFetchAllUserTodos, useTodoProgram } from "@/hooks/todos";
import { useFetchUser } from "@/hooks/user";
import { useWallet } from "@solana/wallet-adapter-react";
import { getTodoPda, getUserPda } from "@/helpers/pda";
import { SystemProgram } from "@solana/web3.js";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

function UserTodos({}: Props) {
  const wallet = useWallet();
  const program = useTodoProgram();
  const userProfile = useFetchUser(wallet.publicKey?.toString()!);
  const userTodos = useFetchAllUserTodos(wallet.publicKey?.toString()!);

  const initializeUser = async () => {
    const tid = toast.loading("Pending txn");
    try {
      if (!wallet.publicKey) {
        toast.error("Invalid Public Key", { id: tid });
        throw new Error("Invalid Public Key");
      }
      const tx = await program.methods
        .initialize()
        .accounts({
          authority: wallet.publicKey!,
        })
        .rpc();
      console.log(`🚀 ~ file: UserTodos.tsx:33 ~ tx:`, tx);

      if (tx) {
        await userProfile.refetch();
        await toast.success("🎉 User registered successfully", { id: tid });
      } else {
        toast.error("Something went wrong", { id: tid });
      }
    } catch (error) {
      console.log(`🚀 ~ file: UserTodos.tsx:41 ~ error:`, error);
      toast.error("Something went wrong", { id: tid });

      // throw error;
    }
  };
  const handleAddTodo = async (
    content: string,
    cb?: (txhash: string, error?: string) => void
  ) => {
    try {
      if (!wallet.publicKey) {
        throw new Error("Invalid Public Key");
      }
      const { userProfilePda } = getUserPda(
        wallet.publicKey?.toString()!,
        program
      );
      const { todoBump, todoPda } = getTodoPda(
        wallet.publicKey?.toString()!,
        program,
        userProfile.data?.lastTodo || 0
      );
      const tx = await program.methods
        .addTodo(content)
        .accounts({
          userProfile: userProfilePda,
          todoAccount: todoPda,
          authority: wallet.publicKey!,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log(`🚀 ~ file: UserTodos.tsx:74 ~ tx:`, tx);

      if (tx) {
        cb && (await cb(tx));
        await userProfile.refetch();
        await userTodos.refetch();
      } else {
        cb && (await cb("", "Something went wrong"));
      }
    } catch (error) {
      console.log(`🚀 ~ file: UserTodos.tsx:84 ~ error:`, error);

      cb && (await cb("", "Something went wrong"));
      // throw error;
    }
  };

  const handleCheckTodo = async (
    idx: number,
    isChecked: boolean,
    cb?: (txhash: string, error?: string) => void
  ) => {
    try {
      if (!wallet.publicKey) {
        throw new Error("Invalid Public Key");
      }

      const { todoBump, todoPda } = getTodoPda(
        wallet.publicKey?.toString()!,
        program,
        idx
      );
      const tx = await program.methods
        .markTodo(idx, isChecked)
        .accounts({
          todoAccount: todoPda,
          authority: wallet.publicKey!,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log(`🚀 ~ file: UserTodos.tsx:114 ~ tx:`, tx);

      if (tx) {
        cb && (await cb(tx));
        // await userProfile.refetch();
        // await userTodos.refetch();
      } else {
        cb && (await cb("", "Something went wrong"));
      }
    } catch (error) {
      console.log(`🚀 ~ file: UserTodos.tsx:123 ~ error:`, error);

      cb && (await cb("", "Something went wrong"));
      // throw error;
    }
  };
  const handleDeleteTodo = async (
    idx: number,
    cb?: (txhash: string, error?: string) => void
  ) => {
    try {
      if (!wallet.publicKey) {
        throw new Error("Invalid Public Key");
      }

      const { todoPda } = getTodoPda(
        wallet.publicKey?.toString()!,
        program,
        idx
      );
      const tx = await program.methods
        .removeTodo(idx)
        .accounts({
          todoAccount: todoPda,
          authority: wallet.publicKey!,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log(`🚀 ~ file: UserTodos.tsx:152 ~ tx:`, tx);

      if (tx) {
        cb && (await cb(tx));
        // await userProfile.refetch();
        await userTodos.refetch();
      } else {
        cb && (await cb("", "Something went wrong"));
      }
    } catch (error) {
      console.log(`🚀 ~ file: UserTodos.tsx:162 ~ error:`, error);

      cb && (await cb("", "Something went wrong"));
      // throw error;
    }
  };
  const handleUpdateTodo = async (
    content: string,
    idx: number,
    cb?: (txhash: string, error?: string) => void
  ) => {
    try {
      if (!wallet.publicKey) {
        throw new Error("Invalid Public Key");
      }

      const { todoPda } = getTodoPda(
        wallet.publicKey?.toString()!,
        program,
        idx
      );

      const tx = await program.methods
        .editTodo(idx, content)
        .accounts({
          todoAccount: todoPda,
          authority: wallet.publicKey!,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log(`🚀 ~ file: UserTodos.tsx:192 ~ tx:`, tx);

      if (tx) {
        cb && (await cb(tx));
        // await userProfile.refetch();
        // await userTodos.refetch();
      } else {
        cb && (await cb("", "Something went wrong"));
      }
    } catch (error) {
      console.log(`🚀 ~ file: UserTodos.tsx:202 ~ error:`, error);
      cb && (await cb("", "Something went wrong"));
      // throw error;
    }
  };
  return (
    <div className="w-full flex flex-col items-center ">
      {wallet.publicKey && !userProfile?.data && userProfile.error && (
        <button className="btn" onClick={initializeUser}>
          Create account
        </button>
      )}

      {userProfile?.data && (
        <>
          <AddTodos handleAddTodo={handleAddTodo} />
          <AllUserTodos
            userTodosData={userTodos}
            handleCheckTodo={handleCheckTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
            isLoadingProp={
              userTodos?.isLoading ||
              userTodos?.isFetching ||
              userTodos?.isRefetching
            }
          />
        </>
      )}
      <Toaster />
    </div>
  );
}

export default UserTodos;
