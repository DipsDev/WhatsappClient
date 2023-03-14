import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { ClientFunctions } from "@/config";
import { Link } from "react-router-dom";

interface GroupProps {
  label: string;
  englishLabel: string;
}

export default function GroupSection({ label, englishLabel }: GroupProps) {
  const [isOpen, setOpen] = useState(false);
  const functions = ClientFunctions.filter((v) => v.catg === englishLabel);
  return (
    <div className="bg-primary p-5 font-bold rounded-md ">
      <div
        className="w-full group  flex flex-row items-start justify-between cursor-pointer "
        onClick={() => setOpen(!isOpen)}
      >
        <h2 className="text-2xl mb-5 transition-colors group-hover:text-accent">
          {label}
        </h2>
        <motion.span
          animate={!isOpen ? { rotate: 0 } : { rotate: 180 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          <IoIosArrowDown className="text-xl" />
        </motion.span>
      </div>
      <motion.div layout className=" grid grid-cols-3 gap-6">
        {isOpen &&
          functions.map((v, i) => {
            return (
              <Link
                key={`${i}-function`}
                to={`/commands/${v.id}?category=${v.catg}`}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={
                    isOpen
                      ? { opacity: 1, transition: { delay: 0.1 } }
                      : { opacity: 0 }
                  }
                  exit={{ opacity: 0, transition: { duration: 0.02 } }}
                  className="bg-secondary border border-transparent hover:border-accent rounded-md p-10 cursor-pointer"
                >
                  <h3 className="text-xl text-accent-second">{v.label}</h3>
                  <p className="mt-2 text-gray-300 font-medium">
                    {v.description}
                  </p>
                </motion.div>
              </Link>
            );
          })}
      </motion.div>
    </div>
  );
}
