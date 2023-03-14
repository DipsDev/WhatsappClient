import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Start from "./pages/LoadingScreen";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/SideBar";
import TitleBar from "./components/TitleBar";
import { UserDataProvider } from "./hooks/UserData";
import Commands from "./pages/Commands";

function App() {
  return (
    <HashRouter>
      <UserDataProvider>
        <div className="App font-main w-full h-full">
          <Toaster />
          <TitleBar />
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard/*"
              element={
                <div className="flex w-full h-full flex-row items-start justify-start">
                  <Sidebar />
                  <Dashboard />
                </div>
              }
            />
            <Route
              path="/commands/:functionId"
              element={
                <div className="flex w-full h-full flex-row items-start justify-start">
                  <Sidebar />
                  <Commands />
                </div>
              }
            />
          </Routes>
        </div>
      </UserDataProvider>
    </HashRouter>
  );
}

export default App;
