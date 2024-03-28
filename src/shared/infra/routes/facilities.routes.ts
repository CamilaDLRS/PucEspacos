import express from "express";

const facilityRouter = express.Router();

facilityRouter.get("/", (req, res) => {
  res.send("READ!");
});

facilityRouter.get("/list", (req, res) => {
  res.send("READ ALL!");
});

facilityRouter.post("/", (req, res) => {
  res.send("CREATE!");
});

facilityRouter.put("/", (req, res) => {
  res.send("EDIT!");
});

export default facilityRouter;
