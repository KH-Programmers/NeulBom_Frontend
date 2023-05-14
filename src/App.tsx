import { Routes, Route } from "react-router-dom";

import Index from "./pages";
import Login from "./pages/login";
import React from "react";
import Layout from "./components/layout";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Layout>
  );
}
