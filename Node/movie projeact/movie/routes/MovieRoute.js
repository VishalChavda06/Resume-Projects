const {Router} = require("express");
const { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie, addRating, addComment, getFilteredMovies } = require("../controller/MovieController");


const MovieRoute =Router();
MovieRoute.get("/filter", getFilteredMovies);
MovieRoute.get("/test",(req,res)=>{
    res.send("Hello from Test Route")
});
MovieRoute.post("/create",  createMovie);
MovieRoute.get("/", getAllMovies);
MovieRoute.get("/:id", getMovieById);
MovieRoute.patch("/update/:id", updateMovie);
MovieRoute.delete("/delete/:id", deleteMovie);
MovieRoute.patch("/rating/:id", addRating);
MovieRoute.patch("/comment/:id", addComment);


module.exports = MovieRoute;
