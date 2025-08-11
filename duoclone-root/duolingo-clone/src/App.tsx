import { useEffect, useRef, useState } from "react";
import "./App.css";
import { LearnHeader } from "./components/Header/LearnHeader";
import { SectionHeader } from "./components/Unit/SectionHeader";
import { UnitPath } from "./components/Unit/UnitPath";
import { useUnitObserver } from "./util/UnitObserver";
import { LessonsPage } from "./pages/LessonsPage";

function App() {

  return (
    <>
      <div className="w-dvw h-dvh flex flex-col overflow-auto bg-duoBackground">
        <LessonsPage/>
      </div>
    </>
  );
}

export default App;
