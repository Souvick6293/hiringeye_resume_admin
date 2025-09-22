import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { logo, smallLogo } from "../../assets/images/images";

import {
  HiOutlineTicket,
  PiUsersThin,
  LuBriefcase,
  LuLayoutDashboard,
} from "../../assets/icons/index";

import userRoles from "../../pages/utils/userRoles";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // ⭐ Active Tab State
  const [activeTab, setActiveTab] = useState<
    "overview" | "resume" | "linkedin"
  >("overview");
  const [showTabs, setShowTabs] = useState(true); // true = show tab buttons

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // expand/collapse save in localstorage
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    setSidebarOpen(true);
  }, []);

  const onHoverOpenSidebar = () => setSidebarOpen(false);

  const currentUserRole = userRoles();
  console.log("userRole", currentUserRole);

  // ⭐ Sidebar Menu Components
  const OverviewMenu = () => (
    <div className="px-4 py-2 font-medium text-gray-600">Overview</div>
  );

  const ResumeMenu = () => (
    <ul className="mb-6 flex flex-col gap-1.5">
      <li>
        <NavLink
          to="/dashboard"
          className={`group flex items-center gap-2 rounded-sm px-4 py-2 ${
            sidebarOpen ? "justify-center" : "justify-start"
          } font-normal text-sm text-gray-600 hover:bg-graydark ${
            pathname.includes("/dashboard") && "bg-graydark"
          }`}
        >
          <LuLayoutDashboard className="text-xl" />
          {!sidebarOpen && "Dashboard"}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manage-user"
          className={`group flex items-center gap-2 rounded-sm px-4 py-2 ${
            sidebarOpen ? "justify-center" : "justify-start"
          } font-normal text-sm text-gray-600 hover:bg-graydark ${
            pathname.includes("manage-user") && "bg-graydark"
          }`}
        >
          <PiUsersThin className="text-xl" />
          {!sidebarOpen && "Manage User"}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-jobs"
          className={`group flex items-center gap-2 rounded-sm px-4 py-2 ${
            sidebarOpen ? "justify-center" : "justify-start"
          } font-normal text-sm text-gray-600 hover:bg-graydark ${
            pathname.includes("add-jobs") && "bg-graydark"
          }`}
        >
          <LuBriefcase className="text-xl" />
          {!sidebarOpen && "Add Jobs"}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manage-coupon"
          className={`group flex items-center gap-2 rounded-sm px-4 py-2 ${
            sidebarOpen ? "justify-center" : "justify-start"
          } font-normal text-sm text-gray-600 hover:bg-graydark ${
            pathname.includes("manage-coupon") && "bg-graydark"
          }`}
        >
          <HiOutlineTicket className="text-xl" />
          {!sidebarOpen && "Manage Coupon"}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manage-plans"
          className={`group flex items-center gap-2 rounded-sm px-4 py-2 ${
            sidebarOpen ? "justify-center" : "justify-start"
          } font-normal text-sm text-gray-600 hover:bg-graydark ${
            pathname.includes("/manage-plans") && "bg-graydark"
          }`}
        >
          <HiOutlineTicket className="text-xl" />
          {!sidebarOpen && "Price List"}
        </NavLink>
      </li>
      
    </ul>
  );

  const LinkedInMenu = () => (
    <ul className="mb-6 flex flex-col gap-1.5">
      <li>
        <NavLink
          to="/linkedin-content"
          className={`group flex items-center gap-2 rounded-sm px-4 py-2 ${
            sidebarOpen ? "justify-center" : "justify-start"
          } font-normal text-sm text-gray-600 hover:bg-graydark ${
            pathname.includes("/linkedin-content") && "bg-graydark"
          }`}
        >
          <LuLayoutDashboard className="text-xl" />
          {!sidebarOpen && "LinkedIn Content"}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/linkedin-analytics"
          className={`group flex items-center gap-2 rounded-sm px-4 py-2 ${
            sidebarOpen ? "justify-center" : "justify-start"
          } font-normal text-sm text-gray-600 hover:bg-graydark ${
            pathname.includes("/linkedin-analytics") && "bg-graydark"
          }`}
        >
          <LuLayoutDashboard className="text-xl" />
          {!sidebarOpen && "LinkedIn Analytics"}
        </NavLink>
      </li>
    </ul>
  );

  return (
    <aside
      ref={sidebar}
      style={{ zIndex: 1 }}
      className={`left-0 top-[50px] z-9999 flex w-72 rounded-[10px] flex-col overflow-y-hidden bg-white duration-300 ease-linear absolute h-full lg:h-full min-h-[700px] shadow-xl ${
        sidebarOpen
          ? "-translate-x-full lg:static lg:w-24 lg:translate-x-0 "
          : "lg:translate-x-0 lg:static"
      }`}
      onMouseEnter={onHoverOpenSidebar}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-4 py-5 lg:py-[23px]">
        <NavLink className="text-center w-full" to="/overview">
          {sidebarOpen ? (
            <div className="text-center mb-8">
              <img
                src={smallLogo}
                alt="smallLogo"
                className="inline-block w-6/12"
              />
            </div>
          ) : (
            <div className="text-center mb-8">
              <img src={logo} alt="logo" className="inline-block w-7/12" />
            </div>
          )}
        </NavLink>
      </div>

      {/* SIDEBAR MENU */}
      <div className="sidebar_menu flex flex-col px-2">
        {showTabs ? (
          <>
            <button
              className={`block w-full text-left px-4 py-2 rounded-md mb-2 ${
                activeTab === "overview" ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => {
                setActiveTab("overview");
                setShowTabs(false);
              }}
            >
              Overview
            </button>
            <button
              className={`block w-full text-left px-4 py-2 rounded-md mb-2 ${
                activeTab === "resume" ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => {
                setActiveTab("resume");
                setShowTabs(false);
              }}
            >
              Resume Builder
            </button>
            <button
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeTab === "linkedin" ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => {
                setActiveTab("linkedin");
                setShowTabs(false);
              }}
            >
              LinkedIn Generator
            </button>
          </>
        ) : (
          <>
            {activeTab === "overview" && <OverviewMenu />}
            {activeTab === "resume" && <ResumeMenu />}
            {activeTab === "linkedin" && <LinkedInMenu />}
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
