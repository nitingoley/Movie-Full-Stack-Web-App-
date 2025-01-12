import { apiSlice } from "./apiSlice";
import { MOVIE_URL, UPLOAD_URL } from "../constant";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `${MOVIE_URL}/all-movies`,
    }),
    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${MOVIE_URL}/create-movie`,
        method: "POST",
        body: newMovie,
      }),
    }),
    updateMovie: builder.mutation({
      query: ({ id, updateMovie }) => ({
        url: `${MOVIE_URL}/update-movie/${id}`,
        method: "PUT",
        body: updateMovie,
      }),
    }),
    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/reviews`,
        method: "POST",
        body: { rating, id, comment },
      }),
    }),
    deleteComment: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/delete-comment`,
        method: "DELETE",
        body: { movieId, reviewId },
      }),
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/delete-movie/${id}`,
        method: "DELETE",
      }),
    }),
    getSpecificMovie: builder.query({
      query: (id) => `${MOVIE_URL}/specific-movie/${id}`,
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
    getNewMovie: builder.query({
      query: () => `${MOVIE_URL}/get-lastest`,
    }),
    getRandomMovie: builder.query({
      query: () => `${MOVIE_URL}/random-movies`,
    }),
    getTopMovie: builder.query({
      query: () => `${MOVIE_URL}/top-movies`,
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useAddMovieReviewMutation,
  useDeleteMovieMutation,
  useGetSpecificMovieQuery,
  useDeleteCommentMutation,
  useGetNewMovieQuery,
  useGetRandomMovieQuery,
  useGetTopMovieQuery,
  useUploadImageMutation,
} = moviesApiSlice;
