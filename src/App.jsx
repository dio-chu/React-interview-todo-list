import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import ChartPage from "./pages/ChartPage";
import LanguageToggle from "./components/features/LanguageToggle";

import "./styles/global.scss";

function App() {
  return (
    <Router>
      <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <LanguageToggle />
      </div>

      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
