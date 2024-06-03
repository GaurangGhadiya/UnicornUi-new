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

SwiperCore.use([FreeMode, Navigation, Pagination, Keyboard, Autoplay]);

const RealatedPost = (props: any) => {
  const { postId, subCategory, subcategoryName } = props;
  const [featurePostData, setFeaturePostData] = React.useState([]);
  const location = window.location.pathname.split('/')[1];
  console.log('location', location);

  const fetchFeaturePost = async () => {
    const type = 'user/post/related';
    const body = {
      subCategoryId: subCategory,
      postId: postId,
      page: 1,
      limit: 10
    };

    if (localStorage.getItem('logindata')) {
      await ApiPost('/post/related', body)
        .then((response: any) => {
          setFeaturePostData(response?.data?.post_data);
        })
        .catch((e) => {
          //eslint-disable-next-line
        });
    } else {
      await ApiPostNoAuth(type, body)
        .then((response: any) => {
          setFeaturePostData(response?.data?.data?.post_data);
        })
        .catch((e) => {
          //eslint-disable-next-line
        });
    }
  };

  React.useEffect(() => {
    fetchFeaturePost();
  }, [props]);

  const postLike = (productId: any) => {
    ApiGet(`/post/like_post/${productId}`).then(() => {
      fetchFeaturePost();
    });
  };

  console.log('featurePostData', featurePostData);

  return (
    <div className="primary-content-area mb-5">
      <div className="container">
        {featurePostData?.length > 0 && (
          <div
            className="section-title"
            style={{ position: 'relative', top: '60px' }}
          >
            <span className="gradient-text">Releated</span> Posts
          </div>
        )}

        <Swiper
          slidesPerView={4}
          navigation={true}
          keyboard={true}
          spaceBetween={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          freeMode={true}
          loop={true}
          loopFillGroupWithBlank={true}
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
          className={`slide1 ${location === 'productdetail' ? 'pb-5' : ''}`}
          style={{ paddingTop: '100px' }}
        >
          {featurePostData?.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <ItemCard
                  isRelated={true}
                  productId={item._id}
                  totalLikes={item.totalLikes}
                  thumbnail={item.thumbnail}
                  subcategory={item?.sub_category?.[0]?.name}
                  category={item?.category?.[0]?.name}
                  title={item.title}
                  software={item.software}
                  image={
                    item?.user?.length > 0 ? item?.user[0]?.image : undefined
                  }
                  username={
                    item?.user?.length > 0
                      ? item?.user[0]?.username
                      : 'Username'
                  }
                  isCreator={item?.user[0]?.isCreator}
                  price={item.price}
                  like={item?.like}
                  postLike={postLike}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default RealatedPost;
