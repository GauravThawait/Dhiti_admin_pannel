import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Allblogs from "../src/pages/blog/Allblog";
import Createblog from "./pages/blog/Createblog";
import Readblog from "./pages/blog/Readblog";
import Createform from "./pages/Form/Createform";
import Login from "./pages/Login";
import NavBar from "./pages/NavBar";
import Createproject from "./pages/projects/Createproject";
import Allproject from "./pages/projects/Allproject";
import Readproject from "./pages/projects/Readproject";
import Home from "./pages/Home";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/Login" replace />;
}

function App() {
  
  return (
    <div>
      <NavBar/>

      <Routes>
        <Route
          path="/Createblog"
          element={<ProtectedRoute><Createblog /></ProtectedRoute>}
        />
        <Route
          path="/"
          element={<ProtectedRoute><Home/>></ProtectedRoute>}
        />
        <Route path="/Blogs" element={<ProtectedRoute><Allblogs /></ProtectedRoute>} />

        <Route
          path="/Readblog/:slug"
          element={<ProtectedRoute><Readblog /></ProtectedRoute>}
        />

        <Route
          path="/Project"
          element={<ProtectedRoute><Allproject/></ProtectedRoute>}
        />
        <Route
          path="/project/Createproject"
          element={<ProtectedRoute><Createproject/></ProtectedRoute>}
        />
        <Route
          path="/project/Readproject/:slug"
          element={<ProtectedRoute><Readproject/></ProtectedRoute>}
        />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
