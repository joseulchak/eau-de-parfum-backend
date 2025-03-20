"use strict";
import express from "express";
import routes from "./routes";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import { errorMiddleware } from "./utils/error.middleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

app.use(routes);
app.use(errorMiddleware);
app.listen(3000, () => console.log("Server ready on port 3000!."));

export default app;
