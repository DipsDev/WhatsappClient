import React from "react";
import { BaseCommands } from "@/config";

interface Command {
  name: string;
  command_executer: string; // For example: ::echo abc
  description: string;
  id: string;
}

export default function Automation() {
  return (
    <>
      <div className="text-white font-main relative px-6">
        <div className="text-heading">
          <h1 className="text-3xl font-extrabold">פקודות ופעולות אוטומטיות</h1>
          <p className="text-lg">
            כאן תוכל לשנות פקודות קיימות, או להוסיף פקודות חדשות משלך.
          </p>
        </div>
        {/* Custom Commands */}
        <div className="mt-10 bg-primary p-10 rounded-md">
          <div className="flex flex-row justify-between items-start">
            <h2 className="text-2xl font-bold mb-10">פקודות מותאמות אישית</h2>
            <button className="bg-secondary px-5 py-2 font-semibold rounded hover:bg-primary-darker transition-colors">
              צור פקודה חדשה
            </button>
          </div>
          <div className="flex flex-col justify-center gap-5">
            <p>אין פקודות מותאמות אישית, כאשר תוסיף פקודות הן יחכו לך כאן.</p>
          </div>
        </div>
        {/* Default Commands */}
        <div className="mt-10 bg-primary p-10 rounded-md">
          <h2 className="text-2xl font-bold mb-10">פקודות בנויות</h2>
          <div className="flex flex-col justify-center gap-5">
            {BaseCommands.map((v: Command, index: number) => {
              return (
                <div
                  key={`$basecommand.${v.id}.${index}`}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xl font-semibold">{v.name}</h4>
                    <p className="text-gray-200">{v.description}</p>
                  </div>
                  <div>
                    <p className="text-xl text-accent font-semibold" dir="ltr">
                      {v.command_executer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
