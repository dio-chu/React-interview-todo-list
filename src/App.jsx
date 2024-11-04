import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import ChartPage from "./pages/ChartPage";

import "./styles/global.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
