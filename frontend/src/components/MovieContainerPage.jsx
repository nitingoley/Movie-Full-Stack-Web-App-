import React, { useState } from 'react'
import { useGetNewMovieQuery, useGetRandomMovieQuery, useGetTopMovieQuery } from "../redux/api/movies";
import { useFetchGenresQuery } from "../redux/api/genre";
import { SliderUtil } from './SliderUtil';

export const MovieContainerPage = () => {
    const {data} = useGetNewMovieQuery();
    const {data: topMovie} = useGetTopMovieQuery();
    const {data: randomMovie} = useGetRandomMovieQuery();
    const {data: genres} = useFetchGenresQuery();
    const [selectedGenre , setSelectedGenre] = useState(null);


    const handleGenreClick = (genreId)=>{
        setSelectedGenre(genreId)
    }


    const filteredMovies = data?.filter((movie)=> selectedGenre === null || movie.genre === selectedGenre)
  return (
     <div className='flex flex-col lg:flex-row lg:justify-between items-center'>
        <nav className='ml-[4rem] flex flex-row xl:flex-col md:flex-row sm:flex-row'>
        {genres?.map((g)=>(
            <button className={`ml-[4rem] flex flex-row xl:flex-col md:flex-row sm:flex-row text-lg  ${
            selectedGenre === g._id ? "bg-gray-200" : ""
           }`}
            key={g._id}
            onClick={()=> handleGenreClick(g._id)}
           >
            {g.name}      
            </button>
        ))}
        </nav>


        <section
        className='flex flex-col justify-center items-center w-full lg:w-auto'
        >
            <div className='w-full lg:w-[100rem] mb-8'>
                <h1 className='mb-5 font-bold text-white text-2xl'>
                    Choose For you
                </h1>
                <SliderUtil data={randomMovie} />
            </div>
          
          <div className='w-full lg:w-[100rem] mb-8'>
          <h1 className='mb-5 font-bold text-white text-2xl'>
                Top Movies</h1>
            <SliderUtil data={topMovie} />
          </div>


        <div className='w-full lg:w-[100rem] mb-8'>
        <h1 className='mb-5 font-bold text-white text-2xl'>
            Choose Movie</h1>
         <SliderUtil data={filteredMovies} />
        </div>   

        </section>     
     </div>
  )
}
