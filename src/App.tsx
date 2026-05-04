import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SharingPage from "./pages/SharingPage";
import Podium from "./pages/Podium";
import NotFound from "./pages/NotFound";
import QuizForm from "./pages/QuizForm";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz-form" element={<QuizForm />} />
      <Route path="/sharing/:code" element={<SharingPage />} />
      <Route path="quiz/:code/podium" element={<Podium />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
