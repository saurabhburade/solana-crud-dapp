import { useAnchorProvider } from "./solana-provider";
import * as anchor from "@coral-xyz/anchor";
import * as TODO_IDL from "@/configs/idl/todo.json";
import { TodoProg } from "@/configs/idl/todoprog";
import { useQuery } from "@tanstack/react-query";
import { getTodoPda } from "@/helpers/pda";

export const authorFilter = (authorBase58PublicKey: any) => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey,
  },
});
export const useFetchAllUserTodos = (account: string) => {
  //   const wallet = useWallet();
  const provider = useAnchorProvider();
  const program = new anchor.Program(TODO_IDL as TodoProg, provider);
  const { data, error, refetch, ...others } = useQuery({
    queryKey: ["useFetchAllUserTodos", account],
    queryFn: async () => {
      const d = await program.account.todoAccount.all([authorFilter(account)]);
      return d;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  return { data, error, refetch, ...others };
};
export const useFetchSingleTodo = (account: string, index: number) => {
  //   const wallet = useWallet();
  const provider = useAnchorProvider();
  const program = new anchor.Program(TODO_IDL as TodoProg, provider);
  const { todoPda } = getTodoPda(account, program, index);

  const { data, error, refetch, ...others } = useQuery({
    queryKey: ["useFetchSingleTodo", account, index],
    queryFn: async () => {
      const d = await program.account.todoAccount.fetch(todoPda!);
      return d;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });
  return { data, error, refetch, ...others };
};
export const useTodoProgram = () => {
  const provider = useAnchorProvider();
  const program = new anchor.Program(TODO_IDL as TodoProg, provider);
  return program;
};
