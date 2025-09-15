import { Button, Label, Modal, TextInput } from "flowbite-react";
import {
  getZoneList,
  getZoneListSingle,
  updateZone,
} from "../../Reducer/ZoneSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateZoneModal = ({ openUpdateModal, setOpenUpdateModal, zoneId }) => {
  const dispatch = useDispatch();
  const { singleZone } = useSelector((state) => state?.zone);
  useEffect(() => {
    dispatch(getZoneListSingle({ zone_id: zoneId }));
  }, [zoneId]);
  console.log("singleZone", singleZone);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setValue("zone_name", singleZone?.result?.[0]?.zone);
  }, [zoneId, setValue, singleZone]);
  const onSubmit = (data) => {
    dispatch(updateZone({ ...data, zone_id: zoneId })).then((res) => {
      console.log("Res", res);
      if (res?.payload?.status_code === 200) {
        setOpenUpdateModal(false);
        dispatch(getZoneList());
      } else if (res?.payload?.response?.data?.status_code === 400) {
        toast.error(res?.payload?.response?.data?.message);
      }
    });
  };
  return (
    <>
      <Modal show={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
        <Modal.Header>Update Zone</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Zone Name" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Enter Zone name"
                  {...register("zone_name")}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="cnl_btn"
              onClick={() => setOpenUpdateModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#c291ff] hover:bg-[#454545] px-3 py-0.5 mt-1.5 text-white text-sm font-semibold flex justify-center items-center rounded-md"
              color="success"
              type="submit"
            >
              Update Zone
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default UpdateZoneModal;
