import { Routes, Route } from "react-router-dom";

import Index from "./pages";
import Login from "./pages/login";

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Index />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
