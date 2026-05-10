import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();

// Permite que el frontend (en otra URL) pueda llamar sin problemas
app.use(cors());
app.use(express.json());

// Render recomienda usar el puerto PORT y enlazar al host 0.0.0.0
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

// ===============================
// Endpoints existentes (NO TOCAR)
// ===============================

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

// ===============================
// Recurso REST: /usuarios
// Persistencia: archivo JSON
// ===============================

const dataPath = path.join(process.cwd(), "usuarios.json");

function leerUsuarios() {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
}

//  GET /usuarios → lista
app.get("/usuarios", (req, res) => {
  const usuarios = leerUsuarios();
  res.status(200).json(usuarios);
});

// GET /usuarios/:id → uno o 404
app.get("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const usuarios = leerUsuarios();

  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.status(200).json(usuario);
});

// ===============================

app.listen(PORT, HOST, () => {
  console.log(`Backend escuchando en http://${HOST}:${PORT}`);
});
