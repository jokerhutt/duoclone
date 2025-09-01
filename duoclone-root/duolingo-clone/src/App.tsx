import "./App.css";
import { LessonsPage } from "./pages/LessonsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Lesson } from "./Lesson/Lesson";

function App() {

  return (
    <Router>
      <div className="w-dvw h-dvh flex flex-col overflow-auto bg-duoBackground">
        <Routes>
          <Route path="" element={<LessonsPage/>}/>
          <Route path="lesson" element={<Lesson/>}/>
        </Routes>
      </div>
      </Router>
  );
}

export default App;
