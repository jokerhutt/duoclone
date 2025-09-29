import { Outlet } from "react-router";
import { MainFooter } from "../../features/Common/MainFooter";

export function MainLayout() {
  return (
    <>
      
      <Outlet />
      <MainFooter />
    </>
  );
}
