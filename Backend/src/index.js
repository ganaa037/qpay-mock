import express from "express";
import QRCode from "qrcode";
import cors from "cors";
import { WebSocketServer } from "ws";

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const qr = await QRCode.toDataURL("https://www.google.com");

  res.send(qr);
});

const server = app.listen(8000, () => {
  console.log(`server running at http://localhost:8000`);
});

const ws = new WebSocketServer({ server });

ws.on("connection", (socket) => {
  console.log("connected");

  socket.on("message", (values) => {
    const sms = JSON.parse(values);
    console.log(sms, "values");
  });
  socket.send(JSON.stringify({ message: "hi" }));
});
