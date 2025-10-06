import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoIcon } from "../../assets/images/images";
import DropdownUser from "../../components/DropdownUser";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(
    location.pathname.includes("/resume-builder")
      ? "Resume Builder"
      : location.pathname.includes("/linkedin-generator")
      ? "LinkWrite"
      : "Menu"
  );

  // Check if dropdown should be visible
  const showDropdown =
    location.pathname.includes("/resume-builder") ||
    location.pathname.includes("/linkedin-generator");

  const handleSelect = (menuName, path) => {
    setActiveMenu(menuName);
    setDropdownOpen(false);
    navigate(path);
  };

  return (
    <div className="z-10 sticky top-0 rounded-lg mb-6 bg-white">
      <div className="flex items-center justify-between px-6 py-3 shadow-2">

        {/* Sidebar Toggle + Logo */}
        {props.sidebarOpen ? (
          <div>
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-99999 block rounded-lg bg-[#EDDFF9] p-1 absolute top-[28px] left-[-60px]"
            >
              <IoMdArrowForward className="text-xl text-[#6326CB] hover:text-black" />
            </button>

            <Link className="block flex-shrink-0" to="/">
              <p className="text-[#313030] text-[24px] font-medium">
                Welcome Admin
              </p>
              <span className="text-sm text-[#686868]">
                Stay Updated. Stay Ahead.
              </span>
            </Link>
          </div>
        ) : (
          <div>
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-99999 block rounded-lg bg-[#EDDFF9] p-1 absolute top-[28px] left-[-60px]"
            >
              <IoMdArrowBack className="text-xl text-[#6326CB] hover:text-black" />
            </button>

            <Link className="block flex-shrink-0" to="/">
              <p className="text-[#313030] text-[24px] font-medium">
                Welcome Admin
              </p>
              <span className="text-sm text-[#686868]">
                Stay Updated. Stay Ahead.
              </span>
            </Link>
          </div>
        )}

        {/* Right side area */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* Dropdown (only show on specific pages) */}
          {showDropdown && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-4 py-2 border text-sm font-medium text-[#a81fa4]  border-[#a81fa4] rounded-[25px] bg-white flex items-cente"
              >
                {activeMenu}
                <span className="text-lg pl-1 pt-0.5"><RiArrowDropDownLine /></span>
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white border text-sm text-[#a81fa4] border-[#a81fa4] rounded-lg overflow-hidden shadow-lg z-50">
                  <li
                    onClick={() =>
                      handleSelect("Resume Builder", "/resume-builder/dashboard")
                    }
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      activeMenu === "Resume Builder"
                        ? "bg-gray-200 font-semibold"
                        : ""
                    }`}
                  >
                    Resume Builder
                  </li>
                  <li
                    onClick={() =>
                      handleSelect("LinkWrite", "/linkedin-generator/dashboard")
                    }
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      activeMenu === "LinkWrite"
                        ? "bg-gray-200 font-semibold"
                        : ""
                    }`}
                  >
                    LinkWrite
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* User Dropdown */}
          <DropdownUser />
        </div>
      </div>
    </div>
  );
}

export default Header;
