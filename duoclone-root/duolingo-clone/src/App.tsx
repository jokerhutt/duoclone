import "./App.css";
import { SectionPage } from "./features/Section/SectionPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LessonPage } from "./features/Lesson/LessonPage";
import { LessonCompletePage } from "./features/Lesson/LessonCompletePage";
import { QuestsPage } from "./features/Quests/QuestsPage";
import { MainLayout } from "./components/layouts/MainLayout";
import { ProfilePage } from "./features/Profile/ProfilePage";
import { LeaderboardPage } from "./features/Leaderboard/LeaderboardPage";
import { FriendsPage } from "./features/Profile/FriendsPage";
import { CoursesPage } from "./features/Langs/CoursesPage";
import { LearnHeaderLayout } from "./components/layouts/LearnHeaderLayout";

function App() {
  return (
    <Router>
      <div className="w-dvw h-dvh flex flex-col overflow-auto bg-duoBackground">
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<LearnHeaderLayout />}>
              <Route path="" element={<SectionPage />} />
              <Route
                path="/profile/:userId/friends"
                element={<FriendsPage />}
              />
              <Route path="/courses" element={<CoursesPage />} />
            </Route>
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/quests" element={<QuestsPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Route>

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
