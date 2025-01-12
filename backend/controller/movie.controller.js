import Movie from "../model/Movies.js";

export const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSpificMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const specificMovie = await Movie.findById(id);

    if (!specificMovie) {
      return res.status(404).json("Movie not found");
    }

    res.json(specificMovie);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUpdateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovies = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovies) {
      return res.status(404).json("Movie not found");
    }

    res.json(updatedMovies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const MovieReview = async (req, res) => {
  try {
  const {rating , comment} = req.body;
  const movie = await Movie.findById(req.params.id);

  if(movie) {
    const alreadyReviewed  = movie.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if(alreadyReviewed) {
      return res.status(400).json("Movie already reviewed");
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id
    };


    movie.reviews.push(review);
    movie.numReview = movie.reviews.length;
    movie.rating = 
     movie.reviews.reduce((acc , item)=> item.rating + acc , 0)/ 
     movie.reviews.length;
     await movie.save();
     return res.status(200).json({ message: "Review Added" });
  }else {
    return res.status(404).json("Movie not found.");
  }
   
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: "Internal server error" });  
  }
};


export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovie = await Movie.findByIdAndDelete(id);

    if (!deleteMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const DeleteComment = async (req, res) => {
//   try {
//     const { movieId, reviewId } = req.body;

//     const movie = await Movie.findById(movieId);

//     if (!movie) {
//       return res.status(404).json({ message: "Movie not found" });
//     }

//     const reviewIndex = movie.reviews.findIndex(
//       (r) => r._id.toString() === reviewId
//     );

//     if (reviewIndex === -1) {
//       return res.status(404).json({ message: "Comment not found." });
//     }

//     movie.reviews.splice(reviewIndex, 1);
//     movie.numReview = movie.reviews.length;
//     movie.rating =
//       movie.reviews.length > 0
//         ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
//           movie.reviews.length
//         : 0;

//     await movie.save();
//     res.json({ message: "Comment deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


export const DeleteComment = async(req , res)=>{
 try {
  const {movieId , reviewId} = req.body;

  // Input validation
  if (!movieId || !reviewId) {
   return res.status(400).json({ message: "Movie ID and Review ID are required." });
 }
 
 const movie = await Movie.findById(movieId);
 
 if (!movie) {
   return res.status(404).json({ message: "Movie not found." });
 }

 const reviewIndex = movie.reviews.findIndex(
   (r)=> r._id.toString() === reviewId.toString()
 );

 if(reviewIndex === -1) {
   return res.status(404).json({ message: "Comment not found." });
 }

 movie.reviews.splice(reviewIndex , 1);
 movie.numReview = movie.reviews.length;

 movie.rating = movie.reviews.length > 0
 ? movie.reviews.reduce((acc , item)=> item.rating + acc , 0) / movie.reviews.length : 0;

 await movie.save();
 res.json({ message: "Comment deleted successfully" });
 } catch (error) {
  console.error("Error deleting comment:", error);
  res.status(500).json({ message: "Internal server error." });
 }
}
export const getNewMovies = async (req, res) => {
  try {
    const lastetMovie = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(lastetMovie);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTopMovie = async (req, res) => {
  try {
    const topRatedMovies = await Movie.find().sort({ numReview: -1 }).limit(10);
    res.json(topRatedMovies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRandomMovies = async (req, res) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.json(randomMovies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
