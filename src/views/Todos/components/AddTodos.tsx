"use client";
import { useTodoProgram } from "@/hooks/todos";
import { useFetchUser } from "@/hooks/user";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  handleAddTodo: (
    content: string,
    cb: (txhash: string, error?: string) => void
  ) => void;
};

function AddTodos({ handleAddTodo }: Props) {
  const [content, setContent] = useState("");

  return (
    <div className="w-full my-5 flex justify-center">
      <div className="  lg:w-1/2 flex justify-center">
        <div className="join w-full flex justify-center ">
          <input
            className="input input-bordered join-item  w-full"
            placeholder="Type something here ...."
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
            maxLength={64}
          />
          <button
            className="btn join-item "
            onClick={() => {
              if (content?.trim() !== "") {
                const tid = toast.loading("Pending Txn");
                try {
                  handleAddTodo(
                    content,
                    async (txhash: string, error?: string) => {
                      if (error || !txhash) {
                        toast.error("Something went wrong", {
                          id: tid,
                        });
                      } else {
                        await setContent("");
                        toast.success("🎉 Todo Added", {
                          id: tid,
                        });
                      }
                    }
                  );
                } catch (error) {
                  toast.error("Something went wrong", {
                    id: tid,
                  });
                  return;
                }
              }
            }}
          >
            Add todo
          </button>
        </div>
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default AddTodos;
