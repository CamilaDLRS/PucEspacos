import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("READ!");
});

userRouter.get("/list", (req, res) => {
  res.send("READ ALL!");
});

userRouter.post("/", (req, res) => {
  res.send("CREATE!");
});

userRouter.put("/", (req, res) => {
  res.send("EDIT!");
});

export default userRouter;
