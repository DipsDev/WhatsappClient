import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { VscChromeMinimize } from "react-icons/vsc";
import { IconContext } from "react-icons";

function TitleBar() {
  const handleMinimize = async () => {
    await window.api.send("minimize-window", {});
  };

  const handleClose = async () => {
    await window.api.send("close-window", {});
  };
  return (
    <div
      className="w-full titlebar flex items-center justify-start z-50 relative gap-2 bg-[#1c1717] text-gray-400"
      style={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
        backdropFilter: "blur(9.5px)",
        WebkitBackdropFilter: "blur(9.5px)",
      }}
    >
      <div
        onClick={handleClose}
        className="p-3 titlebar-button cursor-pointer hover:bg-red-700 hover:text-white"
      >
        <IconContext.Provider value={{ size: "20px" }}>
          <IoCloseOutline />
        </IconContext.Provider>
      </div>

      <div
        onClick={handleMinimize}
        className="hover:text-white cursor-pointer titlebar-button hover:bg-[#161414] p-3"
      >
        <VscChromeMinimize />
      </div>
    </div>
  );
}

export default TitleBar;
