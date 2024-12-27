import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IdeaSubmission from "./pages/IdeaSubmission";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import Layout from "./components/shared/Layout";
import IdeaReport from "./pages/Report";
import SingleIdea from "./pages/SingleIdea";
import ProfileChange from "./pages/Profile";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfileChange />} />
          <Route path="/submit-idea" element={<IdeaSubmission />} />
          <Route path="/reports" element={<IdeaReport />} />
          <Route path="/idea/:ideaId" element={<SingleIdea />} />
          <Route path="*" element={<NotFound />} />{" "}
        </Routes>
      </Layout>
      <Toaster
        position="bottom-right-corner"
        reverseOrder={false}
        toastOptions={{ style: { background: "#183B56", color: "white" } }}
      />
    </Router>
  );
}

export default App;
