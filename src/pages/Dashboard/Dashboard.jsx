import { HiDocumentText, HiMiniUsers } from "react-icons/hi2";
import DashboardCard from "../../components/DashboardCard.jsx";
import TableOne from "../../components/TableOne.jsx";
import { BiSolidWalletAlt } from "react-icons/bi";
import { MdSubscriptions } from "react-icons/md";
import { user01 } from "../../assets/images/images.jsx";
const Dashboard = () => {
  return (
    <div className="wrapper_area my-0 mx-auto px-0">
      <div className="h-full lg:h-screen">
        {/* <h1 className="text-2xl font-medium text-black mb-4">Dashboard</h1> */}
        <div className="mb-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-[12px] flex items-center gap-5 px-6 py-10">
              <div className="bg-[#f3e5ff] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                <HiMiniUsers className="text-[#6326CB] text-3xl" />
              </div>
              <div>
                <p className="text-[#929292] text-base font-medium">
                  Total Users
                </p>
                <p className="text-[#252733] text-[23px] font-medium">648</p>
              </div>
            </div>
            <div className="bg-white rounded-[12px] flex items-center gap-5 px-6 py-10">
              <div className="bg-[#f3e5ff] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                <MdSubscriptions className="text-[#6326CB] text-3xl" />
              </div>
              <div>
                <p className="text-[#929292] text-base font-medium">
                  Active Subscriptions
                </p>
                <p className="text-[#252733] text-[23px] font-medium">400</p>
              </div>
            </div>
            <div className="bg-white rounded-[12px] flex items-center gap-5 px-6 py-10">
              <div className="bg-[#f3e5ff] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                <HiDocumentText className="text-[#6326CB] text-3xl" />
              </div>
              <div>
                <p className="text-[#929292] text-base font-medium">
                  Total Resumes Created
                </p>
                <p className="text-[#252733] text-[23px] font-medium">532</p>
              </div>
            </div>
            <div className="bg-white rounded-[12px] flex items-center gap-5 px-6 py-10">
              <div className="bg-[#f3e5ff] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                <BiSolidWalletAlt className="text-[#6326CB] text-3xl" />
              </div>
              <div>
                <p className="text-[#929292] text-base font-medium">Revenue</p>
                <p className="text-[#252733] text-[23px] font-medium">$36000</p>
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
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[56px] h-[56px] rounded-full">
                  <img src={user01} alt="user01" />
                </div>
                <div>
                  <p className="text-[#252733] text-base font-medium">
                    Brooklyn Simmons
                  </p>
                  <p className="text-[#929292] text-[13px] font-medium">
                    brooklyn.s@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[56px] h-[56px] rounded-full">
                  <img src={user01} alt="user01" />
                </div>
                <div>
                  <p className="text-[#252733] text-base font-medium">
                    Brooklyn Simmons
                  </p>
                  <p className="text-[#929292] text-[13px] font-medium">
                    brooklyn.s@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[56px] h-[56px] rounded-full">
                  <img src={user01} alt="user01" />
                </div>
                <div>
                  <p className="text-[#252733] text-base font-medium">
                    Brooklyn Simmons
                  </p>
                  <p className="text-[#929292] text-[13px] font-medium">
                    brooklyn.s@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[56px] h-[56px] rounded-full">
                  <img src={user01} alt="user01" />
                </div>
                <div>
                  <p className="text-[#252733] text-base font-medium">
                    Brooklyn Simmons
                  </p>
                  <p className="text-[#929292] text-[13px] font-medium">
                    brooklyn.s@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[56px] h-[56px] rounded-full">
                  <img src={user01} alt="user01" />
                </div>
                <div>
                  <p className="text-[#252733] text-base font-medium">
                    Brooklyn Simmons
                  </p>
                  <p className="text-[#929292] text-[13px] font-medium">
                    brooklyn.s@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[56px] h-[56px] rounded-full">
                  <img src={user01} alt="user01" />
                </div>
                <div>
                  <p className="text-[#252733] text-base font-medium">
                    Brooklyn Simmons
                  </p>
                  <p className="text-[#929292] text-[13px] font-medium">
                    brooklyn.s@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[56px] h-[56px] rounded-full">
                  <img src={user01} alt="user01" />
                </div>
                <div>
                  <p className="text-[#252733] text-base font-medium">
                    Brooklyn Simmons
                  </p>
                  <p className="text-[#929292] text-[13px] font-medium">
                    brooklyn.s@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[56px] h-[56px] rounded-full">
                  <img src={user01} alt="user01" />
                </div>
                <div>
                  <p className="text-[#252733] text-base font-medium">
                    Brooklyn Simmons
                  </p>
                  <p className="text-[#929292] text-[13px] font-medium">
                    brooklyn.s@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
