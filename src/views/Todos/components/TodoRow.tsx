import { useWallet } from "@solana/wallet-adapter-react";
import EditTodo from "./EditTodo";
import { useFetchSingleTodo, useTodoProgram } from "@/hooks/todos";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { Todo } from "@/types/todo";

interface Props extends Todo {
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
}
const TodoRow = ({
  content,
  checked,
  idx,
  handleCheckTodo,
  handleDeleteTodo,
  handleUpdateTodo,
  isLoadingProp,
}: Props) => {
  const wallet = useWallet();
  const { data, error, refetch, isLoading, isRefetching, isFetching } =
    useFetchSingleTodo(wallet?.publicKey?.toString()!, idx);

  const memTodoData = useMemo(() => {
    if (data) {
      return {
        content: data?.content,
        checked: data?.checked,
        idx: data?.idx,
        isLoading: isLoading || isRefetching || isFetching,
      };
    }
    return { content, checked, idx, isLoading: isLoadingProp };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, isLoadingProp, isRefetching, isFetching]);

  const onCheck = (isChecked: boolean) => {
    const tid = toast.loading("Pending Txn");
    try {
      handleCheckTodo(
        idx,
        isChecked,
        async (txHash: string, error?: string) => {
          if (!txHash || error) {
            toast.error("Something went wrong", {
              id: tid,
            });
          } else {
            await refetch();
            toast.success("🎉 Todo completed", {
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
  };
  if (memTodoData?.isLoading) {
    return (
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
    );
  }
  return (
    <div className="p-5 bg-base-100 my-2 rounded-2xl grid grid-cols-[3fr_1fr] lg:w-1/2 items-center">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="checkbox checkbox-sm rounded opacity-75"
          checked={memTodoData?.checked}
          onChange={(e) => {
            e.preventDefault();
            onCheck(e.target.checked);
          }}
        />

        <p className="opacity-70">{memTodoData?.content}</p>
      </div>
      <div className="flex justify-end items-center gap-3">
        <button
          className="btn btn-square btn-sm"
          onClick={() => {
            const tid = toast.loading("Pending Txn");
            try {
              handleDeleteTodo(
                memTodoData?.idx,
                (txHash: string, error?: string) => {
                  if (!txHash || error) {
                    toast.error("Something went wrong", {
                      id: tid,
                    });
                  } else {
                    toast.success("🎉 Todo Deleted", {
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
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
        <EditTodo
          defaultContent={memTodoData?.content}
          idx={idx}
          handleUpdateTodo={handleUpdateTodo}
          refetch={refetch}
        />
      </div>
    </div>
  );
};
export default TodoRow;
