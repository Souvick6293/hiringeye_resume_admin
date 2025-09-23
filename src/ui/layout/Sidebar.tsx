import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { logo, smallLogo } from "../../assets/images/images";
import { HiOutlineTicket, PiUsersThin, LuBriefcase, LuLayoutDashboard } from "../../assets/icons/index";
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

  const [activeTab, setActiveTab] = useState<"overview" | "resume" | "linkedin">("overview");
  const [showTabs, setShowTabs] = useState(true);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

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

  //Helper to standardize menu item style
  const menuItemClass = (isActive: boolean) =>
    `group flex items-center gap-2 rounded-sm px-4 py-2 ${sidebarOpen ? "justify-center" : "justify-start"
    } font-normal text-sm text-gray-600 hover:bg-graydark ${isActive ? "bg-graydark" : ""}`;

  const OverviewMenu = () => (
    <ul className="mb-6 flex flex-col gap-1.5">
      <li>
        <NavLink to="/overview" className={menuItemClass(pathname.includes("/overview"))}>
          <LuLayoutDashboard className="text-xl" />
          {!sidebarOpen && "Overview"}
        </NavLink>
      </li>
    </ul>
  );

  const ResumeMenu = () => (
    <ul className="mb-6 flex flex-col gap-1.5">
      <li>
        <NavLink to="/resume-builder/dashboard" className={menuItemClass(pathname.includes("/resume-builder/dashboard"))}>
          <LuLayoutDashboard className="text-xl" />
          {!sidebarOpen && "Dashboard"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/resume-builder/manage-user" className={menuItemClass(pathname.includes("/resume-builder/manage-user"))}>
          <PiUsersThin className="text-xl" />
          {!sidebarOpen && "Manage User"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/resume-builder/add-jobs" className={menuItemClass(pathname.includes("/resume-builder/add-jobs"))}>
          <LuBriefcase className="text-xl" />
          {!sidebarOpen && "Add Jobs"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/resume-builder/manage-coupon" className={menuItemClass(pathname.includes("/resume-builder/manage-coupon"))}>
          <HiOutlineTicket className="text-xl" />
          {!sidebarOpen && "Manage Coupon"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/resume-builder/manage-plans" className={menuItemClass(pathname.includes("/resume-builder/manage-plans"))}>
          <HiOutlineTicket className="text-xl" />
          {!sidebarOpen && "Price List"}
        </NavLink>
      </li>
    </ul>
  );

  const LinkedInMenu = () => (
    <ul className="mb-6 flex flex-col gap-1.5">
      <li>
        <NavLink to="/linkedin-generator/dashboard" className={menuItemClass(pathname.includes("/linkedin-generator/dashboard"))}>
          <LuLayoutDashboard className="text-xl" />
          {!sidebarOpen && "Dashboard"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/linkedin-generator/manage-user" className={menuItemClass(pathname.includes("/linkedin-generator/manage-user"))}>
          <PiUsersThin className="text-xl" />
          {!sidebarOpen && "Manage User"}
        </NavLink>
      </li>
    </ul>
  );

  <ul className="mb-6 flex flex-col gap-1.5">
    <li>
      <NavLink
        to="/overview"
        className={menuItemClass(activeTab === "overview")}
        onClick={() => {
          setActiveTab("overview");
          setShowTabs(true);
        }}
      >
        <LuLayoutDashboard className="text-xl" />
        {!sidebarOpen && "Overview"}
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/resume-builder/dashboard"
        className={menuItemClass(activeTab === "resume")}
        onClick={() => {
          setActiveTab("resume");
          setShowTabs(false);
        }}
      >
        <LuBriefcase className="text-xl" />
        {!sidebarOpen && "Resume Builder"}
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/linkedin-generator/dashboard"
        className={menuItemClass(activeTab === "linkedin")}
        onClick={() => {
          setActiveTab("linkedin");
          setShowTabs(false);
        }}
      >
        <PiUsersThin className="text-xl" />
        {!sidebarOpen && "LinkedIn Generator"}
      </NavLink>
    </li>
  </ul>

  return (
    <aside
      ref={sidebar}
      style={{ zIndex: 1 }}
      className={`left-0 top-[50px] z-9999 flex w-72 rounded-[10px] flex-col overflow-y-hidden bg-white duration-300 ease-linear absolute h-full lg:h-full min-h-[700px] shadow-xl ${sidebarOpen
        ? "-translate-x-full lg:static lg:w-24 lg:translate-x-0 "
        : "lg:translate-x-0 lg:static"
        }`}
      onMouseEnter={onHoverOpenSidebar}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-4 py-5 lg:py-[23px]">
        <NavLink
          className="text-center w-full"
          to="/overview"
          onClick={() => {
            setActiveTab("overview");
            setShowTabs(true);
          }}
        >
          {sidebarOpen ? (
            <div className="text-center mb-8">
              <img src={smallLogo} alt="smallLogo" className="inline-block w-6/12" />
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
          <ul className="mb-6 flex flex-col gap-1.5">
            <li>
              <NavLink
                to="/overview"
                className={menuItemClass(activeTab === "overview")}
                onClick={() => {
                  setActiveTab("overview");
                  setShowTabs(true);
                }}
              >
                <LuLayoutDashboard className="text-xl" />
                {!sidebarOpen && "Overview"}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/resume-builder/dashboard"
                className={menuItemClass(activeTab === "resume")}
                onClick={() => {
                  setActiveTab("resume");
                  setShowTabs(false);
                }}
              >
                <LuBriefcase className="text-xl" />
                {!sidebarOpen && "Resume Builder"}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/linkedin-generator/dashboard"
                className={menuItemClass(activeTab === "linkedin")}
                onClick={() => {
                  setActiveTab("linkedin");
                  setShowTabs(false);
                }}
              >
                <PiUsersThin className="text-xl" />
                {!sidebarOpen && "LinkedIn Generator"}
              </NavLink>
            </li>
          </ul>
        ) : (
          <>
            {activeTab === "resume" && <ResumeMenu />}
            {activeTab === "linkedin" && <LinkedInMenu />}
          </>
        )}


      </div>
    </aside>
  );
};

export default Sidebar;