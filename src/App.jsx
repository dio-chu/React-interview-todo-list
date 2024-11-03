import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import ChartPage from "./pages/ChartPage";

function App() {
  return (
    <Router>
      <div>
        <Link to="/" className="hover:text-blue-500">
          Todo List
        </Link>
      </div>
      <div>
        <Link to="/chart" className="hover:text-blue-500">
          Chart
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
