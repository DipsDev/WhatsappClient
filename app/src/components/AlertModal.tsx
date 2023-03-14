import React from "react";
import { GoAlert } from "react-icons/go";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

interface ModalProps {
  commandToRun: string;
  formData: any;
  switchFn: any;
}

function AlertModal({ commandToRun, switchFn, formData }: ModalProps) {
  const handleClick = async () => {
    await window.api.send(commandToRun, formData);
    switchFn(false);
  };
  return (
    <motion.div
      animate={{
        opacity: 1,
        transition: {
          duration: 0.1,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.1,
        },
      }}
      initial={{ opacity: 0 }}
      className="absolute flex flex-row items-center justify-center inset-0 bg-black/40 z-30"
    >
      <div className="text-white text-right bg-background p-8 rounded-xl">
        <IconContext.Provider value={{ size: "34px" }}>
          <GoAlert className="mb-4" />
        </IconContext.Provider>
        <h2 className="text-xl font-extrabold">
          האם אתה בתוך שברצונך להריץ את הפונקציה?
        </h2>
        <p>
          הרצת הפונקציה יכולה לגרור להתנהגות לא צפויה, בדוק שהכנסת את כל הפרטים
          כראוי.
        </p>
        <div className="w-full text-white flex flex-row justify-start gap-5 items-center mt-16">
          <button
            onClick={handleClick}
            className="bg-accent hover:bg-[#59a86b] transition-colors rounded-md px-8 py-1"
          >
            הרץ פונקציה
          </button>
          <button
            className="border rounded-md hover:bg-[#edeeed] hover:text-black text-white transition-colors px-8 py-1"
            onClick={() => switchFn(false)}
          >
            חזור
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default AlertModal;
