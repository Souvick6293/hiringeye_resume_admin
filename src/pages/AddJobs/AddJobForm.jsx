import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addJob } from "../../Reducer/JobSlice";
import { useSelector, useDispatch } from "react-redux";
import { logo } from '../../assets/images/images';
import { FaArrowLeft } from "react-icons/fa6";
import { CgArrowLeft } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const AddJobForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      job_description: "",
      job_type: [],
      company_size: [],
      max_qualification: "",
      preferred_qualification: "",
      responsibilities: "",
    },
  });
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { loading, success, error } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // Map company size to number
    const companySizeMap = {
      "0 - 20 Employees": 20,
      "50 - 100 Employees": 100,
      "200 - 500 Employees": 500,
    };

    // Map job type to backend-compatible string
    const jobTypeMap = {
      "Full-time": "Full-time",
      "Part-time": "Part-Time",
      "Internship": "Internship",
      "Temporary": "Temporary",
      "Contract": "Contract",
    };

    // Take the first selected company size
    const selectedCompanySize = data.company_size?.[0];
    const companySizeValue = selectedCompanySize ? companySizeMap[selectedCompanySize] : 0;

    // Take single selected job type
    const selectedJobType = Array.isArray(data.job_type)
      ? data.job_type.find(type => type && jobTypeMap[type])
      : data.job_type;

    const formattedData = {
      ...data,
      company_size: companySizeValue,
      job_type: selectedJobType ? jobTypeMap[selectedJobType] : "", // single string
      recruiter_email: data.recruitersEmailId,
    };

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      dispatch(addJob(formattedData))
        .unwrap()
        .then((res) => console.log("Job Added Successfully", res))
        .catch((err) => console.error("Job Add Failed", err));
    }
  };



  // const onSubmit = (data) => {
  //   if (currentStep < 3) {
  //     setCurrentStep((prev) => prev + 1);
  //   } else {
  //     console.log("Final Submit Done:", data);
  //     dispatch(addJob(data))
  //       .unwrap()
  //       .then((res) => console.log("Job Added Successfully ", res))
  //       .catch((err) => console.error("Job Add Failed", err));
  //   }
  // };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const steps = ["Basic Information", "Hiring Details", "Review & Submit"];
  const watchAllFields = watch();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Top Heading */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
          >
            <span className="border border-[#A6A6A6] w-[34px] h-[34px] rounded-[5px] flex items-center justify-center">
              <CgArrowLeft />
            </span>
          </button>
          <h2 className="text-2xl font-semibold ml-2">Add Job</h2>
        </div>

        <div className="flex gap-10">
          {/* Step Indicator */}
          <div className="flex flex-col items-center w-40 pt-2">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isActive = stepNumber === currentStep;

              return (
                <div key={step} className="flex flex-col items-center mb-6">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold border-2 ${isCompleted
                      ? "bg-purple-600 text-white border-purple-600"
                      : isActive
                        ? "border-purple-600 text-purple-600"
                        : "border-gray-300 text-gray-400"
                      }`}
                  >
                    {stepNumber}
                  </div>
                  <span className="mt-2 text-sm text-gray-600">{step}</span>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-8 border-l-2 ${isCompleted ? "border-purple-600" : "border-purple-300"
                        } mt-2`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 space-y-6 border-l pl-10"
          >
            {/* Step 1 */}
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-purple-600 font-medium mb-1">
                    Job Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("job_role", { required: "Job Role is required" })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Add Job Role"
                  />
                  {errors.job_role && (
                    <p className="text-red-500 text-sm">{errors.job_role.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-purple-600 font-medium mb-1">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="job_description"
                    control={control}
                    rules={{ required: "Job Description is required" }}
                    render={({ field }) => (
                      <ReactQuill
                        value={field.value}
                        onChange={field.onChange}
                        modules={modules}
                        placeholder="Enter Job Description"
                        className="quill-editor"
                      />
                    )}
                  />
                  {errors.job_description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.job_description.message}
                    </p>
                  )}
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-purple-600 font-medium mb-1">Job Type *</label>
                  <Controller
                    name="job_type"
                    control={control}
                    rules={{ required: "Select a job type" }}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-4">
                        {["Full-time", "Part-time", "Internship", "Temporary", "Contract"].map((type) => (
                          <label key={type} className="flex items-center gap-2">
                            <input
                              type="radio"
                              value={type}
                              checked={field.value === type}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="accent-purple-600"
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    )}
                  />
                </div>


                {/* Job Location */}
                <div>
                  <label className="block text-purple-600 font-medium mb-1">
                    Job Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("location", { required: "Job Location is required" })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Choose Job location"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>

                {/* Company Size */}
                <div>
                  <label className="block text-purple-600 font-medium mb-1">
                    Company Size <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="company_size"
                    control={control}
                    rules={{ required: "Select a company size" }}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-4">
                        {["0 - 20 Employees", "50 - 100 Employees", "200 - 500 Employees"].map((size) => (
                          <label key={size} className="flex items-center gap-2">
                            <input
                              type="radio"
                              value={size}
                              checked={field.value === size}
                              onChange={() => field.onChange(size)}
                              className="accent-purple-600"
                            />
                            {size}
                          </label>
                        ))}
                      </div>
                    )}
                  />

                  {errors.company_size && (
                    <p className="text-red-500 text-sm mt-1">{errors.company_size.message}</p>
                  )}
                </div>
              </>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-purple-600 font-medium mb-1">
                    Maximum Qualification <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="max_qualification"
                    control={control}
                    rules={{ required: "Maximum Qualification is required" }}
                    render={({ field }) => (
                      <ReactQuill
                        value={field.value}
                        onChange={field.onChange}
                        modules={modules}
                        placeholder="Enter Maximum Qualification"
                        className="quill-editor"
                      />
                    )}
                  />
                  {errors.max_qualification && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.max_qualification.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-purple-600 font-medium mb-1">
                    Preferred Qualification <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="preferred_qualification"
                    control={control}
                    rules={{ required: "Preferred Qualification is required" }}
                    render={({ field }) => (
                      <ReactQuill
                        value={field.value}
                        onChange={field.onChange}
                        modules={modules}
                        placeholder="Enter Preferred Qualification"
                        className="quill-editor"
                      />
                    )}
                  />
                  {errors.preferred_qualification && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.preferred_qualification.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-purple-600 font-medium mb-1">
                    Responsibilities <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="responsibilities"
                    control={control}
                    rules={{ required: "Responsibilities is required" }}
                    render={({ field }) => (
                      <ReactQuill
                        value={field.value}
                        onChange={field.onChange}
                        modules={modules}
                        placeholder="Enter Responsibilities"
                        className="quill-editor"
                      />
                    )}
                  />
                  {errors.responsibilities && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.responsibilities.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-purple-600 font-medium mb-1">
                    Recruiters Email Id <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("recruitersEmailId", {
                      required: "Recruiters Email Id is required",
                    })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Choose recruiters Email Id"
                  />
                  {errors.recruitersEmailId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.recruitersEmailId.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="text-left">
                <h3 className="text-2xl font-semibold text-purple-700 mb-3 text-center">
                  Review & Submit
                </h3>

                <div className="bg-white border rounded-lg shadow p-6 space-y-6">
                  {/* Company Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={watchAllFields.company_logo || logo}
                      alt="Company Logo"
                      className="object-cover rounded border  border-gray-500/50  bg-[#fff] p-6"
                    />
                    <div>
                      <h4 className="text-xl font-bold">{watchAllFields.company_name || "Hiring Eye"}</h4>
                      <p className="text-gray-500">{watchAllFields.location}</p>
                    </div>
                    <div className="flex ml-auto text-right text-sm text-gray-600 gap-6">
                      <p className="flex flex-col items-center">
                        <span className="font-semibold">Type </span>
                        <span>{watchAllFields.job_type}</span>
                      </p>
                      <p className="flex flex-col items-center">
                        <span className="font-semibold">Company Size </span>
                        <span>{watchAllFields.company_size}</span>
                      </p>
                    </div>
                  </div>

                  {/* Job Info */}
                  <div className="border-t pt-4 flex gap-4">
                    <div className="w-1/2 space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold">{watchAllFields.job_role}</h4>
                        <div className="mt-1">
                          <h4 className="text-gray-600 text-sm pb-2"><b className="text-[#000]">Hiring Eye: </b>{watchAllFields.location}</h4>
                          <h4 className="text-gray-600 text-sm"><b className="text-[#000]">Job Type: </b>{watchAllFields.job_type}</h4>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">Minimum Qualification</h4>
                        <div className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: watchAllFields.max_qualification }} />

                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">Preferred Qualification</h4>
                        <div className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: watchAllFields.preferred_qualification }} />
                      </div>

                    </div>

                    <div className="w-1/2">
                      <h4 className="text-lg font-semibold">Responsibilities</h4>
                      <div className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: watchAllFields.responsibilities }} />
                    </div>
                  </div>

                </div>
              </div>
            )}


            {/* Button */}
            <div className="flex justify-end">
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-6 py-2 border rounded-lg text-gray-700 bg-gray-300 hover:bg-gray-200 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all"
                >
                  {currentStep === 3 ? "Add Job" : "Save & Continue"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobForm;
