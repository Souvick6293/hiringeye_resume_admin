import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { ToastContainer } from "react-toastify";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getUsers, userActiveDeactive } from "../../Reducer/UserSlice"; // Adjust path
import { Button } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const LinkdinGenManageUsers = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state?.user);
  const [rowData, setRowData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getUsers(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    if (userData?.data?.length) {
      const mappedData = userData.data.map((user, index) => ({
        id: user.id,
        serial: index + 1,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        organization: user.organization_name ?? "-",
        user_type: user.signup_type_id === 1 ? "Individual" : "Organization",
        status: user.is_active === 1,
        builded_resume: user.builded_resume,
        registration_date: new Date(user.created_at).toLocaleDateString(),
      }));
      setRowData(mappedData);
    }
  }, [userData]);

  const handleToggleStatus = (id, currentStatus) => {
    const updatedRows = rowData.map((row) =>
      row.id === id ? { ...row, status: !currentStatus } : row
    );
    setRowData(updatedRows);
    const encodedId = btoa(id.toString()); // Base64 encode the ID
    dispatch(userActiveDeactive(encodedId)).then((res) => {
      console.log("res", res);
    });

    // Optionally call API to update status here
    // api.patch(`/user/${id}/status`, { status: !currentStatus });
  };

  const columnDefs = [
    {
      headerName: "Serial No.",
      field: "serial",
      sortable: true,
      filter: true,
    },
    {
      headerName: "User Name",
      field: "username",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Email Address",
      field: "email",
      sortable: true,
      filter: true,
    },
    {
      headerName: "User Type",
      field: "user_type",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Account Status",
      field: "status",
      cellRenderer: (params) => {
        const isActive = params.value;
        return (
          <button
            onClick={() => handleToggleStatus(params.data.id, isActive)}
            className={`px-3 py-1 rounded-md text-sm font-medium bg-white border ${isActive ? "border-[#259325]" : "border-[#ff8800]"
              }`}>
            {isActive ? "Active" : "Inactive"}
          </button>
        );
      },
    },
    {
      headerName: "Resume Build",
      field: "builded_resume",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Payment Method",
      field: "payment_method",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Payment Status",
      field: "payment_status",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Registration Date",
      field: "registration_date",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Plan Name",
      field: "plan_name",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Plan Type",
      field: "plan_type",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last Login",
      field: "last_login",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Coupon Code",
      field: "coupon_code",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Total Amount Paid",
      field: "total_amount_paid",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Action",
      field: "details",
      cellRenderer: (params) => (
        <div className="flex gap-2 items-center">
          <div>
            <button type="button">
              <BiSolidMessageSquareEdit size={20} color="#34A0A4" />
            </button>
          </div>
          <div>
            <button type="button">
              <MdDelete size={20} color="red" />
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ToastContainer />
      <div className="wrapper_area my-0 mx-auto p-6 rounded-xl bg-white">
        <div className="h-full lg:h-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">User Details</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded p-2 pr-10 w-72"
              />
              <AiOutlineSearch className="absolute top-2.5 right-3 text-gray-500" size={20} />
            </div>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
              suppressAutoColumns={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkdinGenManageUsers;
