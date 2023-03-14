import { createContext, useContext, useState } from "react";

interface UserData {
  url: string;
  name: string;
}

const UserContext = createContext<UserData>({
  url: "",
  name: "",
});
const SetUserData = createContext((user: UserData) => {});

export const useUserData = (): [UserData, (user: UserData) => void] => {
  return [useContext(UserContext), useContext(SetUserData)];
};

export function UserDataProvider({ children }: any) {
  const [data, setData] = useState<UserData>({
    url: "",
    name: "",
  });
  const updateUserData = (user: UserData) => {
    setData(user);
  };

  return (
    <SetUserData.Provider value={updateUserData}>
      <UserContext.Provider value={data}>{children}</UserContext.Provider>
    </SetUserData.Provider>
  );
}
