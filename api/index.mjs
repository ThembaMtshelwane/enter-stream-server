import express from "express";
const app = express();
import cors from "cors";

import seriesRouter from "../routes/seriesRoute.js";
import movieRouter from "../routes/movieRoute.js";

const PORT = 9000;
const corsOptions = {
  origin: "http://localhost:3000",
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

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

export default app;