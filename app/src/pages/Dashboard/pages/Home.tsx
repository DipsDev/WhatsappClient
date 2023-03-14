import React from "react";
import { ClientCategories } from "@/config";
import GroupSection from "../GroupSection";
export default function Home() {
  return (
    <>
      <div className="text-white font-main relative">
        <div className="px-6 text-heading">
          <h1 className="text-3xl font-extrabold">גלריית הפעולות</h1>
          <p className="text-lg">כל הפעולות שיש לתוכנה להציע מוצגים כאן.</p>
        </div>
        <div className="flex flex-col justify-start gap-20 p-6">
          {ClientCategories.map((v, i) => {
            return (
              <GroupSection
                key={`${i}-groupsection`}
                englishLabel={v.english}
                label={v.hebrew}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
