import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        message: {
            tmdb_api_key_available: process.env.TMDB_API_KEY !== undefined,
            tmdb_access_token_available:
                process.env.TMDB_ACCESS_TOKEN !== undefined,
        },
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
    });
});

app.post("/fetch-from-tmdb", async (req, res) => {
    const { url } = req.body;
    const newUrl = url.includes("?")
        ? `${url}&api_key=${process.env.TMDB_API_KEY}`
        : `${url}?api_key=${process.env.TMDB_API_KEY}`;
    try {
        const response = await fetch(newUrl);
        const resJson = await response.json();
        res.json(resJson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch data from TMDB" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
