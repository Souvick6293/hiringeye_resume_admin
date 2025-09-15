import { Button, Modal } from "flowbite-react";
import { useDispatch } from "react-redux";
import { deleteCateDes, getSingleCateGory } from "../../Reducer/CategorySlice";

const CateDeleteModal = ({
  openDeleteManModal,
  setOpenDeleteManModal,
  desId,
  cateId,
}) => {
  const dispatch = useDispatch();
  const handleYesM = () => {
    dispatch(deleteCateDes({ category_desc_id: desId })).then((res) => {
      if (res?.payload?.status_code === 200) {
        setOpenDeleteManModal(false);
        dispatch(getSingleCateGory({ category_id: cateId }));
      }
    });
  };

  return (
    <>
      <Modal
        show={openDeleteManModal}
        onClose={() => setOpenDeleteManModal(false)}
      >
        <Modal.Header>
          Are You Want to delete this Category Description?
        </Modal.Header>

        <Modal.Body>
          <div className="flex gap-3">
            <div>
              <Button
                className="cnl_btn"
                onClick={() => setOpenDeleteManModal(false)}
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button
                className="bg-[#c291ff] hover:bg-[#454545] px-3 py-0.5 mt-1.5 text-white text-sm font-semibold flex justify-center items-center rounded-md"
                onClick={handleYesM}
                color="success"
                type="button"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
export default CateDeleteModal;
