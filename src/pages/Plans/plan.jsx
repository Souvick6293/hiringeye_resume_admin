// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { planList } from "../../Reducer/PlanSlice";

// const Plan = () => {
//   const dispatch = useDispatch();
//   const { planListData, loading } = useSelector((state) => state.plan);
//   const [plans, setPlans] = useState([]);
//   const [selectedFreq, setSelectedFreq] = useState(1); // Default: One Time (1)

//   useEffect(() => {
//     dispatch(planList());
//   }, [dispatch]);

//   useEffect(() => {
//     if (planListData?.data) setPlans(planListData.data);
//   }, [planListData]);

//   const filterPlansByFrequency = (frequency) =>
//     plans.filter((plan) => plan.plan_frequency === frequency);

//   return (
//     <div className="max-w-6xl mx-auto py-10 px-4">
//       {loading && <p className="text-center text-gray-500">Loading plans...</p>}

//       {!loading && plans.length > 0 && (
//         <>
//           {/* Dropdown on right */}
//           <div className="flex justify-end mb-6">
//             <select
//               value={selectedFreq}
//               onChange={(e) => setSelectedFreq(Number(e.target.value))}
//               className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//             >
//               <option value={1}>One Time</option>
//               <option value={3}>Quarterly</option>
//               <option value={12}>Annual</option>
//             </select>
//           </div>

//           {/* Card Design */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {filterPlansByFrequency(selectedFreq).length > 0 ? (
//               filterPlansByFrequency(selectedFreq).map((plan, idx) => (
//                 <div
//                   key={plan.id}
//                   className={`bg-white rounded-2xl shadow-md border hover:shadow-xl p-6 flex flex-col items-center transition relative ${
//                     idx === 2 ? "bg-purple-100 border-purple-400" : ""
//                   }`}
//                 >
//                   <img
//                     src={plan.avatar}
//                     alt={plan.plan_name}
//                     className="w-12 h-12 object-contain mb-4"
//                   />
//                   <h3 className="text-lg font-semibold mb-2">
//                     {plan.plan_name}
//                   </h3>

//                   {/* Price Section */}
//                   <p className="text-2xl font-bold text-gray-900">
//                     ₹{(Math.random() * 100000 + 50000).toFixed(0)}
//                   </p>
//                   <p className="text-gray-400 line-through text-sm mb-4">
//                     ₹{(Math.random() * 150000 + 90000).toFixed(0)}
//                   </p>

//                   {/* Features */}
//                   <ul className="text-gray-700 text-sm mb-6 space-y-2">
//                     <li>✅ {Math.floor(Math.random() * 1000)} resumes</li>
//                     <li>✅ {Math.floor(Math.random() * 500)} LinkedIn rewrites</li>
//                   </ul>

//                   {/* Button */}
//                   <button
//                     className={`w-full py-2 rounded-lg font-semibold ${
//                       idx === 2
//                         ? "bg-[#6326CB] text-white hover:bg-black"
//                         : "border border-gray-400 hover:bg-gray-100"
//                     }`}
//                   >
//                     Get Started
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="col-span-full text-center text-gray-500">
//                 No Plans Found.
//               </p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Plan;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { planList } from "../../Reducer/PlanSlice";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import sub01 from "../../assets/imagesource/sub01.png";
import sub02 from "../../assets/imagesource/sub02.png";
import Check from "../../assets/imagesource/Check.png";

