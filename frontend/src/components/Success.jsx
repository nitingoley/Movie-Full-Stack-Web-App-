import React, { useEffect, useState } from 'react'
import Confetti from "react-confetti";
import {useWindowSize} from "react-use";
import {useNavigate} from "react-router-dom";
export default function Success() {
    const {width , height} = useWindowSize();
    const [showConfetti,  setShowConfetti] = useState(true);
    const navigate = useNavigate();


    useEffect(()=>{
        const timer = setTimeout(()=> setShowConfetti(false),6000);
        return ()=> clearTimeout(timer);
    },[]);


  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-green-100 text-gray-800'>
        {showConfetti && <Confetti width={width} height={height} />}
        <div className='p-6 rounded-lg shadow-lg text-center max-w-md'>
            <h1 className='text-4xl font-bold text-green-600 mb-4'>
                Success!
            </h1>
            <p className='text-lg text-gray-600 mb-4'>
                Your payment was processed successfully.
            </p>
            <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white w-full rounded-lg text-2xl py-2"
        >
          Go Back to Home
        </button>
        </div>
    </div>
  )
}
