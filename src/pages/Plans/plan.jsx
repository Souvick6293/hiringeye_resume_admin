import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { planList } from "../../Reducer/PlanSlice";
import sub01 from "../../assets/imagesource/sub01.png";
import sub02 from "../../assets/imagesource/sub02.png";
import Check from "../../assets/imagesource/Check.png";

const Plan = () => {
  const dispatch = useDispatch();
  const { planListData, loading } = useSelector((state) => state.plan);
  const [selectedFlag, setSelectedFlag] = useState("one_time"); // default dropdown

  useEffect(() => {
    dispatch(planList());
  }, [dispatch]);

  const handlePaymentModal = (e, data) => {
    e.preventDefault();
    console.log("Selected Plan Data:", data);
  };

  const plans = planListData?.data || [];

  // Map dropdown values to plan_frequency numbers
  const flagMap = {
    one_time: 1,
    quarterly: 3,
    annually: 12
  };

 const filteredPlans = plans
  .filter((plan) => plan.plan_frequency === flagMap[selectedFlag])
  .sort((a, b) => parseFloat(a.plan_price[0]?.price) - parseFloat(b.plan_price[0]?.price));

  return (
    <div className="key_benefits_section pt-10 lg:pt-0 pb-10">
      <div className="purchase_section py-8 lg:py-20 px-0 lg:px-0">
        <div className="max-w-6xl mx-auto">
          {/* Dropdown Right Side */}
          <div className="flex justify-end mb-6">
            <select
              className="border border-gray-300 rounded-md p-2"
              value={selectedFlag}
              onChange={(e) => setSelectedFlag(e.target.value)}
            >
              <option value="one_time">One Time</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annual</option>
            </select>
          </div>

          {loading && <p className="text-center text-gray-500">Loading plans...</p>}

          {!loading && filteredPlans.length === 0 && (
            <p className="text-center text-gray-500">No Plans Found.</p>
          )}

          {/* Plan Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
            {filteredPlans.map((pln) => (
              <div
                key={pln.id}
                className={`pt-0 border border-[#e9edff] rounded-[26px] bg-white ${
                  pln.plan_name.includes("Gold") ? "gold_card_box" : ""
                }`}
              >
                <div className="py-8 px-6 relative">
                  <img
                    src={pln.plan_name.includes("Gold") ? sub02 : sub01}
                    alt={pln.plan_name}
                    className="mb-6"
                  />
                  <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                    {pln.plan_name}
                  </h3>

                  <div className="flex items-center gap-2 mb-8">
                    <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                      ₹{pln.plan_price[0]?.price}
                    </p>
                    {pln.plan_price[0]?.old_price && (
                      <div className="pt-4">
                        <p className="text-[#797878] text-[14px] leading-[20px] line-through">
                          ₹{pln.plan_price[0]?.old_price}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mb-14 border-t border-[#edf0ff] pt-8">
                    {pln.plan_accesses.map((access) => (
                      <div
                        key={access.id}
                        className="flex gap-1 text-[#1B223C] text-[13px] mb-2"
                      >
                        <img
                          src={Check}
                          alt="Check"
                          className="w-[14px] h-[14px] mr-2"
                        />
                        {access.plan_access_description}
                      </div>
                    ))}
                  </div>

                  <div className="absolute left-0 bottom-[20px] w-full px-6">
                    <button
                      onClick={(e) =>
                        handlePaymentModal(e, {
                          plan_id: pln.id,
                          name: pln.plan_name,
                        })
                      }
                      className={`${
                        pln.plan_name.includes("Gold")
                          ? "bg-[#e1cbff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff]"
                          : "bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff]"
                      } border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
