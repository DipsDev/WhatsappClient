import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";
import Automation from "./pages/Automation";
import Templates from "../Templates/Templates";

export default function Dashboard() {
  return (
    <>
      <AnimatePresence>
        <div
          key={"routes"}
          className="w-full top-0 h-full bottom-0 left-0 text-green z-0  bg-background overflow-y-scroll"
        >
          <div className="mt-7">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/automation" element={<Automation />} />
              <Route path="/templates" element={<Templates />} />
            </Routes>
          </div>
        </div>
      </AnimatePresence>
    </>
  );
}
