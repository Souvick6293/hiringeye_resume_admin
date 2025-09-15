import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

import small_logo_3 from "../../assets/imagesource/small_logo_3.png";
import { Link } from "react-router-dom";

const AddJobs = () => {
  return (
    <div className="pb-10">
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
          <buton className="bg-[#F3EDFF] hover:bg-[#eddff9] rounded-[5px] px-4 text-[14px] leading-[50px] text-[#6326CB] cursor-pointer inline-flex justify-center items-center gap-1.5">
            <BsFillPlusCircleFill className="text-xl" />
            Add New Job
          </buton>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-[10px] p-9">
          <img src={small_logo_3} alt="small_logo_3" className="mb-3" />
          <h3 className="text-[24px] text-[#6326CB] font-semibold pb-2">
            Sales Manager{" "}
            <span className="text-[16px] text-[#000000] hover:text-[#6326CB] font-medium">
              <Link to="/applicants-list">(100 Applicants)</Link>
            </span>
          </h3>
          <p className="text-[#6C6C6C] text-[16px] pb-4">
            We are looking for a dynamic Sales Manager to lead our sales team
            and drive revenue growth. The role involves developing sales
            strategies..
          </p>
          <button className="bg-[#6326CB] hover:bg-black w-full rounded-[7px] text-[#ffffff] text-[16px] leading-[45px]">
            Edit Job Details
          </button>
        </div>
        <div className="bg-white rounded-[10px] p-9">
          <img src={small_logo_3} alt="small_logo_3" className="mb-3" />
          <h3 className="text-[24px] text-[#6326CB] font-semibold pb-2">
            Sales Manager{" "}
            <span className="text-[16px] text-[#000000] font-medium">
              (100 Applicants)
            </span>
          </h3>
          <p className="text-[#6C6C6C] text-[16px] pb-4">
            We are looking for a dynamic Sales Manager to lead our sales team
            and drive revenue growth. The role involves developing sales
            strategies..
          </p>
          <button className="bg-[#6326CB] hover:bg-black w-full rounded-[7px] text-[#ffffff] text-[16px] leading-[45px]">
            Edit Job Details
          </button>
        </div>
        <div className="bg-white rounded-[10px] p-9">
          <img src={small_logo_3} alt="small_logo_3" className="mb-3" />
          <h3 className="text-[24px] text-[#6326CB] font-semibold pb-2">
            Sales Manager{" "}
            <span className="text-[16px] text-[#000000] font-medium">
              (100 Applicants)
            </span>
          </h3>
          <p className="text-[#6C6C6C] text-[16px] pb-4">
            We are looking for a dynamic Sales Manager to lead our sales team
            and drive revenue growth. The role involves developing sales
            strategies..
          </p>
          <button className="bg-[#6326CB] hover:bg-black w-full rounded-[7px] text-[#ffffff] text-[16px] leading-[45px]">
            Edit Job Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJobs;
