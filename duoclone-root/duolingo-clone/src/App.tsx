import "./App.css";
import { SectionPage } from "./features/Section/SectionPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LessonPage } from "./features/Lesson/LessonPage";
import { LessonCompletePage } from "./features/Lesson/LessonCompletePage";

function App() {
  return (
    <Router>
      <div className="w-dvw h-dvh flex flex-col overflow-auto bg-duoBackground">
        <Routes>
          <Route path="" element={<SectionPage />} />
          <Route path="/lessons/:lessonId/:position" element={<LessonPage />} />
          <Route
            path="/lessons/:lessonId/complete"
            element={<LessonCompletePage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
