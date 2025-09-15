import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSingleTags, getTags, updateTags } from "../../Reducer/TagSlice";
import { toast } from "react-toastify";

const UpdateTagModal = ({
  openUpdateTagModal,
  setOpenUpdateTagModal,
  tagId,
}) => {
  const { singleTag } = useSelector((state) => state?.tagsData);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(getSingleTags({ tag_id: tagId }));
  }, [tagId]);
  useEffect(() => {
    setValue("tag_name", singleTag?.result?.[0]?.tags);
  }, [setValue, tagId, singleTag]);

  const onSubmit = (data) => {
    dispatch(updateTags({ ...data, tag_id: tagId })).then((res) => {
      console.log("res", res);

      if (res?.payload?.status_code === 200) {
        setOpenUpdateTagModal(false);
        dispatch(getTags());
      } else if (res?.payload?.response?.data?.status_code === 422) {
        toast.error(res?.payload?.response?.data?.data?.[0]?.message);
      }
    });
  };

  return (
    <>
      <Modal
        show={openUpdateTagModal}
        onClose={() => setOpenUpdateTagModal(false)}
      >
        <Modal.Header>Update Tag</Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Tag" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Enter Tag"
                  {...register("tag_name")}
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
              Update Tags
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default UpdateTagModal;
