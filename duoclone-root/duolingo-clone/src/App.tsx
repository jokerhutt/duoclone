import "./App.css";
import { SectionPage } from "./features/Section/pages/SectionPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Lesson } from "./Lesson/Lesson";
import { LessonPage } from "./features/Lesson/pages/LessonPage";

function App() {
  return (
    <Router>
      <div className="w-dvw h-dvh flex flex-col overflow-auto bg-duoBackground">
        <Routes>
          <Route path="" element={<SectionPage />} />
          <Route path="/lessons/:lessonId/:position" element={<LessonPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
