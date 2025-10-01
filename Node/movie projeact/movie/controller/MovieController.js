const Movie = require("../model/MovieSchema");

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const addRating = async (req, res) => {
    const { rating } = req.body;
    if (rating < 0 || rating > 10) {
      return res.status(400).json({ error: "Invalid rating value" });
    }
  
    try {
      const { id } = req.params;
      const movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
  
      movie.ratings.push({ "value":rating });
  
      const updatedMovie = await movie.save();
      console.log("Movie updated", updatedMovie,"reqbody", req.body);
      
        res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


const addComment = async (req, res) => {
  const { text } = req.body;

  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    movie.comments.push({ text });
    const updatedMovie = await movie.save();
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getFilteredMovies = async (req, res) => {
    const { title, addedBy, releaseDate, category } = req.query;
    console.log("query",req.query);
    

    
    let filter = {};
    
    if (title) {
      filter.title =  title;
    }
    if (addedBy) {
      filter.addedBy = addedBy;
    }
    if (releaseDate) {
      filter.releaseDate = releaseDate;
    }
    if (category) {
      filter.category = category;
    }
    console.log([filter]);
    
    // return res.send([filter])
  
    try {
      const movies = await Movie.find(filter);
      res.status(200).json(movies);
    } catch (err) {
      console.log(err);
      
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  addRating,
  addComment,
  getFilteredMovies,
};
