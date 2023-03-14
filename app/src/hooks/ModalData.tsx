import { createContext, useContext, useState } from "react";

interface ModalData {
  title: string;
  name: string;
  shown: boolean;
}

const ModalContext = createContext<ModalData>({
  title: "",
  name: "",
  shown: false,
});
const SetModalData = createContext((modal: ModalData) => {});

export const useModalData = (): [ModalData, (user: ModalData) => void] => {
  return [useContext(ModalContext), useContext(SetModalData)];
};

export function UserDataProvider({ children }: any) {
  const [data, setData] = useState<ModalData>({
    title: "",
    name: "",
    shown: false,
  });
  const updateModalData = (data: ModalData) => {
    setData(data);
  };

  return (
    <SetModalData.Provider value={updateModalData}>
      <ModalContext.Provider value={data}>{children}</ModalContext.Provider>
    </SetModalData.Provider>
  );
}
