import express from "express";
import cors from "cors";

const app = express();

// Permite que el frontend (en otra URL) pueda llamar sin problemas
app.use(cors());
app.use(express.json());

// Render recomienda usar el puerto PORT y enlazar al host 0.0.0.0
const PORT = process.env.PORT || 3000; // en Render suele ser 10000 si no se define [1](https://render.com/docs/web-services)
const HOST = "0.0.0.0";

app.get("/", (req, res) => {
  res.type("text").send("OK - Hola Backend (raíz)");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "hola-backend" });
});

app.get("/api/hola", (req, res) => {
  res.json({
    mensaje: "Hola Mundo desde el BACKEND",
    endpoint: "/api/hola",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Backend escuchando en http://${HOST}:${PORT}`);
});