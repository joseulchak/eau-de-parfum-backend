import { Router } from "express";
import v1 from "./v1";
const router = Router();

router.use(function timeLog(req, res, next) {
  console.log("Time: ", new Date());
  next();
});

router.get("/", (req, res) => {
  res.status(200).send("Eau de Parfum | by Geicy Meira");
});

router.get("/about", (req, res) => {
  res.status(200).send("under construction");
});

router.use("/api/v1", v1);

export default router;
