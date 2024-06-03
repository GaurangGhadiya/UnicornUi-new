import React, { useEffect, useState } from 'react';
import { GiTargetDummy } from 'react-icons/gi';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Bucket } from 'src/helpers/API/ApiData';
import { ApiGetNoAuth } from 'src/services/http-service';
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
// import { Skeleton } from '@mui/material';

SwiperCore.use([FreeMode, Navigation, Pagination, Keyboard, Autoplay]);

const Htmlbanner = () => {
  const [data, setData] = useState<any>([]);

  const getAdv = async () => {
    ApiGetNoAuth('user/adv').then((res: any) => {
      let dymmy = [];

      for (let i = 0; i < 1; i++) {
        for (let j = 0; j < res.data.data?.length; j++) {
          dymmy.push(res.data.data[j]);
        }
      }

      setData(dymmy);
    });
  };
  useEffect(() => {
    getAdv();
  }, []);

  console.log('data data', data);

  return (
    <>
      {data.length === 1 ? (
        data.map((item: any) => (
          <div className="section-padding fullwidth-banner">
            <div
              className="banner-overlay"
              style={{ backgroundImage: Bucket + item?.image }}
            ></div>
            <div className="search-form-with-text section-small">
              <div className="text-content">
                <div className="subtitle">{item?.title}</div>
                <div className="title">{item?.description}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="">
          <div id="" className="">
            <div className=" header-slider">
              <Swiper
                slidesPerView={2}
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
                    slidesPerView: 2,
                    spaceBetween: 15
                  },
                  '@1.50': {
                    slidesPerView: 2,
                    spaceBetween: 15
                  }
                }}
                centeredSlides={true}
                // centeredSlidesBounds={true}
                initialSlide={3}
                navigation={true}
                // keyboard={true}
                spaceBetween={30}
                loop={true}
                className="mySwiper"
                loopFillGroupWithBlank={true}
                onLoad={() => <h1>loading</h1>}
                style={{ paddingTop: '30px' }}
                onLazyImageLoad={() => <h1>loading</h1>}
              // autoplay={true}

              // autoplaySpeed={1000}
              >
                {data?.map((item: any, i: any) => (
                  // <div className=" header-height">
                  <SwiperSlide
                    key={`slide-${i}`}
                    className=" header-height"
                  // style={{ height: '640px' }}
                  >
                    {item?.image ? (
                      <div
                        id={`slide-${i}`}
                        className={`swiper-slide slide-content-align-right header_img position-relative inner-text`}
                      >
                        {item?.image ? (
                          <img
                            src={Bucket + item?.image}
                            alt="Slide Image swiper-lazy"
                            style={{
                              height: '100%',
                              borderRadius: '30px',
                              objectFit: 'cover',
                              width: '100%'
                            }}
                          // className="header_img"
                          />
                        ) : (
                          <h1>Loading image</h1>
                        )}
                        <div className="slider-overlay"></div>
                        <div
                          className=" position-absolute text-left"
                          style={{ left: '10%', bottom: '5%' }}
                        >
                          <div className="item-info text-start">
                            <div className="slider-description">
                              {item?.description}
                            </div>

                            <div className="slider-title ">
                              {item?.title}
                            </div>

                            {item?.link && (
                              <div
                                className="btn px-5 py-3  gradient-background border-none rounded-border"
                                onClick={() => window.open(item.link)}
                              >
                                Explore Now!
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <h1>Loading image</h1>
                    )}
                  </SwiperSlide>
                  // </div>
                ))}
              </Swiper>
            </div>
            {/* <div className="homeslider-nav">
                <div className="swiper-button-next">
                  <MdArrowForwardIos />
                </div>
                <div className="swiper-button-prev">
                  <MdArrowBackIosNew />
                </div>
              </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Htmlbanner;
