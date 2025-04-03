import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Server running" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
