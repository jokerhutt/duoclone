import "./App.css";
import { SectionPage } from "./features/SectionPath/SectionPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LessonPage } from "./features/Lesson/LessonSession/LessonPage.tsx";
import { LessonCompletePage } from "./features/Lesson/LessonComplete/LessonCompletePage.tsx";
import { QuestsPage } from "./features/Quests/QuestsPage";
import { MainLayout } from "./components/layouts/MainLayout";
import { ProfilePage } from "./features/Profile/ProfilePage";
import { LeaderboardPage } from "./features/Leaderboard/LeaderboardPage";
import { FriendsPage } from "./features/Profile/FriendsPage";
import { CoursesPage } from "./features/Courses/CoursesPage";
import { LearnHeaderLayout } from "./components/layouts/LearnHeaderLayout";
import { LoginPage } from "./features/Auth/LoginPage";
import { GOOGLE_CLIENT_ID } from "./constants/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthGuard } from "./features/Auth/AuthGuard";
import { AvatarPage } from "./features/Profile/Avatar/AvatarPage";

function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div className="w-dvw h-dvh flex flex-col overflow-auto bg-duoBackground">
          <Routes>
            <Route path="/auth" element={<LoginPage />} />

            <Route element={<AuthGuard />}>
              <Route element={<MainLayout />}>
                <Route element={<LearnHeaderLayout />}>
                  <Route path="" element={<SectionPage />} />
                  <Route
                    path="/profile/:userId/friends"
                    element={<FriendsPage />}
                  />
                  <Route
                    path="/courses"
                    element={<CoursesPage title="All Languages" />}
                  />
                  <Route
                    path="/courses/:userId"
                    element={<CoursesPage title="Languages" />}
                  />
                </Route>
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/quests" element={<QuestsPage />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/avatar" element={<AvatarPage />} />
              </Route>

              <Route
                path="/auth/courses"
                element={<CoursesPage title="Choose your first language" />}
              />

              <Route
                path="/lessons/:lessonId/:position"
                element={<LessonPage />}
              />
              <Route
                path="/lessons/:lessonId/complete"
                element={<LessonCompletePage />}
              />
            </Route>
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
