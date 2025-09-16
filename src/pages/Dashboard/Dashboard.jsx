import { HiDocumentText, HiMiniUsers } from "react-icons/hi2";
import { BiSolidWalletAlt } from "react-icons/bi";
import { MdSubscriptions } from "react-icons/md";
import { user01 } from "../../assets/images/images.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { dashboardInfo } from "../../Reducer/DashBoardSlice.js";

const Dashboard = () => {
  const { infoData } = useSelector((state) => state?.dash);
  const dispatch = useDispatch();

  const [userCount, setUserCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [resumeCount, setResumeCount] = useState(0);
  const [revenueCount, setRevenueCount] = useState(0);

  useEffect(() => {
    dispatch(dashboardInfo());
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
    if (infoData) {
      animateCounter(infoData?.total_user_count ?? 0, setUserCount);
      animateCounter(400, setSubscriptionCount);
      animateCounter(532, setResumeCount);
      animateCounter(36000, setRevenueCount); 
    }
  }, [infoData]);

  return (
    <div className="wrapper_area my-0 mx-auto px-0">
      <div className="h-full">
        <div className="mb-6">
          <div className="grid grid-cols-4 gap-4">
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

            {/* Revenue */}
            <div className="bg-white rounded-[12px] flex items-center gap-5 px-6 py-10">
              <div className="bg-[#f3e5ff] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                <BiSolidWalletAlt className="text-[#6326CB] text-3xl" />
              </div>
              <div>
                <p className="text-[#929292] text-base font-medium">Revenue</p>
                <p className="text-[#252733] text-[23px] font-medium">
                  ${revenueCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-8/12 bg-white rounded-[12px] px-6 py-6">
            <h3 className="text-[#252733] text-[20px] font-medium mb-5">
              Resumes Created
            </h3>
          </div>
          <div className="w-4/12 bg-white rounded-[12px] px-6 py-6">
            <h3 className="text-[#252733] text-[20px] font-medium mb-5">
              Users List
            </h3>
            <div>
              {infoData?.latest_ten_user?.length > 0 ? (
                infoData.latest_ten_user.map((user) => (
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

export default Dashboard;
