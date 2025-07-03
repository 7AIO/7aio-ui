import { useState } from "react";
import { Navbar } from "~/components/navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <>
      <Navbar authenticated={isLoggedIn} />
      {children}
    </>
  );
}
