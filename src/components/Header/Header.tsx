"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

import React, { useEffect } from "react";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
type Props = {};

function Header({}: Props) {
  useEffect(() => {}, []);
  return (
    <div className="flex justify-between container mx-auto p-4 items-center">
      <div className="flex items-center gap-2">
        <Image src={"/sol-logo.png"} width={30} height={30} alt="solana" />
        <p className="font-extrabold">TODO App</p>
      </div>
      <div>
        <WalletMultiButtonDynamic />
      </div>
    </div>
  );
}

export default Header;
