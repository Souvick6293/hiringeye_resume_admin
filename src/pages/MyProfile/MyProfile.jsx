import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewProfile } from "../../Reducer/ProfileSlice";
import { user01 } from "../../assets/images/images.jsx";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileDetail, loading } = useSelector((state) => state?.profile);

  useEffect(() => {
    dispatch(viewProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#c9c9c9]">
        <p className="text-lg text-gray-700 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!profileDetail?.data) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#c9c9c9]">
        <p className="text-lg text-red-600">No profile data found!</p>
      </div>
    );
  }

  const profile = profileDetail.data;

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#c9c9c9] px-4">
      <div className="max-w-2xl w-full bg-[#bdbdbd] rounded-2xl shadow-md p-6 relative">
        
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-700 hover:text-gray-900"
        >
          <IoArrowBack size={28} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 text-center">
          My Profile
        </h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={profile.avatar || user01}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover shadow"
          />
          <h3 className="mt-3 text-xl font-medium">
            {profile.f_name} {profile.l_name}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="font-semibold text-gray-700">Username:</div>
          <div className="text-gray-600">{profile.username}</div>

          <div className="font-semibold text-gray-700">Email:</div>
          <div className="text-gray-600">{profile.email}</div>

          <div className="font-semibold text-gray-700">Mobile:</div>
          <div className="text-gray-600">{profile.mobile}</div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
