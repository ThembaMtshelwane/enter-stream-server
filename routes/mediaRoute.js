import express from "express";
import { MediaData } from "../models/mediaDataModel.js";

const router = express.Router();

router.get("/", async (rqq, res) => {
  try {
    //fetch mediaData from thee db

    const media = await MediaData.getAllMediaData(); // resulting from the db
    console.log(media);

    if (!media.length) {
      return res.status(404).json({
        media,
        message: "Media Data not found 😞",
      });
    }
    res.status(200).json({
      media,
      message: "Media Data fetched succesfully 😎",
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
    if (!id) throw new Error("Media Data ID is required");

    const media = await MediaData.getMediaDataById(id);
    if (!media) {
      return res.status(404).json({
        media,
        message: `Media Data with id ${id} not found`,
      });
    }
    res.status(200).json({
      media: media,
      message: `Media Data with id ${id}  found`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body) throw new Error("Media Data informatiofrom needed");
    const isAdded = await MediaData.addMediaData(req.body);
    if (!isAdded) {
      return res.status(404).json({
        message: "No media Data added",
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
    if (!newPayload) throw new Error("New media Data data is required");

    const isEdited = await MediaData.updateMediaDataById(newPayload);
    if (!isEdited) {
      return res.status(404).json({
        message: `Media Data ${newPayload.id} not edited`,
      });
    }
    res.status(200).json({
      message: `Media Data ${newPayload.id} succesfully edited`,
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
    if (!id) throw new Error("Media Data id is required");

    const isDeleted = await MediaData.delete(id);

    if (!isDeleted) {
      return res.status(404).json({
        message: `Media Data ${id} not deleted`,
      });
    }
    res.status(200).json({
      message: `Media Data ${id} succesfully deleted`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

export default router;
