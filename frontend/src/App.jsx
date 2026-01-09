import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateQuiz from "./pages/CreateQuiz";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateQuiz />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
