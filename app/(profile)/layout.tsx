import React, { ReactNode } from "react";
import Navbar from "../../components/navbar";
import AccountProvider from "../../providers/AccountProvider";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <AccountProvider>{children}</AccountProvider>
    </div>
  );
};

export default layout;
