import React from "react";
import { CgArrowLeft } from "react-icons/cg";
import { Link } from "react-router-dom";

import { Datepicker, Label, TextInput } from "flowbite-react";

const AddCoupon = () => {
  return (
    <div className="bg-white rounded-[10px] p-8">
      <div className="mb-4">
        <Link to="/manage-coupon" className="flex items-center gap-2">
          <span className="border border-[#A6A6A6] w-[34px] h-[34px] rounded-[5px] flex items-center justify-center">
            <CgArrowLeft />
          </span>
          Add Coupon
        </Link>
      </div>
      <div>
        <div className="flex gap-6 mb-4">
          <div className="w-6/12">
            <div className="mb-2 block">
              <Label htmlFor="small">
                Coupon ID <span className="text-[#ff0000]">*</span>
              </Label>
            </div>
            <TextInput id="small" type="text" sizing="sm" />
          </div>
          <div className="w-6/12">
            <div className="mb-2 block">
              <Label htmlFor="small">
                Coupon Date <span className="text-[#ff0000]">*</span>
              </Label>
            </div>
            <Datepicker />
          </div>
        </div>
        <div className="flex gap-6 mb-4">
          <div className="w-6/12">
            <div className="mb-2 block">
              <Label htmlFor="small">
                Coupon Expiry Date <span className="text-[#ff0000]">*</span>
              </Label>
            </div>
            <Datepicker />
          </div>
          <div className="w-6/12">
            <div className="mb-2 block">
              <Label htmlFor="small">
                No. of Coupon Valid <span className="text-[#ff0000]">*</span>
              </Label>
            </div>
            <TextInput id="small" type="text" sizing="sm" />
          </div>
        </div>
        <div className="flex gap-6 mb-4">
          <div className="w-6/12">
            <div className="mb-2 block">
              <Label htmlFor="small">
                Fixed or % of Coupon Amount{" "}
                <span className="text-[#ff0000]">*</span>
              </Label>
            </div>
            <TextInput id="small" type="text" sizing="sm" />
          </div>
          <div className="w-6/12">
            <div className="mb-2 block">
              <Label htmlFor="small">
                Coupon Amount (%) <span className="text-[#ff0000]">*</span>
              </Label>
            </div>
            <TextInput id="small" type="text" sizing="sm" />
          </div>
        </div>
        <button className="bg-[#6326CB] hover:bg-black w-full rounded-[7px] text-[#ffffff] text-[16px] leading-[45px]">
          Create Coupon
        </button>
      </div>
    </div>
  );
};

export default AddCoupon;
