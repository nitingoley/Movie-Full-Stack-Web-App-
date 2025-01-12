import React from "react";
import {
  useGetAllMoviesQuery,
  useGetTopMovieQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";
import {} from "../../../../redux/api/genre";
import { SecondaryCard } from "./SecondaryCard";
import { VideoCard } from "./VideoCard";
import { RealTimeCard } from "./RealTimeCard";

export const Main = () => {
  const { data: topMovie } = useGetTopMovieQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReview);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );
  return (
    <div>
      <section className="flex justify-around">
        <div className="ml-[14rem] mt-10">
          <div className="-translate-x-4 flex">
            <SecondaryCard
              pill="User"
              content={visitors?.length}
              info="20.2k or more then usual"
              gradient="from-teal-500 to-lime-400"
            />

            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="722k or more then usual"
              gradient="from-[#CCC514] to-lime-400"
            />

            <SecondaryCard
              pill="User"
              content={allMovies?.length}
              info="20.2k or more then usual"
              gradient="from-green-500 to-lime-400"
            />
          </div>

          <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
            <p>Top Comments</p>
            <p>Comments</p>
          </div>

          {topMovie?.map((t)=>(
            <VideoCard 
              key={t._id}
              image= {t.image}
              date = {t.year}
              comment= {t.numReview}
            />
          ))}
        </div> 

        <div>
          <RealTimeCard />
        </div>
      </section>
    </div>
  );
};
