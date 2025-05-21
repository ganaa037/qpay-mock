"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [qr, setQr] = useState("");
  const generateQrCode = async () => {
    const res = await axios.get("http://localhost:8000");
    setQr(res.data);
  };

  useEffect(() => {
    const ws = new WebSocket("ws:localhost:8000");
    ws.onopen = () => {
      ws.send(JSON.stringify({ message: "hello" }));
    };
    console.log(ws, "hello");
    ws.onmessage = (event) => {
      console.log(event, "event");
    };
  }, []);
  return (
    <div>
      <button onClick={generateQrCode}>pay</button>
      {qr && <img src={qr} alt="qr" />}
    </div>
  );
}
