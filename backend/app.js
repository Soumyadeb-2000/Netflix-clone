import express from "express";
import authRouter from "./routes/auth.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.listen(ENV_VARS.PORT, () => {
    console.log("server up");
    connectDB();
})