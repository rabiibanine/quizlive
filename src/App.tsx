import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SharingPage from "./pages/SharingPage";
import Podium from "./pages/Podium";
import { QuizEditorPage } from "./pages/QuizEditorPage/QuizEditorPage";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sharing/:code" element={<SharingPage />} />
      <Route path="/quiz/:code/podium" element={<Podium />} />
      <Route path="/create-edit-quiz" element={<QuizEditorPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
