import { Outlet } from "react-router";
import { Navigation } from "~/components/nav";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation authenticated={false} />
      {children}
    </>
  );
}