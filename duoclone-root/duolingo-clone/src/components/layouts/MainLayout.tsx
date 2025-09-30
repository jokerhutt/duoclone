import { Outlet } from "react-router";
import { MainFooter } from "../../features/Common/MainFooter";
import { MainLeftSidebar } from "./MainLeftSideBar";
import { MainRightSideBar } from "./MainRightSideBar";

export function MainLayout() {
  return (
    <>
      <div className="min-h-dvh h-dvh scrollbar-duoGreen max-h-dvh lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] overflow-y-auto ">
        <MainLeftSidebar />

        <div className="flex flex-col lg:px-16 items-end min-w-0">
          <Outlet />
        </div>
        <MainFooter />
        <MainRightSideBar />
      </div>
    </>
  );
}
