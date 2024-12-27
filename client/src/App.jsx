import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/shared/Layout";
import ProtectedRoute from "./components/ProtectedRoutes";
import ErrorBoundary from "./components/shared/ErrorBoundary"; // Error Boundary

// Lazy Loading Components
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ProfileChange = lazy(() => import("./pages/Profile"));
const IdeaSubmission = lazy(() => import("./pages/IdeaSubmission"));
const IdeaReport = lazy(() => import("./pages/Report"));
const SingleIdea = lazy(() => import("./pages/SingleIdea"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileChange />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/submit-idea"
                element={
                  <ProtectedRoute>
                    <IdeaSubmission />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <IdeaReport />
                  </ProtectedRoute>
                }
              />
              <Route path="/idea/:ideaId" element={<SingleIdea />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{ style: { background: "#183B56", color: "white" } }}
        />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
