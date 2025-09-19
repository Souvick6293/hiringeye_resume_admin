import React, { useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Datepicker, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { getCouponDetails, updateCoupon, couponActiveDeactive } from "../../Reducer/CouponSlice";

const EditCoupon = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [couponType, setCouponType] = useState("fixed");
    const { couponDetails, loading } = useSelector((state) => state.coupon);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            start_date: "",
            end_date: "",
            no_of_valid_user: "",
            coupon_amount: "",
            coupon_type: "fixed",
        },
    });

    useEffect(() => {
        dispatch(getCouponDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (couponDetails?.data) {
            const details = couponDetails.data;
            reset({
                start_date: details.start_date,
                end_date: details.end_date,
                no_of_valid_user: Number(details.no_of_valid_user),
                coupon_amount: Number(details.coupon_ammount),
                coupon_type: details.coupon_type === 1 ? "percentage" : "fixed",
            });
            setCouponType(details.coupon_type === 1 ? "percentage" : "fixed");
        }
    }, [couponDetails, reset]);

    const onSubmit = (data) => {
        const payload = {
            coupon_id: Number(id),
            start_date: data.start_date,
            end_date: data.end_date,
            no_of_valid_user: Number(data.no_of_valid_user),
            coupon_amount: Number(data.coupon_amount),
            coupon_type: data.coupon_type,
        };

        console.log("Payload for Edit:", payload);
        dispatch(updateCoupon(payload));
    };

    // Toggle Active / Inactive Status
    const handleToggleStatus = () => {
        const currentStatus = couponDetails?.data?.status;
        const newStatus = currentStatus === 1 ? 0 : 1;

        const payload = {
            coupon_id: Number(id),
            status: newStatus,
        };

        console.log("Toggle Payload:", payload);
        dispatch(couponActiveDeactive(payload)).then(() => {
            dispatch(getCouponDetails(id));
        });
    };

    if (loading) return <p className="text-center py-4">Loading...</p>;

    return (
        <div className="bg-white rounded-[10px] p-8">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <Link to="/manage-coupon" className="flex items-center gap-2">
                        <span className="border border-[#A6A6A6] w-[34px] h-[34px] rounded-[5px] flex items-center justify-center">
                            <CgArrowLeft />
                        </span>
                        Edit Coupon
                    </Link>
                </div>

                {/* Toggle Button */}
                <div>
                    <label className="inline-flex items-center cursor-pointer w-full justify-center mb-3">
                        <input
                            type="checkbox"
                            checked={couponDetails?.data?.status === 1}
                            onChange={handleToggleStatus}
                            className="sr-only peer"
                        />
                        <div
                            className={`relative w-12 h-6 rounded-full transition-colors ${couponDetails?.data?.status === 1 ? "bg-green-500" : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${couponDetails?.data?.status === 1 ? "translate-x-6" : ""
                                    }`}
                            ></span>
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-700">
                            {couponDetails?.data?.status === 1 ? "Active" : "Inactive"}
                        </span>
                    </label>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Coupon ID */}
                <div className="flex gap-6 mb-4">
                    <div className="w-6/12">
                        <Label htmlFor="coupon_id">
                            Coupon ID <span className="text-[#ff0000]">*</span>
                        </Label>
                        <TextInput id="coupon_id" type="number" value={id} readOnly />
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
                            <p className="text-red-500 text-sm mt-1">
                                {errors.start_date.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* End Date & No of Users */}
                <div className="flex gap-6 mb-4">
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
                            <p className="text-red-500 text-sm mt-1">
                                {errors.end_date.message}
                            </p>
                        )}
                    </div>

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
                                valueAsNumber: true,
                            })}
                        />
                        {errors.no_of_valid_user && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.no_of_valid_user.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Coupon Type & Amount */}
                <div className="flex gap-6 mb-4">
                    <div className="w-6/12">
                        <Label htmlFor="coupon_type">
                            Fixed or % of Coupon Amount{" "}
                            <span className="text-[#ff0000]">*</span>
                        </Label>
                        <select
                            {...register("coupon_type", { required: true })}
                            className="border border-gray-300 rounded-md w-full px-2 py-1 text-sm"
                            value={couponType}
                            onChange={(e) => {
                                setCouponType(e.target.value);
                                reset((prev) => ({ ...prev, coupon_type: e.target.value }));
                            }}
                        >
                            <option value="fixed">Fixed</option>
                            <option value="percentage">Percentage</option>
                        </select>
                    </div>

                    <div className="w-6/12">
                        <Label htmlFor="coupon_amount">
                            {couponType === "percentage"
                                ? "Coupon Amount (%)"
                                : "Coupon Amount"}
                            <span className="text-[#ff0000]">*</span>
                        </Label>
                        <TextInput
                            id="coupon_amount"
                            type="number"
                            sizing="sm"
                            {...register("coupon_amount", {
                                required: "Coupon amount is required",
                                valueAsNumber: true,
                            })}
                        />
                        {errors.coupon_amount && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.coupon_amount.message}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-[#6326CB] hover:bg-black w-full rounded-[7px] text-[#ffffff] text-[16px] leading-[45px]"
                >
                    Update Coupon
                </button>
            </form>
        </div>
    );
};

export default EditCoupon;
