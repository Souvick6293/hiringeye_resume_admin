import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { ToastContainer } from "react-toastify";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getUsers, userActiveDeactive } from "../../Reducer/UserSlice";
import { MdDelete } from "react-icons/md";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { userData, loading, page, limit, app_id } = useSelector((state) => state.user);

  const gridApi = useRef(null);

  const [rowData, setRowData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 

  // Fetch Data
   const fetchData = useCallback(() => {
    dispatch(getUsers({ page, limit, searchQuery, app_id }));
  }, [page, limit, searchQuery, app_id, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Map data for grid
  useEffect(() => {
    if (userData?.data?.length) {
      const mappedData = userData.data.map((user, index) => ({
        id: user.id,
        serial: (page - 1) * limit + index + 1,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        organization: user.organization_name ?? "-",
        user_type: user.signup_type_id === 1 ? "Individual" : "Organization",
        status: user.is_active === 1,
        builded_resume: user.builded_resume,
        registration_date: new Date(user.created_at).toLocaleDateString(),
        plan_detail: user?.plan_detail?.plan_name || "No Plan",
      }));
      setRowData(mappedData);
    } else {
      setRowData([]);
    }
  }, [userData, page]);

  // Toggle user active/inactive status
  const handleToggleStatus = (id, currentStatus) => {
    const updatedRows = rowData.map((row) =>
      row.id === id ? { ...row, status: !currentStatus } : row
    );
    setRowData(updatedRows);
    dispatch(userActiveDeactive(id));
  };

  // Column definitions
  const columnDefs = useMemo(() => [
    { headerName: "Serial No.", field: "serial", sortable: true, filter: true },
    { headerName: "User Name", field: "username", sortable: true, filter: true },
    { headerName: "Email Address", field: "email", sortable: true, filter: true },
    { headerName: "User Type", field: "user_type", sortable: true, filter: true },
    {
      headerName: "Account Status",
      field: "status",
      cellRenderer: (params) => (
        <button
          onClick={() => handleToggleStatus(params.data.id, params.value)}
          className={`w-[80px] py-1 rounded-lg text-sm font-sm bg-white border ${params.value
              ? "border-[#259325] text-[#259325] bg-[#fffaeb]"
              : "border-[#ff8800] text-[#ff8800] bg-[#f5fffb]"
            }`}
        >
          {params.value ? "Active" : "Inactive"}
        </button>
      ),
    },
    { headerName: "Registration Date", field: "registration_date" },
    { headerName: "Plan", field: "plan_detail" },
    { headerName: "Last Login", field: 'last_login' },
    {
      headerName: "Action",
      field: "details",
      cellRenderer: (params) => (
        <div className="flex gap-2 items-center">
          <button>
            <BiSolidMessageSquareEdit size={20} color="#34A0A4" />
          </button>
          <button>
            <MdDelete size={20} color="red" />
          </button>
        </div>
      ),
    },
  ], [rowData]);

  // Pagination change handler
 const onPaginationChanged = useCallback(() => {
    if (gridApi.current) {
      const currentPage = gridApi.current.api.paginationGetCurrentPage() + 1;
      if (currentPage !== page) {
        dispatch(setPage(currentPage));
      }
    }
  }, [page, dispatch]);

  return (
    <div>
      <ToastContainer />
      <div className="wrapper_area my-0 mx-auto p-6 rounded-xl bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">User Details</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Name"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1); // reset to first page when searching
              }}
              className="border rounded p-2 pr-10 w-72"
            />
            <AiOutlineSearch className="absolute top-2.5 right-3 text-gray-500" size={20} />
          </div>
        </div>

        <div className="ag-theme-alpine" style={{ height: 600, width: "100%", overflow: "auto" }}>
          <AgGridReact
            ref={gridApi}
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={limit}
            domLayout="autoHeight"
            onPaginationChanged={onPaginationChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
