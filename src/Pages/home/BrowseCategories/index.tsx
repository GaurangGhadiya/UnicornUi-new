import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { FreeMode, Navigation, Pagination, Keyboard } from 'swiper';
import { useMutation } from 'react-query';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { ApiPostNoAuth, Bucket } from '../../../services/http-service';
// import { dispatch } from 'react-hot-toast/dist/core/store';
import { useDispatch } from 'react-redux';
import { searching } from 'src/redux/reducer/searchFilterSlice';

SwiperCore.use([FreeMode, Navigation, Pagination, Keyboard]);

const BrowseCategories = () => {
  const dispatch1 = useDispatch();
  const [browseCategoryData, setBrowseCategoryData] = React.useState([]);

  const { mutate: BrowseCategories } = useMutation(
    (data) => ApiPostNoAuth('user/browse_category_pagination', data),
    {
      onSuccess: (response: any) => {
        setBrowseCategoryData(response?.data?.data?.browse_data);
      }
    }
  );

  React.useEffect(() => {


    if (window.location?.search?.split('=')[1]) {
      dispatch1(searching(window.location?.search?.split('=')[1]));
    }
    const body: any = {
      limit: 10,
      page: 1
    };
    BrowseCategories(body);
  }, []);

  return (
    <div className="container section-padding">
      {browseCategoryData?.length > 0 && (
        <div
          className="section-title"
          style={{ position: 'relative', top: '60px' }}
        >
          Browse <span className="gradient-text">Categories</span>
        </div>
      )}

      <div className="items-categories-carousel overflow-hidden swiper-initialized swiper-horizontal swiper-pointer-events">
        <div
          className="swiper-wrapper"
          id="swiper-wrapper-2c883b571f0fea7d"
          aria-live="polite"
        >
          <Swiper
            style={{ height: '100%', paddingTop: '100px' }}
            slidesPerView={3}
            navigation={true}
            keyboard={true}
            spaceBetween={2}
            freeMode={true}
            loop={true}
            loopFillGroupWithBlank={true}
            className="ulswiper1"
          >
            {browseCategoryData?.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <a
                    className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                    data-swiper-slide-index="0"
                    role="group"
                    aria-label="1 / 3"
                    style={{ width: '100%', marginRight: '20px' }}
                    href={`https://www.development.web.unicornui.com/?search=${item?.search}`}
                    target="_blank"
                  // onClick={() => dispatch1(searching(item?.search))}
                  >
                    <div className="category-card turquoise-gradient-diagonal">
                      <div
                        className="category-wrapper"
                        style={{
                          backgroundImage:
                            item?.image === null
                              ? `url('/Image/screen1.png')`
                              : `url(${Bucket + item?.image})`
                        }}
                      >
                        <div className="category-content">
                          <div className="category-title">{item.name}</div>
                          <div className="category-meta">
                            {item.postCount} Items
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Swiper
            style={{ height: '100%', paddingTop: '100px' }}
            slidesPerView={1}
            navigation={true}
            keyboard={true}
            spaceBetween={2}
            freeMode={true}
            loop={true}
            loopFillGroupWithBlank={true}
            className="ulswiper2"
          >
            {browseCategoryData?.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    onClick={() => dispatch1(searching(item?.search))}
                    className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                    data-swiper-slide-index="0"
                    role="group"
                    aria-label="1 / 3"
                    style={{ width: '100%', marginRight: '20px' }}
                  >
                    <div className="category-card turquoise-gradient-diagonal">
                      <div className="category-wrapper">
                        <div className="category-content">
                          <div className="category-title">{item.name}</div>
                          <div className="category-meta">
                            {item.postCount} Items
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BrowseCategories;
