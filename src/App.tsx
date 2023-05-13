import { Routes, Route } from "react-router-dom";

import Index from "./pages";
import Login from "./pages/login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
