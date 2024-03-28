import express from "express";

const usuarioRoteador = express.Router();

usuarioRoteador.get("/", (req, res) => {
  res.send("LER!");
});

usuarioRoteador.get("/lista", (req, res) => {
  res.send("LER TODOS!");
});

usuarioRoteador.post("/", (req, res) => {
  res.send("CRIAR!");
});

usuarioRoteador.put("/", (req, res) => {
  res.send("EDITAR!");
});

export default usuarioRoteador;
