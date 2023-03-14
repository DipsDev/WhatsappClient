import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import tw from "tailwind-styled-components";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { HiTemplate } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useUserData } from "@/hooks/UserData";

interface SideBarProps {
  $selected: boolean;
}

const Title = tw.h1`
font-logo
text-2xl
italic
text-white
py-5
px-7
w-full

`;
// ${(p) => (p.$primary ? "bg-indigo-600" : "bg-indigo-300")}
const SidebarLink = tw.li<SideBarProps>`
${(p) => (p.$selected ? "text-accent" : "hover:text-white")}
flex 
flex-row 
items-center 
gap-4 
w-full
transition-colors
py-2
px-3
my-2
rounded

cursor-pointer
`;

const Sidebar = () => {
  const section = useLocation();
  const navigate = useNavigate();
  const [currentData, setUserData] = useUserData();
  useEffect(() => {
    let tm: NodeJS.Timeout;
    async function fetchData() {
      const d = await window.api.send("get-current-data", {});
      if (d) {
        setUserData(d);
      } else {
        tm = setTimeout(async () => {
          setUserData(await window.api.send("get-current-data", {}));
        }, 250);
      }
    }
    fetchData();
    return () => {
      if (tm) {
        clearTimeout(tm);
      }
    };
  }, [currentData]);

  const chosen = section.pathname; // home
  const englishNames = ["home", "automation", "templates"];

  const names = ["מסך הבית", "אוטומציה", "טמפלייטים"];
  const icons = [<AiOutlineHome />, <HiOutlineCommandLine />, <HiTemplate />];

  const handleLogout = () => {
    toast
      .promise(window.api.send("logout", {}), {
        loading: "מתנתק",
        success: <b>הקליינט התנתק בהצלחה</b>,
        error: <b>ההתנתקות נכשלה</b>,
      })
      .then(() => {
        navigate("/");
      });
  };
  return (
    <div
      className="bg-primary max-w-[200px] w-full h-screen flex flex-col items-start z-30"
      style={{
        borderLeft: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <div className="w-full flex flex-col items-center h-full">
        <div>
          <Title>Dips Client</Title>
        </div>

        <div className="flex flex-col w-full h-[85%] items-start justify-between">
          <div className=" text-zinc-400 p-7 font-main text-md font-medium self-start w-full">
            {names.map((v, i) => {
              let href = `/dashboard/${englishNames[i]}`;
              return (
                <Link key={i} to={href} className="w-full">
                  <SidebarLink key={i + v} $selected={href === chosen}>
                    {icons[i]}
                    {v}
                  </SidebarLink>
                </Link>
              );
            })}
          </div>
          <div>
            <div className="flex items-center mr-2 justify-center gap-4 mb-7 text-white">
              <img
                className="w-8 rounded-full"
                src={currentData.url ? currentData.url : ""}
              />
              <p>
                {currentData.name ? currentData.name : "טוען פרטי משתמש..."}
              </p>
            </div>
            <div
              onClick={handleLogout}
              className="flex flex-row cursor-pointer text-md group items-center justify-start px-7 gap-4 w-full  font-semibold mb-5  text-white font-main"
            >
              <div className="bg-secondary p-3 rounded-full transition-colors group-hover:bg-primary-darker ">
                <BiLogOut className="text-white group-hover:text-accent" />
              </div>
              <p className="group-hover:text-accent">התנתק</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
