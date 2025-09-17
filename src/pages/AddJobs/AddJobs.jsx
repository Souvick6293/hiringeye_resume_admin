import React, { useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setPage } from "../../Reducer/jobSlice";

import small_logo_3 from "../../assets/imagesource/small_logo_3.png";

const AddJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get state from Redux
  const { jobs, loading, pagination } = useSelector((state) => state.job);

  // Fetch jobs when page changes
  useEffect(() => {
    dispatch(fetchJobs({ page: pagination.page, limit: pagination.limit }));
  }, [dispatch, pagination.page, pagination.limit]);

  return (
    <div className="pb-10">
      {/* Header Section */}
      <div className="flex justify-between items-center pt-1 mb-6">
        <div>
          <h2 className="text-[30px] leading-[30px] text-[#151515] font-semibold pb-3">
            Featured Jobs
          </h2>
          <p className="text-[#575757] font-normal text-base">
            Discover roles that match your skills and goals.
          </p>
        </div>
        <div>
          <button
            className="bg-[#F3EDFF] hover:bg-[#eddff9] rounded-[5px] px-4 text-[14px] leading-[50px] text-[#6326CB] cursor-pointer inline-flex justify-center items-center gap-1.5"
            onClick={() => navigate("form")}
          >
            <BsFillPlusCircleFill className="text-xl" />
            Add New Job
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-600">Loading jobs...</p>}

      {/* Jobs Grid */}
      {!loading && jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-[10px] p-9 shadow-sm">
              <img src={small_logo_3} alt="small_logo_3" className="mb-3" />
              <h3 className="text-[24px] text-[#6326CB] font-semibold pb-2">
                {job.job_role}{" "}
                <span className="text-[16px] text-[#000000] hover:text-[#6326CB] font-medium">
                  <Link to={`/applicants-list/${job.id}`}>
                    ({job.applicants_count || 0} Applicants)
                  </Link>
                </span>
              </h3>
              <div
                className="text-[#6C6C6C] text-[16px] pb-4 prose"
                dangerouslySetInnerHTML={{ __html: job.job_description }}
              />
              <button className="bg-[#6326CB] hover:bg-black w-full rounded-[7px] text-[#ffffff] text-[16px] leading-[45px]"
                onClick={() => navigate("edit-job")}
              >
                Edit Job Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">No jobs found.</p>
      )}

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            disabled={pagination.page <= 1}
            onClick={() => dispatch(setPage(pagination.page - 1))}
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => dispatch(setPage(pagination.page + 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AddJobs;
