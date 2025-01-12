import asyncHandler from "../middleware/asyncHandler.js";
import Genre from "../model/Genre.js";

export const genreCreate = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const existingGenre = await Genre.findOne({ name });

    if (existingGenre) {
      return res.status(400).json({ message: "Genre already existed !" });
    }

    const genre = await new Genre({ name }).save();
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export const genreUpdate = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const genre = await Genre.findOne({ _id: id });

    if (!genre) {
      return res.status(400).json({ message: "not found " });
    }

    genre.name = name;

    const updateGenre = await genre.save();
    res.json(updateGenre);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export const genreRemove = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const remove = await Genre.findByIdAndDelete(id);

    if (!remove) {
      return res.status(400).json({ message: "not found " });
    }

    res.json(remove);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export const allGenres = asyncHandler(async (req, res) => {
  try {
    const all = await Genre.find({});
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export const readGenre = asyncHandler(async (req, res) => {
  try {
    const genre = await Genre.findById({ _id: req.params.id });
    res.json(genre);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
