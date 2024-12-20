import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";

export default function MyAccount() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    logout(); // This will clear localStorage
    navigate('/auth'); // Redirect to login page
  };

  return (
    <div className="flex flex-col w-[80%] h-full mt-10">
      <div className="w-full">
        <h1 className="flex text-text-color text-3xl">My Account</h1>
      </div>

      {/* Account Content */}
      <div className="flex flex-col items-center justify-between gap-12 w-full h-full min-h-[60vh]">
        {/* User Profile Section */}
        <div className="flex-grow w-full mt-8">
          <div className="bg-bg-secondary rounded-lg p-6 mb-6">
            <h2 className="text-text-color text-xl mb-4 text-left">Profile Info</h2>
            <p className="text-text-color mb-2 text-left">Username: {userData.username}</p>
            <p className="text-text-color mb-4 text-left">Email: {userData.email}</p>
          </div>

          <div className="rounded-lg p-4">
            <p className="text-text-color opacity-60">
              Public Profile features coming soon...
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-text-color py-2 px-4 rounded-lg 
                     hover:bg-red-700 transition-colors duration-200 mt-10"
          >
            Logout
          </button>
        </div>

        {/* Logo at bottom */}
        <div className="flex flex-row items-center gap-2 mt-auto pt-8">
          <h1 className="text-2xl font-semibold tracking-wide text-text-color">herc</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            className="w-8 h-8 fill-header-color"
          >
            <path d="m8.5,0C5.467,0,3,2.467,3,5.5s2.467,5.5,5.5,5.5,5.5-2.467,5.5-5.5S11.533,0,8.5,0Zm0,7c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5.672,1.5,1.5-.672,1.5-1.5,1.5Zm15.5,13.857s-4.667,3.143-12,3.143S.009,18.762.009,18.762C.009,16.862.268,13.049,1.968,9.174c1.046,1.852,2.852,3.219,4.995,3.667-.098,1.184-.293,2.329-.676,3.293,1.402-1.282,3.836-3.133,6.213-3.133,2.125,0,4.122,1.94,4.14,1.96l1.492-1.332c-.043-.048-.523-.577-1.311-1.148.995-.743,2.303-1.48,3.602-1.48,2.095,0,3.577.5,3.577.5v9.357Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
