export const BASE_URL = import.meta.MODE === "development" ?  "http://localhost:3000/api" : "/api";
export const USERS_URL = `${BASE_URL}/api/v1/users`;
export const GENRE_URL = `${BASE_URL}/api/v1/genre`;
export const MOVIE_URL = `${BASE_URL}/api/v1/movies`;
export const UPLOAD_URL = `${BASE_URL}/api/v1/upload`;
