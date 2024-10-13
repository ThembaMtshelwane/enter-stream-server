import express from "express";

const router = express.Router();

router.get("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

export default router;
