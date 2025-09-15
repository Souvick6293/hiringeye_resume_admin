import { FaCirclePlay } from "react-icons/fa6";
import { MdDelete, MdDownload } from "react-icons/md";
import { logo } from "../../assets/images/images";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getVideo } from "../../Reducer/AddAudioSlice";
import VideoModal from "./VideoModal";

const AudioList = () => {
  const { videoList } = useSelector((state) => state?.audios);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideo());
  }, []);
  console.log("videoList", videoList);
  const [videoModal, setVideoModal] = useState(false);
  const [videoPath, setVideoPath] = useState("");

  const handleVideoModal = (videoData) => {
    setVideoModal(true);
    setVideoPath(videoData);
  };
  return (
    <>
      <div className="video_list">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {videoList?.data?.length > 0 ? (
            videoList?.data?.map((lists) => {
              return (
                <>
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        handleVideoModal(lists?.StoryLink?.[0]?.story_link);
                      }}
                    >
                      <div className="h-full bg-[#FFFFFF] p-2 rounded-2xl overflow-hidden flex justify-center items-center mb-4">
                        <div className="item_box relative">
                          <div className="absolute w-full h-full">
                            <div className="flex justify-center items-center h-full">
                              <div className="item_box_play">
                                <FaCirclePlay className="text-[#3e57da] text-4xl lg:text-5xl" />
                              </div>
                            </div>
                          </div>
                          <img
                            src={lists?.story_avatar}
                            alt="projects02"
                            className="rounded-2xl overflow-hidden"
                          />
                        </div>
                      </div>
                    </button>
                    <div>
                      <div className="min-h-[70px]">
                        <p className="text-[#303030] text-[18px] font-semibold pb-1">
                          {lists?.story_name}
                        </p>
                        <p className="text-[#646363] text-sm font-medium pb-2">
                          {lists?.story_description}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          {/* <div>
                            <button className="bg-[#626ADF] text-xs lg:text-base font-semibold w-full py-1 px-2 rounded-lg text-white hover:bg-[#1a9bd9]">
                              <div className="flex items-center gap-1">
                                <p className="text-sm font-normal">Download</p>
                                <MdDownload />
                              </div>
                            </button>
                          </div> */}
                        </div>
                        {/* <div>
                          <button>
                            <MdDelete className="text-red-600 text-2xl" />
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <p>No data found</p>
          )}
        </div>
        {videoModal && (
          <VideoModal
            videoModal={videoModal}
            setVideoModal={setVideoModal}
            videoPath={videoPath}
          />
        )}
      </div>
    </>
  );
};
export default AudioList;
