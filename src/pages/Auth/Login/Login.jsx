import { Link, useNavigate } from "react-router-dom";
import { LoginImg, logo } from "../../../assets/images/images";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../../Reducer/AuthSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

import AfterLoginModal from "./AfterLoginModal";
import { Checkbox, Label } from "flowbite-react";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  // const domainStatus = localStorage.getItem("domain_status");
  // console.log("domainStatus: ", domainStatus);

  // const subDomainStatus = domainStatus
  //   ? JSON.parse(Base64.decode(domainStatus))
  //   : null;
  // console.log("subDomainStatus: ", subDomainStatus);

  // const signinHandler = () => {
  //   navigate("/dashboard");
  // };
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(" ");
  const [openModal, setOpenModal] = useState(false);

  const { loadingLogin } = useSelector((state) => state?.auth);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const savedUsername = Cookies.get("username");
    const savedPassword = Cookies.get("password");

    if (savedUsername && savedPassword) {
      setValue("username", savedUsername);
      setValue("password", savedPassword);
    }
  }, [setValue]);

  const onSubmit = (data) => {
    dispatch(login(data)).then((res) => {
      console.log("Res: ", res);
      if (res?.payload?.status_code === 200) {
        if (res?.payload?.sub_domain === false) {
          setOpenModal(true);
        } else {
          if (data?.rememberMe) {
            Cookies.set("username", data?.username, { expires: 7 });
            Cookies.set("password", data?.password, { expires: 7 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
          }
          navigate("/dashboard");
        }
      } else if (res?.payload?.status_code === 400) {
        setErrorMessage(res?.payload?.message);
      } else if (res?.payload?.status === 422) {
        setErrorMessage(
          res?.payload?.response?.data?.data?.[0]?.message
            ? res?.payload?.response?.data?.data?.[0]?.message
            : res?.payload?.response?.data?.message
        );
      }
    });
  };
  return (
    <div className="my-0 lg:my-0 mx-4 lg:mx-0 flex justify-center items-center wrapper_bg_area">
      <div className="w-full my-0 mx-auto">
        <div className="flex justify-end h-screen">
          <div className="w-6/12 flex justify-center items-center">
            <div className="w-8/12 bg-white p-10 rounded-[20px]">
              <h1 className="font-semibold text-[37px] leading-[45px] text-black pb-3">
                Login at HiringEye
              </h1>
              <p className="text-[#9D9898] text-[18px] leading-[26px]">
                Access your admin dashboard to manage users, oversee resumes,
                and track platform activity — all in one place.
              </p>
              <div className="login_area">
                {errorMessage && (
                  <h6 className="text-[#ff1a03] text-center mb-4">
                    {errorMessage}
                  </h6>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <Label className="text-[17px] text-[#263A43] font-medium pb-2 block">
                      User name
                    </Label>
                    <input
                      type="text"
                      id="email"
                      className="bg-white border border-[#dfdfdf] text-[#888888] text-sm rounded-lg focus:ring-[#f1d9ff] focus:border-[#f1d9ff] block w-full py-4 px-3"
                      placeholder="Enter your Username or Email Id"
                      {...register("email", { required: true })}
                    />
                    {errors.username && (
                      <small className="text-red-500">
                        User Name is required
                      </small>
                    )}
                  </div>
                  <div className="mb-6">
                    <Label className="text-[17px] text-[#263A43] font-medium pb-2 block">
                      Enter your Password
                    </Label>
                    <input
                      placeholder="Type your password here"
                      type="password"
                      id="password"
                      className="bg-white border border-[#dfdfdf] text-[#888888] text-sm rounded-lg focus:ring-[#f1d9ff] focus:border-[#f1d9ff] block w-full py-4 px-3"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <small className="text-red-500">
                        Password is required
                      </small>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-[#92278F] font-Manrope font-extrabold text-[23px] mb-2 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-[10px] text-xl w-full px-5 py-3 text-center"
                  >
                    {loadingLogin ? "Wait..." : "Log In"}
                  </button>
                  {/* <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex items-center gap-1">
                        <Checkbox id="remember" {...register("rememberMe")} />
                        <Label
                          htmlFor="remember"
                          className="text-[#615D5D] font-normal text-sm"
                        >
                          Remember me!
                        </Label>
                      </div>
                    </div>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <AfterLoginModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default Login;
