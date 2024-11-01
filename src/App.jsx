import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import ChartPage from "./pages/ChartPage";

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4">
        <nav className="mb-4 p-4 border-b">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-500">
                Todo List
              </Link>
            </li>
            <li>
              <Link to="/chart" className="hover:text-blue-500">
                Chart
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
