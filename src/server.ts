import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: {
            "tmdb_api_key_available": process.env.TMDB_API_KEY !== undefined,
            "tmdb_access_token_available": process.env.TMDB_ACCESS_TOKEN !== undefined
        },
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers
    });
});

app.post("/fetch-from-tmdb", async (req: Request, res: Response) => {
    const { url }: { url: string } = req.body;
    const newUrl = url.includes("?") ? `${url}&api_key=${process.env.TMDB_API_KEY}` : `${url}?api_key=${process.env.TMDB_API_KEY}`;
    console.log(newUrl);
    const response = await fetch(newUrl);
    const resJson = await response.json();
    res.json(resJson);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
