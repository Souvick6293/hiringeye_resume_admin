import { Modal } from "flowbite-react";
import ReactPlayer from "react-player";

const VideoModal = ({ videoModal, setVideoModal, videoPath }) => {
  return (
    <>
      <Modal show={videoModal} onClose={() => setVideoModal(false)}>
        <Modal.Header className="border-0 absolute right-1 top-[-0.75rem]">
          &nbsp;
        </Modal.Header>

        <Modal.Body>
          <div className="rounded-xl">
            {/* <img src={videoFrameNew} alt="videoFrameNew" /> */}
            {videoPath ? (
              <ReactPlayer
                className="w-full h-[260px] lg:h-[500px]"
                url={videoPath}
                width="100%"
                controls={true} // Show player controls
                // playing={true}
                playing={true}
              />
            ) : (
              <>
                <p>No video available</p>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default VideoModal;
