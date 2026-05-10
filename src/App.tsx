import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SharingPage from "./pages/SharingPage";
import Podium from "./pages/Podium";
import NotFound from "./pages/NotFound";
import HostQuizForm from "./pages/HostQuizForm";
import QuizEditorPage from "./pages/QuizEditorPage";
import JoinQuiz from "./pages/JoinQuiz";
import HostQuiz from "./pages/HostQuiz";
import StudentQuiz from "./pages/StudentQuiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz-form" element={<HostQuizForm />} />
      <Route path="/quiz-editor" element={<QuizEditorPage />} />
      <Route path="/start" element={<HostQuizForm />} />
      <Route path="/join" element={<JoinQuiz />} />
      <Route path="/sharing/:code" element={<SharingPage />} />
      <Route path="/quiz/:code/podium" element={<Podium />} />
      <Route path="/quiz/:code/host" element={<HostQuiz />} />
      <Route path="/quiz/:code" element={<StudentQuiz />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
