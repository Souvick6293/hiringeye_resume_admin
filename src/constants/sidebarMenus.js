import { LuLayoutDashboard, LuBriefcase } from "react-icons/lu";
import { HiOutlineTicket } from "react-icons/hi";

export const sidebarMenus = {
  dashboard: [
    { name: "Dashboard", icon: LuLayoutDashboard, path: "/dashboard" },
    { name: "Add Jobs", icon: LuBriefcase, path: "/add-jobs" },
    { name: "Manage Coupon", icon: HiOutlineTicket, path: "/manage-coupon" },
  ],
  resumeBuilder: [
    { name: "My Resumes", icon: LuBriefcase, path: "/resume-builder/my-resumes" },
    { name: "Create Resume", icon: LuBriefcase, path: "/resume-builder/create" },
  ],
  linkedin: [
    { name: "LinkedIn Stats", icon: LuLayoutDashboard, path: "/linkedin/stats" },
    { name: "Connections", icon: LuBriefcase, path: "/linkedin/connections" },
  ],
};