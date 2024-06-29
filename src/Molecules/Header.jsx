import React from "react";
import Image from "./Image";
import { STRINGS } from "../Strings/Strings";
import { LOGO_URL } from "../Constants/Constant";

// header component
export default function Header() {
  return (
    <header className="App-header d-flex justify-content-center">
      <Image url={LOGO_URL} />
      <h5 className="header-typo">{STRINGS.CRYPTO_MARKET}</h5>
    </header>
  );
}
