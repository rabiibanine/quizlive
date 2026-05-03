import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SharingPage from "./pages/SharingPage";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sharing/:code" element={<SharingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
