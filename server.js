const express = require("express");
const app = express();
const PORT = 9000;

app.use(express.json());

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

app.get("/api/series", async (rqq, res) => {
  try {
    //fetch series from thee db

    const media = []; // resulting from the db

    if (!media.length) {
      return res.status(404).json({
        media,
        message: "Series not found 😞",
      });
    }
    res.status(200).json({
      media,
      message: "Series fetched succesfully 😎",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
});

app.get("/api/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Movie ID is required");

    const media = null;
    if (!media) {
      return res.status(404).json({
        media,
        message: `Movie with id ${id} not found`,
      });
    }
    res.status(200).json({
      media,
      message: `Movie with id ${id}  found`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

app.get("/api/series/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Series ID is required");

    const media = null;
    if (!media) {
      return res.status(404).json({
        media,
        message: `Series with id ${id} not found`,
      });
    }
    res.status(200).json({
      media: media,
      message: `Series with id ${id}  found`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

app.post("/api/add", async (req, res) => {
  try {
    if (!req.body) throw new Error("Media information required");

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

app.put("/api/series/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newPayloafd = req.body;

    console.log(newPayloafd);

    if (!id) throw new Error("Series id is required");
    if (!newPayloafd) throw new Error("New series data is required");

    const isEdited = 1; // result of edit
    if (!isEdited) {
      return res.status(404).json({
        message: `Series ${id} not edited`,
      });
    }
    res.status(200).json({
      message: `Series ${id} succesfully edited`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

app.put("/api/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newPayloafd = req.body;

    console.log(newPayloafd);

    if (!id) throw new Error("Movie id is required");
    if (!newPayloafd) throw new Error("New movie data is required");

    const isEdited = 1; // result of edit
    if (!isEdited) {
      return res.status(404).json({
        message: `Movie ${id} not edited`,
      });
    }
    res.status(200).json({
      message: `Movie ${id} succesfully edited`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

app.delete("/api/series/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Series id is required");

    const isDeleted = 0; // result of delete

    if (!isDeleted) {
      return res.status(404).json({
        message: `Series ${id} not deleted`,
      });
    }
    res.status(200).json({
      message: `Series ${id} succesfully deleted`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
});
app.delete("/api/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Movie id is required");

    const isDeleted = 1; // result of delete
    if (!isDeleted) {
      return res.status(404).json({
        message: `Movie ${id} not deleted`,
      });
    }
    res.status(200).json({
      message: `Movie ${id} succesfully deleted`,
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
