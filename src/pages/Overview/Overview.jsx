import { HiDocumentText, HiMiniUsers } from "react-icons/hi2";
import { BiSolidWalletAlt } from "react-icons/bi";
import { MdSubscriptions } from "react-icons/md";
import { user01 } from "../../assets/images/images.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { dashboardInfo } from "../../Reducer/DashBoardSlice.js";
import { CgFileDocument } from "react-icons/cg";
import { TbUsers } from "react-icons/tb";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { LiaLinkedinIn } from "react-icons/lia";
import { BsPostcardFill } from "react-icons/bs";
import { BiSolidCommentDetail } from "react-icons/bi";
import { linkdinDashboardInfo } from "../../Reducer/LinkdinDashboardSlice.js";
import CombinedGraph from "../../components/graph/CombinedGraph.jsx";
import { fetchLinkdinGraph } from "../../Reducer/LinkdinGraphSlice.js";

const Overview = () => {
    const { infoData } = useSelector((state) => state?.dash);
    const { linkdinInfoData } = useSelector((state) => state?.linkdinDashboard);
    const { graphData } = useSelector((state) => state.linkdinGraph);
    const dispatch = useDispatch();

    const [userCount, setUserCount] = useState(0);
    const [subscriptionCount, setSubscriptionCount] = useState(0);
    const [resumeCount, setResumeCount] = useState(0);
    const [revenueCount, setRevenueCount] = useState(0);
    const [linkdinPostCount, setLinkDinPostCount] = useState(0);
    const [linkdinCommentCount, setLinkdinCommentCount] = useState(0);

    // New separate counters
    const [resumeUserCount, setResumeUserCount] = useState(0);
    const [linkedinUserCount, setLinkedinUserCount] = useState(0);

    useEffect(() => {
        dispatch(dashboardInfo());
        dispatch(linkdinDashboardInfo());
        dispatch(fetchLinkdinGraph());
    }, [dispatch]);

    // smooth animation function using requestAnimationFrame
    const animateCounter = (endValue, setState, duration = 1000) => {
        let start = 0;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * endValue);
            setState(value);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    useEffect(() => {
        if (infoData?.data && linkdinInfoData?.data) {
            // Top total counters
            animateCounter(
                (infoData.data.totalUsers ?? 0) + (linkdinInfoData.data.totalUsers ?? 0),
                setUserCount
            );
            animateCounter(infoData.data.totalActiveSubscription ?? 0, setSubscriptionCount);
            animateCounter(infoData.data.total_resume_created ?? 0, setResumeCount);
            animateCounter(36000, setRevenueCount);
            animateCounter(graphData.totalPost ?? 0, setLinkDinPostCount);
            animateCounter(graphData.totalComment ?? 0, setLinkdinCommentCount);

            // Product-wise counters
            animateCounter(infoData.data.totalUsers ?? 0, setResumeUserCount);
            animateCounter(linkdinInfoData.data.totalUsers ?? 0, setLinkedinUserCount);
        }
    }, [infoData, linkdinInfoData, graphData]);

    return (
        <div className="wrapper_area my-0 mx-auto px-0">
            <div className="h-full">
                <div className="mb-6">
                    <div className="grid grid-cols-5 gap-4">
                        {/* Total Users */}
                        <div className="bg-white rounded-[12px] flex items-center gap-5 px-6 py-10">
                            <div className="bg-[#f3e5ff] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                                <HiMiniUsers className="text-[#6326CB] text-3xl" />
                            </div>
                            <div>
                                <p className="text-[#929292] text-base font-medium">
                                    Total Users
                                </p>
                                <p className="text-[#252733] text-[23px] font-medium">
                                    {userCount}
                                </p>
                            </div>
                        </div>

                        {/* Active Subscriptions */}
                        <div className="bg-white rounded-[12px] flex items-center gap-5 px-6 py-10">
                            <div className="bg-[#f3e5ff] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                                <MdSubscriptions className="text-[#6326CB] text-3xl" />
                            </div>
                            <div>
                                <p className="text-[#929292] text-base font-medium">
                                    Active Subscriptions
                                </p>
                                <p className="text-[#252733] text-[23px] font-medium">
                                    {subscriptionCount}
                                </p>
                            </div>
                        </div>

                        {/* Total Resumes Created */}
                        <div className="bg-white rounded-[12px] flex items-center gap-5 px-6 py-10">
                            <div className="bg-[#f3e5ff] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                                <HiDocumentText className="text-[#6326CB] text-3xl" />
                            </div>
                            <div>
                                <p className="text-[#929292] text-base font-medium">
                                    Total Resumes Created
                                </p>
                                <p className="text-[#252733] text-[23px] font-medium">
                                    {resumeCount}
                                </p>
                            </div>
                        </div>

                        {/* Linkdin Post */}
                        <div className="bg-white rounded-[12px] flex items-center gap-5 px-6 py-10">
                            <div className="bg-[#f3e5ff] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                                <BsPostcardFill className="text-[#6326CB] text-3xl" />
                            </div>
                            <div>
                                <p className="text-[#929292] text-base font-medium">LinkedIn Post</p>
                                <p className="text-[#252733] text-[23px] font-medium">
                                    {linkdinPostCount}
                                </p>
                            </div>
                        </div>

                        {/* Linkdin Comment */}
                        <div className="bg-white rounded-[12px] flex items-center gap-5 px-6 py-10">
                            <div className="bg-[#f3e5ff] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                                <BiSolidCommentDetail className="text-[#6326CB] text-3xl" />
                            </div>
                            <div>
                                <p className="text-[#929292] text-base font-medium">LinkedIn Comment</p>
                                <p className="text-[#252733] text-[23px] font-medium">
                                    {linkdinCommentCount}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-8/12 bg-white rounded-[12px] px-6 py-6">
                        <CombinedGraph />
                    </div>

                    <div className="w-4/12 bg-white rounded-[12px] px-6 py-6">
                        <h3 className="text-[#252733] text-[20px] font-medium mb-5">
                            Product Performance
                        </h3>

                        {/* Resume Builder Card */}
                        <div className="border border-[#D9D9D9] rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="basis-[20%] bg-[#2b7fff] w-[50px] h-[50px] flex items-center justify-center rounded-md">
                                    <CgFileDocument className="text-[#fff] text-2xl" />
                                </div>
                                <div className="basis-[80%]">
                                    <h4 className="text-[#252733] font-medium text-lg">
                                        Resume Builder
                                    </h4>
                                    <p className="text-[#929292] text-sm">
                                        892 resumes this month
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <div className="flex flex-col items-center">
                                    <span className="text-[#8e8e8e] text-sm flex items-center gap-1">
                                        <TbUsers className="text-lg" />
                                        Active Users
                                    </span>
                                    <span className="text-[#252733] text-xl">{resumeUserCount}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[#8e8e8e] text-sm flex items-center gap-1">
                                        <HiArrowTrendingUp className="text-lg" />
                                        Revenue
                                    </span>
                                    <span className="text-[#252733] text-xl">$ {revenueCount}</span>
                                </div>
                            </div>
                        </div>

                        {/* LinkedIn Generator Card */}
                        <div className="border border-[#D9D9D9] rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="basis-[20%] bg-[#ad46ff] w-[50px] h-[50px] flex items-center justify-center rounded-md">
                                    <LiaLinkedinIn className="text-[#fff] text-2xl" />
                                </div>
                                <div className="basis-[80%]">
                                    <h4 className="text-[#252733] font-medium text-lg">
                                        LinkedIn Content Generator
                                    </h4>
                                    <p className="text-[#929292] text-sm">
                                        1178 resumes this month
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <div className="flex flex-col items-center">
                                    <span className="text-[#8e8e8e] text-sm flex items-center gap-1">
                                        <TbUsers className="text-lg" />
                                        Active Users
                                    </span>
                                    <span className="text-[#252733] text-xl">{linkedinUserCount}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[#8e8e8e] text-sm flex items-center gap-1">
                                        <HiArrowTrendingUp className="text-lg" />
                                        Revenue
                                    </span>
                                    <span className="text-[#252733] text-xl">$ {revenueCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-6/12 bg-white rounded-[12px] px-6 py-6">
                        <h3 className="text-[#252733] text-[20px] font-medium mb-5">
                            Resume Builder Users List
                        </h3>
                        <div className="overflow-y-auto pr-2" style={{ maxHeight: "400px" }}>
                            {infoData?.data?.users_list?.length > 0 ? (
                                infoData.data.users_list
                                    .slice(-10)
                                    .map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3"
                                        >
                                            <div className="w-[56px] h-[56px] rounded-full bg-gray-100 flex items-center justify-center">
                                                <img
                                                    src={user.avatar ?? user01}
                                                    alt={user.fullname}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[#252733] text-base font-medium">
                                                    {user.fullname}
                                                </p>
                                                <p className="text-[#929292] text-[13px] font-medium">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <p className="text-[#929292] text-sm">No users found.</p>
                            )}
                        </div>
                    </div>

                    <div className="w-6/12 bg-white rounded-[12px] px-6 py-6">
                        <h3 className="text-[#252733] text-[20px] font-medium mb-5">
                            LinkedIn Content Generator Users List
                        </h3>
                        <div className="overflow-y-auto pr-2" style={{ maxHeight: "400px" }}>
                            {linkdinInfoData?.data?.users_list?.length > 0 ? (
                                linkdinInfoData.data.users_list
                                    .slice(-10)
                                    .map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3"
                                        >
                                            <div className="w-[56px] h-[56px] rounded-full bg-gray-100 flex items-center justify-center">
                                                <img
                                                    src={user.avatar ?? user01}
                                                    alt={user.fullname}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[#252733] text-base font-medium">
                                                    {user.fullname}
                                                </p>
                                                <p className="text-[#929292] text-[13px] font-medium">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <p className="text-[#929292] text-sm">No users found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
