import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePoll from "./components/CreatePoll";
import PollRoom from "./components/PollRoom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePoll />} />
        <Route path="/poll/:id" element={<PollRoom />} />
      </Routes>
    </BrowserRouter>
  );
}
