import { Outlet } from "react-router";
import { MainFooter } from "../../features/Common/MainFooter";
import { MainLeftSidebar } from "./MainLeftSideBar";
import { MainRightSideBar } from "./MainRightSideBar";

export function MainLayout() {
  return (
    <div className="h-dvh lg:grid lg:grid-cols-[200px_minmax(0,1fr)_300px]">
      <MainLeftSidebar />

      <div className="flex flex-col min-w-0 h-full">
        <Outlet />
        <MainFooter />
      </div>

      <MainRightSideBar />
    </div>
  );
}
