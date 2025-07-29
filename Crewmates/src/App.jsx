import { Routes, Route, Link } from "react-router-dom";
import SummaryPage from "./pages/SummaryPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";

export default function App() {
  return (
    <div>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/">Summary</Link> | <Link to="/create">Create</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SummaryPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/crewmate/:id" element={<DetailPage />} />
        <Route path="/crewmate/:id/edit" element={<EditPage />} />
      </Routes>
    </div>
  );
}
