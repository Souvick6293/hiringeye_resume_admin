import React, { useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Datepicker, Label, TextInput } from "flowbite-react";
import { useDispatch } from "react-redux";
import { createCoupon } from "../../Reducer/CouponSlice";


const AddCoupon = () => {
  const dispatch = useDispatch();
const [couponType, setCouponType] = useState("fixed");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      couponsID: "",
      start_date: "",
      end_date: "",
      no_of_valid_user: "",
      coupon_amount: "",
      coupon_type: "fixed",
    },
  });

  const onSubmit = (data) => {
    // data formatting if needed
    dispatch(createCoupon(data));
    console.log("Form Data:", data);
  };

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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-6 mb-4">
          {/* Coupon ID */}
          <div className="w-6/12">
            <Label htmlFor="couponsID">
              Coupon ID <span className="text-[#ff0000]">*</span>
            </Label>
            <TextInput
              id="couponsID"
              type="text"
              sizing="sm"
              {...register("couponsID", { required: "Coupon ID is required" })}
            />
            {errors.couponsID && (
              <p className="text-red-500 text-sm mt-1">{errors.couponsID.message}</p>
            )}
          </div>

          {/* Start Date */}
          <div className="w-6/12">
            <Label htmlFor="start_date">
              Coupon Date <span className="text-[#ff0000]">*</span>
            </Label>
            <Controller
              control={control}
              name="start_date"
              rules={{ required: "Start date is required" }}
              render={({ field }) => (
                <Datepicker
                  {...field}
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) =>
                    field.onChange(date ? date.toISOString().split("T")[0] : "")
                  }
                />
              )}
            />
            {errors.start_date && (
              <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-6 mb-4">
          {/* End Date */}
          <div className="w-6/12">
            <Label htmlFor="end_date">
              Coupon Expiry Date <span className="text-[#ff0000]">*</span>
            </Label>
            <Controller
              control={control}
              name="end_date"
              rules={{ required: "End date is required" }}
              render={({ field }) => (
                <Datepicker
                  {...field}
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) =>
                    field.onChange(date ? date.toISOString().split("T")[0] : "")
                  }
                />
              )}
            />
            {errors.end_date && (
              <p className="text-red-500 text-sm mt-1">{errors.end_date.message}</p>
            )}
          </div>

          {/* Number of Valid Users */}
          <div className="w-6/12">
            <Label htmlFor="no_of_valid_user">
              No. of Coupon Valid <span className="text-[#ff0000]">*</span>
            </Label>
            <TextInput
              id="no_of_valid_user"
              type="number"
              sizing="sm"
              {...register("no_of_valid_user", {
                required: "Number of valid users is required",
              })}
            />
            {errors.no_of_valid_user && (
              <p className="text-red-500 text-sm mt-1">{errors.no_of_valid_user.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-6 mb-4">
          {/* Coupon Type */}
          <div className="w-6/12">
            <Label htmlFor="coupon_type">
              Fixed or % of Coupon Amount <span className="text-[#ff0000]">*</span>
            </Label>
            <select
              {...register("coupon_type", { required: true })}
              className="border border-gray-300 rounded-md w-full px-2 py-1 text-sm"
              onChange={(e) => setCouponType(e.target.value)}
            >
              <option value="fixed">Fixed</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>

          {/* Coupon Amount */}
          <div className="w-6/12">
            <Label htmlFor="coupon_amount">
              {couponType === "percentage" ? "Coupon Amount (%)" : "Coupon Amount"}
              <span className="text-[#ff0000]">*</span>
            </Label>
            <TextInput
              id="coupon_amount"
              type="number"
              sizing="sm"
              {...register("coupon_amount", { required: "Coupon amount is required" })}
            />
            {errors.coupon_amount && (
              <p className="text-red-500 text-sm mt-1">{errors.coupon_amount.message}</p>
            )}
          </div>
        </div>


        <button
          type="submit"
          className="bg-[#6326CB] hover:bg-black w-full rounded-[7px] text-[#ffffff] text-[16px] leading-[45px]"
        >
          Create Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;
