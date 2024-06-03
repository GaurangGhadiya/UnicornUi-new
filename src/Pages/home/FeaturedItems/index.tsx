import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  FreeMode,
  Navigation,
  Pagination,
  Keyboard,
  Autoplay
} from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { ApiGet, ApiPost, ApiPostNoAuth } from 'src/helpers/API/ApiData';
import ItemCard from 'src/components/itemCard';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import {
  isOpenModal,
  openModal,
  userProfile
} from 'src/redux/reducer/profileUpdateSlice';
import Loader from 'src/components/loader';
import { ErrorToast } from 'src/helpers/Toast';

SwiperCore.use([FreeMode, Navigation, Pagination, Keyboard, Autoplay]);

const FeaturedItems = () => {
  const [featurePostData, setFeaturePostData] = React.useState([]);
  const dispatch = useDispatch();
  const userProfileData = useSelector(userProfile);

  let body = {
    limit: 10,
    page: 1
  };

  let body2 = {
    limit: 10,
    page: 1
  };

  const { mutate: noAuthFetchFeaturePost } = useMutation(
    () => ApiPostNoAuth('user/get_feature_post', body),
    {
      onSuccess: (res: any) => {
        setFeaturePostData(res?.data?.data?.post_data);
      }
    }
  );

  const { mutate: AuthFetchFeaturePost } = useMutation(
    () => ApiPost('/get_feature_post', body2),
    {
      onSuccess: (res: any) => {
        // setTimeout(() => {
        setFeaturePostData(res?.data?.post_data);
        // }, 1000);
      }
    }
  );

  const postLike = (productId: any) => {
    if (localStorage.getItem('logindata')) {
      ApiGet(`/post/like_post/${productId}`).then(() => {
        AuthFetchFeaturePost();
      });
    } else {
      dispatch(openModal('1'));
      dispatch(isOpenModal(true));
    }
  };

  React.useEffect(() => {
    userProfileData ? AuthFetchFeaturePost() : noAuthFetchFeaturePost();
  }, [userProfileData]);

  console.log('featurePostData -> ', featurePostData);

  return (
    <div className="primary-content-area ">
      <div className="container">
        {/* {featurePostData?.length > 0 && ( */}
        <div
          className="section-title"
          style={{ position: 'relative', top: '60px' }}
        >
          <span className="gradient-text">Featured</span> Items
        </div>
        {/* )} */}
        {featurePostData.length === 0 ? (
          <div className="mt-5 pt-5">
            <Loader />
          </div>
        ) : (
          <Swiper
            slidesPerView={4}
            navigation={true}
            keyboard={true}
            // spaceBetween={1}
            breakpoints={{
              '@0.00': {
                slidesPerView: 1,
                spaceBetween: 10
              },
              '@0.75': {
                slidesPerView: 2,
                spaceBetween: 15
              },
              '@1.00': {
                slidesPerView: 3,
                spaceBetween: 15
              },
              '@1.50': {
                slidesPerView: 4,
                spaceBetween: 15
              }
            }}
            autoplay={{
              delay: 2500000,
              disableOnInteraction: false
            }}
            freeMode={true}
            loop={true}
            loopFillGroupWithBlank={true}
            className="slide1"
            style={{ paddingTop: '100px' }}
          >
            {featurePostData?.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <ItemCard
                    productId={item._id}
                    totalLikes={item.totalLikes}
                    thumbnail={item.thumbnail}
                    subcategory={item.subcategory}
                    subCategoryId={item?.subCategoryId}
                    title={item.title}
                    software={item.software}
                    image={item.user[0]?.image ?? undefined}
                    username={item?.user[0]?.username}
                    userId={item?.user[0]?._id}
                    isCreator={item?.user[0]?.isCreator}
                    price={item.price}
                    like={item?.like}
                    postLike={postLike}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default FeaturedItems;
