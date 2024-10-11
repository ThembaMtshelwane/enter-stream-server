import express from "express";
const app = express();
import cors from "cors";
import seriesRouter from "./routes/seriesRoute.mjs";
import movieRouter from "./routes/movieRoute.mjs";

const PORT = 9000;
const corsOptions = {
  origin: "http://localhost:3000/",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/movie", movieRouter);
app.use("/api/series", seriesRouter);

app.get("/api/movies", async (req, res) => {
  try {
    // fetch the movies from the firebase db

    const movies = []; // the result of that fetching
    if (!movies.length) {
      return res.status(404).json({
        media: movies,
        message: "Movies not found 😞",
      });
    }

    res.status(200).json({
      media: movies,
      message: "Movies fetched succesfully 😎",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
});

app.post("/api/add", async (req, res) => {
  try {
    if (!req.body) throw new Error("Media informatiofrom  ");

    const isAdded = 1; // result of adding the new media in the db
    if (!isAdded) {
      return res.status(404).json({
        message: "Media no added",
      });
    }
    res.status(200).json({
      message: `${req.body.name} added succesfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
