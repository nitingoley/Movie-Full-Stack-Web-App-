import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useAddMovieReviewMutation,
  useGetSpecificMovieQuery,
} from "../../redux/api/movies";
import { MovieTabs } from "./MovieTabs";

export const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  //  const [rating , setRating] = useState(0);
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();



    const submitHandler = async(e)=>{
        e.preventDefault();

        try {
            await createReview({
                id: movieId,
                rating,
                comment,
            }).unwrap();
            refetch();

            toast.success("Review created successfully");
        } catch (error) {
            toast.error(error.data || error.message);
        }
    }

  return (
    <>
      <div>
        <Link
          to={"/"}
          className="text-white font-semibold hover:underline ml-[20rem]"
        >
          Go Back
        </Link>
      </div>

      <div className="mt-[2rem]">
        <div className="flex justify-center items-center">
          <img
            src={movie?.image}
            alt={movie?.name}
            className="w-[70%] rounded h-[65rem]"
          />
        </div>

        <div className="container flex justify-between ml-[20rem] mt-[3rem]">
          <section>
            <h2 className="text-5xl my-4 font-extrabold">{movie?.name}</h2>
            <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
              {movie?.details}
            </p>
          </section>

          <div className="mr-[5rem]">
            <p className="text-2xl font-semibold">
              Releasing Date: {movie?.year}
            </p>

            <div>
              {movie?.cast.map((x) => (
                <ul key={x._id}>
                  <li className="mt-[1rem]">{x}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="container ml-[20rem]">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment= {setComment}
            movie ={movie}
          />
        </div>
      </div>
    </>
  );
};