const Plan = () => {
  const dispatch = useDispatch();
  const { planListData, loading } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(planList());
  }, [dispatch]);

  const handlePaymentModal = (e, data) => {
    e.preventDefault();
    console.log("Selected Plan Data:", data);
  };

  // Plan Data safe access
  const plans = planListData?.data || [];

  // Filter plans by signup_type_id
  const oneTimePlans = plans.filter((p) => p.signup_type_id === 1);
  const annualPlans = plans.filter((p) => p.signup_type_id === 2);

  return (
    <div className="key_benefits_section pt-10 lg:pt-0 pb-10">
      <div className="purchase_section py-8 lg:py-20 px-0 lg:px-0">
        <div className="max-w-6xl mx-auto">
          <div className="subscription_tab_section">
            <Tabs>
              <TabList>
                {oneTimePlans.length > 0 && <Tab>One Time</Tab>}
                <Tab>Quarterly</Tab>
                {annualPlans.length > 0 && <Tab>Annual</Tab>}
              </TabList>

              {/* One Time Plans */}
              {oneTimePlans.length > 0 && (
                <TabPanel>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                    {oneTimePlans.map((pln, index) => (
                      <div
                        className="pt-0 border border-[#e9edff] rounded-[26px] bg-white gold_card_box"
                        key={pln.id}
                      >
                        <div className="py-8 px-6 relative">
                          <img
                            src={pln.plan_name === "Gold" ? sub02 : sub01}
                            alt="sub01"
                            className="mb-6"
                          />
                          <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                            {pln.plan_name}
                          </h3>
                          <div className="flex items-center gap-2 mb-8">
                            <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                              <span className="text-[#1D2127] text-[15px] leading-[50px] font-medium">
                                ₹
                              </span>{" "}
                              {pln.plan_frequency * 100} {/* example price */}
                            </p>
                          </div>
                          <div className="mb-14 border-t border-[#edf0ff] pt-8">
                            {/* Static access list just as example */}
                            <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                              <img
                                src={Check}
                                alt="Check"
                                className="w-[14px] h-[14px] mr-2"
                              />
                              Access for {pln.plan_frequency} month(s)
                            </div>
                          </div>
                          <div className="absolute left-0 bottom-[20px] w-full px-6">
                            <button
                              onClick={(e) =>
                                handlePaymentModal(e, {
                                  plan_id: pln.id,
                                  name: pln.plan_name,
                                })
                              }
                              className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer"
                            >
                              Get Started
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              )}

              {/* Quarterly - Static */}
              <TabPanel>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                  <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white gold_card_box">
                    <div className="py-8 px-6 relative">
                      <img src={sub01} alt="sub01" className="mb-6" />
                      <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                        Free
                      </h3>
                      <div className="flex items-center gap-2 mb-8">
                        <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                          ₹0
                        </p>
                      </div>
                      <div className="mb-14 border-t border-[#edf0ff] pt-8">
                        <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                          <img
                            src={Check}
                            alt="Check"
                            className="w-[14px] h-[14px] mr-2"
                          />
                          3 resumes (with watermark)
                        </div>
                      </div>
                      <div className="absolute left-0 bottom-[20px] w-full px-6">
                        <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">
                          Get Started
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Annual Plans */}
              {annualPlans.length > 0 && (
                <TabPanel>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                    {annualPlans.map((pln) => (
                      <div
                        className="pt-0 border border-[#e9edff] rounded-[26px] bg-white gold_card_box"
                        key={pln.id}
                      >
                        <div className="py-8 px-6 relative">
                          <img
                            src={pln.plan_name === "Campus Plus" ? sub02 : sub01}
                            alt="sub01"
                            className="mb-6"
                          />
                          <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                            {pln.plan_name}
                          </h3>
                          <div className="flex items-center gap-2 mb-8">
                            <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                              <span className="text-[#1D2127] text-[15px] leading-[50px] font-medium">
                                ₹
                              </span>{" "}
                              {pln.plan_frequency * 200}
                            </p>
                          </div>
                          <div className="mb-14 border-t border-[#edf0ff] pt-8">
                            <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                              <img
                                src={Check}
                                alt="Check"
                                className="w-[14px] h-[14px] mr-2"
                              />
                              Access for {pln.plan_frequency} month(s)
                            </div>
                          </div>
                          <div className="absolute left-0 bottom-[20px] w-full px-6">
                            <button
                              onClick={(e) =>
                                handlePaymentModal(e, {
                                  plan_id: pln.id,
                                  name: pln.plan_name,
                                })
                              }
                              className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer"
                            >
                              Get Started
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
