import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Internships from "./pages/Internships";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AnimatedCursor from "react-animated-cursor";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminApplications from "./pages/AdminApplications";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-dvh text-gray-900 bg-gradient-to-br from-purple-50 via-white to-indigo-50 transition-colors duration-500">
          <AnimatedCursor
            innerSize={8}
            outerSize={35}
            color="168,85,247"
            outerAlpha={0.25}
            innerScale={0.7}
            outerScale={2}
            trailingSpeed={4}
            clickables={["a", "button", ".cursorable"]}
          />

          <Navbar />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6">
            <Sidebar />

            <main className="flex-1 py-6">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Page>
                        <Home />
                      </Page>
                    }
                  />

                  <Route
                    path="/auth"
                    element={
                      <Page>
                        <Auth />
                      </Page>
                    }
                  />

                  <Route
                    path="/dashboard"
                    element={
                      <Page>
                        <Dashboard />
                      </Page>
                    }
                  />

                  <Route
                    path="/internships"
                    element={
                      <Page>
                        <Internships />
                      </Page>
                    }
                  />

<Route
  path="/admin/applications"
  element={
    <RequireAdmin>
      <AdminApplications />
    </RequireAdmin>
  }
/>


                  <Route
                    path="/profile"
                    element={
                      <Page>
                        <RequireAuth>
                          <Profile />
                        </RequireAuth>
                      </Page>
                    }
                  />

                  <Route
                    path="/admin"
                    element={
                      <Page>
                        <RequireAdmin>
                          <Admin />
                        </RequireAdmin>
                      </Page>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

/* ---------- AUTH GUARDS ---------- */

function RequireAdmin({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

/* ---------- PAGE TRANSITION ---------- */

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

export default App;
