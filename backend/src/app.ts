import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const origin =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://orbital-eye-1z9n.vercel.app";

app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
