import dotenv from "dotenv";

dotenv.config();

export const  ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS
}