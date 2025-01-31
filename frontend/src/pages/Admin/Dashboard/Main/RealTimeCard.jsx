import React from 'react';
import { useGetUsersQuery } from "../../../../redux/api/users";
import { PrimaryCard } from './PrimaryCard';
import { FaUsers } from "react-icons/fa";
import {Link} from "react-router-dom";

export const RealTimeCard = () => {
  const { data: visitor } = useGetUsersQuery();

  return (
    <div className="w-[30rem] mt-10 bg-gradient-to-br from-[#1e1e1e] via-[#282828] to-[#1a1a1a] 
                    text-[#fff] rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Real-Time
        </h2>
        <span className="text-gray-400 text-sm italic">Update Live</span>
      </div>

      {/* Divider */}
      <div className="border-t border-[#666] my-4"></div>

      {/* Statistics */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2">
          <FaUsers size={30} className="text-purple-400" />
          <h2 className="text-4xl font-bold">{visitor?.length || 0}</h2>
        </div>
        <p className="text-gray-500 mt-2">Active Subscribers</p>
      </div>

      {/* Call to Action */}
      <div className="text-center my-4">
        <Link to={"/payment"} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 px-6 rounded-full 
                           hover:opacity-90 transition-all">
          Subscribe Now
        </Link>
      </div>

      {/* Horizontal Divider */}
      <hr className="my-6 border-gray-700" />

      {/* Primary Card Section */}
      <PrimaryCard />
    </div>
  );
};
