import {
  ClientCategories,
  ClientFunctions,
  FormTypes,
  ClientFunction,
} from "@/config";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import WAWebJS from "whatsapp-web.js";
import tw from "tailwind-styled-components";
import Modal from "@/components/AlertModal";

const Alert = tw.p`
text-red-500
mr-2
text-sm
`;

function getCategoryInHebrew(category: string) {
  for (let i = 0; i < ClientCategories.length; i++) {
    if (ClientCategories[i].english == category)
      return ClientCategories[i].hebrew;
  }
}

function getFunction(functionId: string): ClientFunction | undefined {
  for (let i = 0; i < ClientFunctions.length; i++) {
    if (ClientFunctions[i].id == functionId) return ClientFunctions[i];
  }
  return undefined;
}

function Commands() {
  const [userGroups, setUserGroups] = useState([]);
  const [formData, setFormData] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const { functionId } = useParams();
  const currFn = getFunction(functionId as string) as ClientFunction;

  const onSubmit: SubmitHandler<any> = (data) => {
    setModalActive(true);
    setFormData(data);
  };

  useEffect(() => {
    async function fetchGroups() {
      const d = await window.api.send("get-groups", {});
      setUserGroups(d);
    }
    fetchGroups();
  }, []);

  return (
    <>
      {modalActive ? (
        <Modal
          switchFn={setModalActive}
          commandToRun={currFn.id}
          formData={formData}
        />
      ) : (
        ""
      )}
      <div className="bg-background w-full h-full flex flex-row text-white relative">
        <div className="h-full w-full">
          <div className="p-6">
            {" "}
            <p className=" text-base font-thin text-accent-second">
              {getCategoryInHebrew(category as string)}
            </p>
            <h1 className="text-3xl font-extrabold text-heading">
              {currFn.label}
            </h1>
            <p className="mt-2 text-gray-200">{currFn.description}</p>
          </div>
          <div className="h-full w-full flex flex-row justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-start h-3/4 w-full justify-between"
            >
              <div
                style={{
                  gridRowGap: "40px",
                }}
                className="w-full grid items-center grid-rows-4 grid-cols-4 grid-flow-col h-3/4"
              >
                {Object.keys(currFn.formFields.data).map(function (key, index) {
                  if (
                    currFn.formFields.data[key] === FormTypes.Number ||
                    currFn.formFields.data[key] === FormTypes.Text
                  )
                    return (
                      <div
                        style={{
                          width: "min(100%, 310px)",
                        }}
                        key={key}
                        className="px-6 flex flex-col items-start"
                      >
                        <label
                          className="text-heading flex flex-row items-center justify-start"
                          htmlFor={key}
                        >
                          {currFn.formFields.translatedLabels[index]}{" "}
                          {errors[key]?.type === "required" && (
                            <Alert role="alert" className="text-xl">
                              *
                            </Alert>
                          )}
                        </label>
                        <input
                          {...register(key, { required: true })}
                          name={key}
                          style={{
                            border: "1px solid rgba(255, 255, 255, 0.18)",
                          }}
                          className="w-full text-gray-400 focus:text-white bg-secondary px-2 rounded-sm py-[6px] mt-2 outline-none focus:ring-[0.7px] ring-accent-second"
                          type={currFn.formFields.data[key]}
                        ></input>
                      </div>
                    );
                  if (currFn.formFields.data[key] === FormTypes.Textarea) {
                    return (
                      <div
                        style={{
                          width: "min(100%, 310px)",
                        }}
                        key={key}
                        className="px-6 flex flex-col items-start"
                      >
                        <label
                          className="text-heading flex flex-row items-center justify-start"
                          htmlFor={key}
                        >
                          {currFn.formFields.translatedLabels[index]}{" "}
                          {errors[key]?.type === "required" && (
                            <Alert role="alert" className="text-xl">
                              *
                            </Alert>
                          )}
                        </label>
                        <textarea
                          style={{
                            border: "1px solid rgba(255, 255, 255, 0.18)",
                          }}
                          {...register(key, { required: true })}
                          className="text-gray-400 focus:text-white bg-secondary  min-h-[100px] w-full px-2 py-[6px] mt-2 rounded-sm focus:ring-[0.7px] ring-accent-second outline-none"
                        ></textarea>
                      </div>
                    );
                  } else {
                    const options = [];
                    for (let i = 0; i < userGroups.length; i++) {
                      options.push({
                        name: (userGroups[i] as WAWebJS.GroupChat).name,
                        value: (userGroups[i] as WAWebJS.GroupChat).id
                          ._serialized,
                      });
                    }
                    if (userGroups.length === 0) {
                      return (
                        <p key={key} className="w-full px-6">
                          טוען קבוצות...
                        </p>
                      );
                    }
                    return (
                      <div
                        style={{
                          width: "min(100%, 310px)",
                        }}
                        key={key}
                        className="px-6 flex flex-col items-start"
                      >
                        <label
                          className="text-heading flex flex-row items-center justify-start"
                          htmlFor={key}
                        >
                          {currFn.formFields.translatedLabels[index]}{" "}
                        </label>
                        <select
                          style={{
                            border: "1px solid rgba(255, 255, 255, 0.18)",
                          }}
                          {...register(key, { required: true })}
                          className="text-gray-400 focus:text-white bg-secondary w-full px-2  py-[6px] mt-2 rounded-sm focus:ring-[0.7px] ring-accent-second outline-none"
                        >
                          {userGroups.map((v: WAWebJS.GroupChat, i) => {
                            return (
                              <option key={i} value={v.id._serialized}>
                                {v.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    );
                  }
                })}
              </div>
              <input
                type="submit"
                value="הרץ פונקציה"
                className="mr-6 px-7 py-[6px] bg-white rounded-md text-background font-bold hover:bg-gray-300 cursor-pointer"
              ></input>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Commands;
