import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetAllMoviesQuery,
  useGetNewMovieQuery,
  useGetRandomMovieQuery,
  useGetTopMovieQuery,
} from "../../redux/api/movies";
import { MovieCard } from "./MovieCard";
import banner from "../../assets/banner.jpg";
import {
  setFilterMovies,
  setMoviesYear,
  setUniqueYears,
  setMoviesFilter,
} from "../../redux/features/movies/movieSlice";

export const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovie } = useGetNewMovieQuery();
  const { data: randomMovie } = useGetRandomMovieQuery();
  const { data: topMovies } = useGetTopMovieQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);
  const movieYear = data?.map((movie) => movie.year);
  const uniqueYear = Array.from(new Set(movieYear));

  useEffect(() => {
    if (data) {
      dispatch(setFilterMovies(data || []));
      dispatch(setMoviesYear(movieYear));
      dispatch(setUniqueYears(uniqueYear));
    }
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    dispatch(setMoviesFilter({ searchTerm }));
    const filtered = data.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(setFilterMovies(filtered));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilterMovies(filterByGenre));
  };

  const handleYearClick = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilterMovies(filterByYear));
  };

  const handleSortClick = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilterMovies(newMovie));
        break;
      case "top":
        dispatch(setFilterMovies(topMovies));
        break;
      case "random":
        dispatch(setFilterMovies(randomMovie));
        break;
      default:
        dispatch(setFilterMovies([]));
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
      <section>
        <div
          className="relative h-[50rem] w-screen mb-10 flex items-center justify-center bg-cover"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>
          <div className="relative z-10 text-center text-white mt-[10rem]">
            <h1 className="text-8xl font-bold mb-4">The Movies Hub</h1>
            <p className="text-2xl">
              Cinematic Odyssey: Unveiling the magic of Movies
            </p>
          </div>
          <section className="absolute -bottom-[5rem]">
            <input
              type="text"
              className="w-[100%] h-[5rem] border px-10 outline-none rounded"
              placeholder="Search Movie"
              value={moviesFilter.searchTerm}
              onChange={handleSearchChange}
            />
            <section className="sorts-container mt-[2rem] ml-[10rem] w-[30rem]">
              <select
                className="border p-2 rounded text-black mr-2"
                value={moviesFilter?.selectedGenre || ""}
                onChange={(e) => handleGenreClick(e.target.value)}
              >
                <option value="">Genres</option>
                {genres?.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>
              <select
                className="border p-2 rounded text-black mr-2"
                value={moviesFilter?.selectedYear || ""}
                onChange={(e) => handleYearClick(e.target.value)}
              >
                <option value="">Year</option>
                {uniqueYear?.map((year) => (
                  <option value={year} key={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                value={moviesFilter?.selectedSort }
                className="border p-2 rounded text-black mr-2"
                onChange={(e) => handleSortClick(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="new">Sort New</option>
                <option value="top">Sort Top</option>
                <option value="random">Sort Random</option>
              </select>
            </section>
          </section>
        </div>
        <section className="mt-[10rem] w-screen flex justify-center items-center flex-wrap">
          {filteredMovies?.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </section>
      </section>
    </div>
  );
};
