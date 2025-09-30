import { Outlet } from "react-router";
import { MainFooter } from "../../features/Common/MainFooter";
import { MainLeftSidebar } from "./MainLeftSideBar";
import { MainRightSideBar } from "./MainRightSideBar";

export function MainLayout() {
  return (
    <>
      <div className="min-h-dvh h-dvh max-h-dvh lg:grid overflow-y-auto lg:grid-cols-[280px_minmax(0,1fr)_400px]">
        <MainLeftSidebar />

        <div className="flex flex-col items-center min-w-0">
          <Outlet />
        </div>
        <MainFooter />
        <MainRightSideBar />
      </div>
    </>
  );
}
