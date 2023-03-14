import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.png";

const Login = () => {
  const { state } = useLocation();
  const [qrcode, setqrcode] = useState(state);

  const navigate = useNavigate();
  useEffect(() => {
    window.api.onQr((_: any, value: string) => {
      toast("קוד הברקוד התעדכן", {
        icon: "🤠",
      });
      setqrcode(value);
    });
    window.api.onReady(() => {
      navigate("/dashboard/home");
    });
    return () => {
      window.api.clearListeners("qr");
      window.api.clearListeners("authenticated");
    };
  }, [navigate]);

  return (
    <div
      className="bg-fixed w-full h-full relative z-0 bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1628965882741-570e75becd5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
      }}
    >
      <div className="h-full z-0 relative flex flex-col items-center justify-evenly bg-[#0D0C0F]/95">
        <div className="flex flex-col items-center justify-center">
          <img src={logo} width="150px" />
          <p className="text-gray-300 ">מערכת ווצאפ משוכללת</p>
        </div>
        <div className="p-0.5 rounded">
          <div
            className=" flex flex-col items-center justify-center bg-black/10 shadow-lg p-8 rounded"
            style={{
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              backdropFilter: "blur(9.5px)",
              WebkitBackdropFilter: "blur(9.5px)",
            }}
          >
            <h2 className="text-white text-2xl font-main font-bold">
              היכנס עם קוד הברקוד
            </h2>
            <p className="text-lg text-gray-300 font-main font-light">
              פתח את הווצאפ במכשיר הטלפון, וסרוק את הברקוד המופיע על המסך.
            </p>
            <a
              href="https://faq.whatsapp.com/1079327266110265/?cms_platform=android"
              target="_blank"
              className="text-sm mt-2 text-gray-300 mb-16  font-main font-light"
            >
              להסבר מלא לחץ כאן
            </a>
            <div className="p-2 bg-white rounded-sm">
              {qrcode ? (
                <QRCodeSVG size={300} value={qrcode} />
              ) : (
                <h1>טוען ברקוד, אנא המתן</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
