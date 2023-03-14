import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await window.api.send("heartbeat", {});
      console.log("[Heartbeat] Received from server: " + data);
    }, 5000);
    window.api.onAuthenticated(() => {
      console.log("[auth] Authenticated with local data");
      navigate("/dashboard/home");
    });
    window.api.onQr((_: any, value: string) => {
      console.log("QR Recieved from server");
      navigate("/login", { state: value });
    });
    return () => {
      clearInterval(interval);
      window.api.clearListeners("qr");
      window.api.clearListeners("authenticated");
    };
  }, [navigate]);
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h3>מכין את התוכנה</h3>
      <p>אנה המתן, יכול לקחת כמה שניות</p>
    </div>
  );
};

export default Start;
