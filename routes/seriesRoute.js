import express from "express";
import { Series } from "../models/seriesModel.js";

const router = express.Router();

router.get("/", async (rqq, res) => {
  try {
    //fetch series from thee db

    const media = await Series.getAllSeries(); // resulting from the db
    console.log(media);

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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Series ID is required");

    const media = await Series.getSeriesById(id);
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

router.post("/", async (req, res) => {
  try {
    if (!req.body) throw new Error("Series informatiofrom needed");
    const isAdded = await Series.addSeries(req.body);
    if (!isAdded) {
      return res.status(404).json({
        message: "No series added",
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

router.put("/:id", async (req, res) => {
  try {
    const newPayload = req.body;
    if (!newPayload) throw new Error("New series data is required");

    const isEdited = await Series.updateSeriesById(newPayload);
    if (!isEdited) {
      return res.status(404).json({
        message: `Series ${newPayload.id} not edited`,
      });
    }
    res.status(200).json({
      message: `Series ${newPayload.id} succesfully edited`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Series id is required");

    const isDeleted = await Series.delete(id);

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

export default router;
