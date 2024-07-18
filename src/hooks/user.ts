import { useWallet } from "@solana/wallet-adapter-react";
import { useAnchorProvider } from "./solana-provider";
import * as anchor from "@coral-xyz/anchor";
import * as solanaWeb3 from "@solana/web3.js";
import * as TODO_IDL from "@/configs/idl/todo.json";
import { TodoProg } from "@/configs/idl/todoprog";
import { useQuery } from "@tanstack/react-query";
import { getUserPda } from "@/helpers/pda";

export const authorFilter = (authorBase58PublicKey: any) => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey,
  },
});
export const useFetchUser = (account: string) => {
  //   const wallet = useWallet();
  const provider = useAnchorProvider();
  const program = new anchor.Program(TODO_IDL as TodoProg, provider);
  const { userProfilePda, userProfileBump } = getUserPda(account, program);

  const { data, error, refetch, ...others } = useQuery({
    queryKey: ["useFetchUser", account],
    queryFn: async () => {
      const d = await program.account.userProfile.fetch(userProfilePda!);
      return d;
    },
    enabled: !!userProfilePda && !!userProfileBump,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  return { data, error, refetch, ...others };
};
