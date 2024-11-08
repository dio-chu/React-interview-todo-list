import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import ChartPage from "./pages/ChartPage";
import LanguageToggle from "./components/features/LanguageToggle";

import "./styles/global.scss";

function App() {
  return (
    <Router basename="/React-interview-todo-list">
      <div className="app-container">
        <div className="language-toggle-container">
          <LanguageToggle />
        </div>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="/chart" element={<ChartPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
