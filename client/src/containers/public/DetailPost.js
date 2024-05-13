import React, { useEffect } from "react";
import { createSearchParams, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../store/actions";
import { Slider } from "../../components";
import { UserInfor, RelatedPost } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
import Comment from "./Comment";
import { updatePostLikeStatus } from "../../store/actions/post";

const { FaLocationDot, TbReportMoney, RiCrop2Line, CiHashtag, CiStopwatch } =
  icons;

const DetailPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const { currentData } = useSelector((state) => state.user);
  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }));
  }, [postId, dispatch]);

  const handleFilterLabel = () => {
    const labelCode = posts[0]?.labelData?.code;
    const titleSearch = `Tìm kiếm tin đăng theo chuyện mục ${posts[0]?.labelData?.value}`;
    navigate(
      {
        pathname: `/${path.SEARCH}`,
        search: createSearchParams({ labelCode }).toString(),
      },
      { state: { titleSearch } }
    );
  };

  const handleLikeToggle = (postId, isLiked) => {
    // Dispatch an action to update the like status in the Redux store
    dispatch(updatePostLikeStatus(postId, !isLiked));
  };
  return (
    <div className="w-full flex flex gap-2">
      <div className="w-[70%] ">
        <Slider
          images={
            posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)
          }
        />
        <div className=" bg-white rounded-md shadow-md p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-red-600">
              {posts[0]?.title}
            </h2>
            <div className="flex items-center gap-2">
              <span>Chuyên mục:</span>
              <span
                onClick={handleFilterLabel}
                className="text-blue-600 font-medium hover:text-orange-500 cursor-pointer"
              >
                {posts[0]?.labelData?.value}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <FaLocationDot color="red" />
              <span>{posts[0]?.address}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <TbReportMoney />
                <span className="font-medium text-lg text-green-500">
                  {posts[0]?.attributes?.price}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <RiCrop2Line />
                <span>{posts[0]?.attributes?.acreage}</span>
              </span>
              <span className="flex items-center gap-1">
                <CiStopwatch />
                <span>{posts[0]?.attributes?.published}</span>
              </span>
              <span className="flex items-center gap-1">
                <CiHashtag />
                <span>{posts[0]?.attributes?.hashtag}</span>
              </span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Thông tin mô tả:</h3>
            {/* <div className="flex flex-col gap-2">
              {posts[0]?.description &&
                JSON.parse(posts[0]?.description)?.map((item, index) => {
                  return <span key={index}>{item}</span>;
                })}
            </div> */}
            {/* <div className="flex flex-col gap-2">
              {posts[0]?.description && typeof posts[0]?.description === 'string' && (
                JSON.parse(posts[0]?.description)?.map((item, index) => {
                  return <span key={index}>{item}</span>;
                })
              )}
            </div> */}
            <div className="flex flex-col gap-2">
              {Array.isArray(posts[0]?.description) && posts[0]?.description.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>

          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng:</h3>
            <table>
              <tbody>
                <tr className="w-full flex">
                  <td className="p-2 w-[150px] flex-none ">Mã tin:</td>
                  <td className="p-2 flex-auto">{posts[0]?.overviews?.code}</td>
                </tr>
                <tr className="w-full flex bg-zinc-200">
                  <td className="p-2 w-[150px] flex-none ">Khu vực:</td>
                  <td className="p-2 ">{posts[0]?.overviews?.area}</td>
                </tr>
                <tr className="w-full flex">
                  <td className="p-2 w-[150px] flex-none ">Loại tin rao:</td>
                  <td className="p-2 ">{posts[0]?.overviews?.type}</td>
                </tr>
                <tr className="w-full flex  bg-zinc-200">
                  <td className="p-2 w-[150px] flex-none ">Đối tượng thuê:</td>
                  <td className="p-2 ">{posts[0]?.overviews?.target}</td>
                </tr>
                <tr className="w-full flex">
                  <td className="p-2 w-[150px] flex-none ">Gói tin:</td>
                  <td className="p-2 ">{posts[0]?.overviews?.bonus}</td>
                </tr>
                <tr className="w-full flex  bg-zinc-200">
                  <td className="p-2 w-[150px] flex-none ">Ngày đăng:</td>
                  <td className="p-2 ">{posts[0]?.overviews?.created}</td>
                </tr>
                <tr className="w-full flex">
                  <td className="p-2 w-[150px] flex-none ">Ngày hết hạn:</td>
                  <td className="p-2 ">{posts[0]?.overviews?.expired}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Thông tin liên hệ:</h3>
            <table>
              <tbody>
                <tr className="w-full flex">
                  <td className="p-2 w-[150px] flex-none ">Liên hệ:</td>
                  <td className="p-2 flex-auto">{posts[0]?.user?.name}</td>
                </tr>
                <tr className="w-full flex bg-zinc-200">
                  <td className="p-2 w-[150px] flex-none ">Điện thoại:</td>
                  <td className="p-2 ">{posts[0]?.user?.phone}</td>
                </tr>
                <tr className="w-full flex">
                  <td className="p-2 w-[150px] flex-none ">Zalo:</td>
                  <td className="p-2 ">{posts[0]?.user?.zalo}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Bản đồ:
                            <map address={posts[0]?.address} />
                        </h3>

                    </div> */}
        </div>
        <Comment postId={postId} userId={currentData.id} />
      </div>
      <div className="w-[30%] flex flex-col gap-6">
        <UserInfor userData={posts[0]?.user} onLikeToggle={handleLikeToggle} userId={currentData.id} />
        <RelatedPost />
        <RelatedPost newPost />
      </div>
    </div>
  );
};

export default DetailPost;
