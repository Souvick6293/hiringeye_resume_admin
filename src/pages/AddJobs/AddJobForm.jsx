import React from "react";
import { useForm, Controller } from "react-hook-form";

const AddJobForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Send data to API here
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add Job</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Job Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Job Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("jobName", { required: "Job Name is required" })}
            className="w-full border rounded px-3 py-2"
            placeholder="Add position name"
          />
          {errors.jobName && (
            <p className="text-red-500 text-sm mt-1">{errors.jobName.message}</p>
          )}
        </div>

        {/* Hiring Member */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("hiringMember", { required: "Hiring Member is required" })}
            placeholder="Enter Job Description"
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
          {errors.hiringMember && (
            <p className="text-red-500 text-sm mt-1">{errors.hiringMember.message}</p>
          )}
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Job Type <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            {["Full-Time", "Part-Time", "Internship", "Temporary", "Contract"].map(
              (type) => (
                <label key={type} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={type}
                    {...register("jobType", { required: "Select at least one job type" })}
                  />
                  {type}
                </label>
              )
            )}
          </div>
          {errors.jobType && (
            <p className="text-red-500 text-sm mt-1">{errors.jobType.message}</p>
          )}
        </div>

        {/* Job Location */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Job Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("jobLocation", { required: "Job Location is required" })}
            className="w-full border rounded px-3 py-2"
            placeholder="Choose location"
          />
          {errors.jobLocation && (
            <p className="text-red-500 text-sm mt-1">{errors.jobLocation.message}</p>
          )}
        </div>

        {/* Company Size */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Company Size <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            {["0 - 20 Employees", "50 - 100 Employees", "200 - 500 Employees"].map(
              (size) => (
                <label key={size} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={size}
                    {...register("companySize", {
                      required: "Select at least one company size",
                    })}
                  />
                  {size}
                </label>
              )
            )}
          </div>
          {errors.companySize && (
            <p className="text-red-500 text-sm mt-1">{errors.companySize.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Save and Continue
        </button>
      </form>
    </div>
  );
};

export default AddJobForm;
