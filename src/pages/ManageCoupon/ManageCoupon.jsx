import React, { useEffect } from "react";
import { RiCoupon2Line } from "react-icons/ri";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCouponList } from "../../Reducer/CouponSlice";


const ManageCoupon = () => {
  const dispatch = useDispatch();
  const { couponList, loading, pagination } = useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(getCouponList({ page: 1, limit: 10 }));
  }, [dispatch]);

  // console.log(pagination)
  return (
    <div>
      <div className="bg-white rounded-[10px]">
        <div className="flex justify-between items-center border-b border-[#E2E2E2] px-8 py-5">
          <h3 className="text-xl text-[#151515]">
            Coupon List ({pagination?.totalItems || 0})
          </h3>
          <div>
            <Link
              to="/add-coupon"
              className="bg-[#F3EDFF] hover:bg-[#eddff9] rounded-[5px] px-4 text-[14px] leading-[50px] text-[#6326CB] cursor-pointer inline-flex justify-center items-center gap-1.5"
            >
              <BsFillPlusCircleFill className="text-xl" />
              Create new Coupon
            </Link>
          </div>
        </div>

        <div className="mt-0 p-8">
          {loading && <p>Loading...</p>}

          {!loading && couponList.length === 0 && <p>No coupons found.</p>}

          {!loading &&
            couponList.map((coupon) => {
              const isExpired = new Date(coupon.end_date) < new Date();
              return (
                <div
                  key={coupon.id}
                  className="flex justify-between items-center mb-10"
                >
                  <div className="bg-white rounded-[12px] flex items-center gap-3">
                    <div className="bg-[#9C9C9C] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                      <RiCoupon2Line className="text-[#ffffff] text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#151515] text-[17px] font-medium pb-1">
                        Coupon ID: {coupon.coupons_id}
                      </p>
                      <div className="soupon_box">
                        <ul className="flex items-center">
                          <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                            {coupon.coupon_type === 1
                              ? `${coupon.coupon_ammount}% off`
                              : `$${coupon.coupon_ammount} off`}
                          </li>
                          <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                            Valid {coupon.no_of_valid_user} uses
                          </li>
                          <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                            Expires: {coupon.end_date}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                 <div className="flex items-center gap-4">
                    <Link
                      to={`/edit-coupon/${coupon.id}`}
                      className="flex items-center gap-2 bg-[#E8E8FF] hover:bg-[#d6d6ff] text-[#4A3AFF] px-4 py-2 rounded-[30px] text-sm font-medium transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      className={`rounded-[30px] px-8 font-medium text-[14px] leading-[42px] cursor-pointer inline-flex justify-center items-center ${isExpired
                        ? "bg-[#FFEBEB] text-[#FF0404] hover:text-black"
                        : "bg-[#c3d2db] text-[#0369A1] hover:text-black"
                        }`}
                    >
                      {isExpired ? "Expired" : "Active"}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ManageCoupon;
