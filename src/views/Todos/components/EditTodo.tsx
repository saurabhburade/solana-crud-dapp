"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  defaultContent: string;
  idx: number;
  handleUpdateTodo: (
    content: string,
    idx: number,
    cb?: (txhash: string, error?: string) => void
  ) => void;
  refetch: () => void;
};

function EditTodo({ defaultContent, idx, handleUpdateTodo, refetch }: Props) {
  const [content, setContent] = useState(defaultContent);

  return (
    <div>
      <button
        className="btn btn-square btn-sm"
        onClick={() =>
          (
            document.getElementById(
              `edit_todo_modal__${idx}`
            ) as HTMLDialogElement
          )?.showModal()
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          <path d="m15 5 4 4" />
        </svg>
      </button>

      <dialog id={`edit_todo_modal__${idx}`} className="modal backdrop-blur">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-5">
            <p>Edit todo</p>
            <button
              className="btn btn-square btn-sm"
              onClick={() =>
                (
                  document.getElementById(
                    `edit_todo_modal__${idx}`
                  ) as HTMLDialogElement
                )?.close()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className=" flex flex-col gap-3">
            <input
              className="input input-bordered w-full"
              placeholder="Type something here ...."
              onChange={(e) => {
                setContent(e.target.value);
              }}
              value={content}
              maxLength={64}
            />
            <button
              className="btn  "
              onClick={() => {
                if (content?.trim() !== "") {
                  const tid = toast.loading("Pending Txn");
                  try {
                    handleUpdateTodo(
                      content,
                      idx,
                      async (txHash: string, error?: string) => {
                        if (!txHash || error) {
                          toast.error("Something went wrong", {
                            id: tid,
                          });
                        } else {
                          await refetch();
                          await (
                            document.getElementById(
                              `edit_todo_modal__${idx}`
                            ) as HTMLDialogElement
                          )?.close();
                          await toast.success("🎉 Todo updated", {
                            id: tid,
                          });
                        }
                      }
                    );
                  } catch (error) {
                    toast.error("Something went wrong", {
                      id: tid,
                    });
                  }
                }
              }}
            >
              Update
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <Toaster />
      </dialog>
    </div>
  );
}

export default EditTodo;
