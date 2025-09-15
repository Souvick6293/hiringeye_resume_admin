import React from "react";
import { BiDownload } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { MdSubscriptions } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const ManageCoupon = () => {
  return (
    <div>
      <div className="bg-white rounded-[10px]">
        <div className="flex justify-between items-center border-b border-[#E2E2E2] px-8 py-5">
          <h3 className="text-xl text-[#151515]">Coupon List (7)</h3>
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
          <div className="flex justify-between items-center mb-10">
            <div className="bg-white rounded-[12px] flex items-center gap-3">
              <div className="bg-[#9C9C9C] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                <RiCoupon2Line className="text-[#ffffff] text-2xl" />
              </div>
              <div>
                <p className="text-[#151515] text-[17px] font-medium pb-1">
                  Coupon ID: SAVE20
                </p>
                <div className="soupon_box">
                  <ul className="flex items-center">
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      20% off
                    </li>
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      Valid 500 uses
                    </li>
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      Expires: 24/08/2024
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <buton className="bg-[#FFEBEB] rounded-[30px] px-8 font-medium text-[14px] leading-[42px] text-[#FF0404] hover:text-black cursor-pointer inline-flex justify-center items-center">
                Expired
              </buton>
            </div>
          </div>
          <div className="flex justify-between items-center mb-10">
            <div className="bg-white rounded-[12px] flex items-center gap-3">
              <div className="bg-[#9C9C9C] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                <RiCoupon2Line className="text-[#ffffff] text-2xl" />
              </div>
              <div>
                <p className="text-[#151515] text-[17px] font-medium pb-1">
                  Coupon ID: SAVE20
                </p>
                <div className="soupon_box">
                  <ul className="flex items-center">
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      20% off
                    </li>
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      Valid 500 uses
                    </li>
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      Expires: 24/08/2024
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <buton className="bg-[#FFEBEB] rounded-[30px] px-8 font-medium text-[14px] leading-[42px] text-[#FF0404] hover:text-black cursor-pointer inline-flex justify-center items-center">
                Expired
              </buton>
            </div>
          </div>
          <div className="flex justify-between items-center mb-10">
            <div className="bg-white rounded-[12px] flex items-center gap-3">
              <div className="bg-[#9C9C9C] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                <RiCoupon2Line className="text-[#ffffff] text-2xl" />
              </div>
              <div>
                <p className="text-[#151515] text-[17px] font-medium pb-1">
                  Coupon ID: SAVE20
                </p>
                <div className="soupon_box">
                  <ul className="flex items-center">
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      20% off
                    </li>
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      Valid 500 uses
                    </li>
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      Expires: 24/08/2024
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <buton className="bg-[#FFEBEB] rounded-[30px] px-8 font-medium text-[14px] leading-[42px] text-[#FF0404] hover:text-black cursor-pointer inline-flex justify-center items-center">
                Expired
              </buton>
            </div>
          </div>
          <div className="flex justify-between items-center mb-10">
            <div className="bg-white rounded-[12px] flex items-center gap-3">
              <div className="bg-[#9C9C9C] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                <RiCoupon2Line className="text-[#ffffff] text-2xl" />
              </div>
              <div>
                <p className="text-[#151515] text-[17px] font-medium pb-1">
                  Coupon ID: SAVE20
                </p>
                <div className="soupon_box">
                  <ul className="flex items-center">
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      20% off
                    </li>
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      Valid 500 uses
                    </li>
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      Expires: 24/08/2024
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <buton className="bg-[#FFEBEB] rounded-[30px] px-8 font-medium text-[14px] leading-[42px] text-[#FF0404] hover:text-black cursor-pointer inline-flex justify-center items-center">
                Expired
              </buton>
            </div>
          </div>
          <div className="flex justify-between items-center mb-10">
            <div className="bg-white rounded-[12px] flex items-center gap-3">
              <div className="bg-[#9C9C9C] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                <RiCoupon2Line className="text-[#ffffff] text-2xl" />
              </div>
              <div>
                <p className="text-[#151515] text-[17px] font-medium pb-1">
                  Coupon ID: SAVE20
                </p>
                <div className="soupon_box">
                  <ul className="flex items-center">
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      20% off
                    </li>
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      Valid 500 uses
                    </li>
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      Expires: 24/08/2024
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <buton className="bg-[#FFEBEB] rounded-[30px] px-8 font-medium text-[14px] leading-[42px] text-[#FF0404] hover:text-black cursor-pointer inline-flex justify-center items-center">
                Expired
              </buton>
            </div>
          </div>
          <div className="flex justify-between items-center mb-10">
            <div className="bg-white rounded-[12px] flex items-center gap-3">
              <div className="bg-[#9C9C9C] rounded-[12px] w-[52px] h-[52px] flex items-center justify-center">
                <RiCoupon2Line className="text-[#ffffff] text-2xl" />
              </div>
              <div>
                <p className="text-[#151515] text-[17px] font-medium pb-1">
                  Coupon ID: SAVE20
                </p>
                <div className="soupon_box">
                  <ul className="flex items-center">
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      20% off
                    </li>
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      Valid 500 uses
                    </li>
                    <li className="text-[#7D7D7D] text-[14px] font-normal pr-8">
                      Expires: 24/08/2024
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <buton className="bg-[#FFEBEB] rounded-[30px] px-8 font-medium text-[14px] leading-[42px] text-[#FF0404] hover:text-black cursor-pointer inline-flex justify-center items-center">
                Expired
              </buton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCoupon;
