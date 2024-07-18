import { PROGRAM_ID, TODO_TAG_STR, USER_TAG_STR } from "@/configs/constant";
import { Program } from "@coral-xyz/anchor";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { PublicKey } from "@solana/web3.js";

export const getUserPda = (account: string, program: any) => {
  try {
    const pubkey = new PublicKey(account);
    const [userProfilePda, userProfileBump] = PublicKey.findProgramAddressSync(
      [utf8.encode(USER_TAG_STR), pubkey.toBuffer()],
      program.programId
    );
    return { userProfilePda, userProfileBump };
  } catch (error) {
    return {};
  }
};

export const getTodoPda = (account: string, program: any, index: number) => {
  try {
    const pubkey = new PublicKey(account);

    const [todoPda, todoBump] = PublicKey.findProgramAddressSync(
      [
        utf8.encode(TODO_TAG_STR),
        pubkey.toBuffer(),
        Buffer.from(index.toString()),
      ],
      program.programId
    );
    return { todoPda, todoBump };
  } catch (error) {
    return {};
  }
};
