import React from 'react';
import { BsCheck } from 'react-icons/bs';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import SwiperCore, { FreeMode, Navigation, Pagination, Keyboard } from 'swiper';
import UseNav from 'src/Hooks/Header/UseNav';
import { Link } from 'react-router-dom';
SwiperCore.use([FreeMode, Navigation, Pagination, Keyboard]);

const HtmlTwoSlider = () => {
  const navData = UseNav();

  return (
    <div className="container ">
      <div
        className="section-title"
        style={{ position: 'relative', top: '60px' }}
      >
        Featured <span className="gradient-text">Sellers</span>
      </div>

      <div className="featured-sellers-carousel overflow-hidden swiper-initialized swiper-horizontal swiper-pointer-events">
        <div
          className="swiper-wrapper"
          id="swiper-wrapper-6f465279161d749a"
          aria-live="polite"
        >
          <Swiper
            style={{ paddingTop: '90px' }}
            slidesPerView={2}
            navigation={true}
            keyboard={true}
            spaceBetween={2}
            freeMode={true}
            loop={true}
            loopFillGroupWithBlank={true}
            className="mySwiper1"
          >
            <SwiperSlide>
              <div
                className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next"
                data-swiper-slide-index="1"
                role="group"
                aria-label="2 / 2"
              >
                <div className="seller-card">
                  <div className="about-seller">
                    <div className="seller-info">
                      <div className="avatar box-64">
                        <Link to="">
                          <img src={'/Image/avatar-2.png'} alt="avatar" />
                        </Link>
                        <span className="verified">
                          <svg className="crumina-icon">
                            <BsCheck />
                          </svg>
                        </span>
                      </div>
                      <div className="seller-meta">
                        <div className="title">Jackie Jones</div>
                        <div className="meta">@JackieJ</div>
                      </div>
                    </div>
                    <div className="seller-stats">
                      <div className="seller-score">
                        <div className="number title">53</div>
                        <div className="label">Total Items</div>
                      </div>
                      <div className="seller-score">
                        <div className="number title">10.7K</div>
                        <div className="label">Total Sales</div>
                      </div>
                      <div className="seller-score">
                        <div className="number title">4.9 / 5</div>
                        <div className="label">Avg.Rating</div>
                      </div>
                    </div>
                  </div>
                  <div className="seller-products">
                    <div className="products-previews">
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-37.png'} alt="" />
                        </Link>
                      </div>
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-38.png'} alt="" />
                        </Link>
                      </div>
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-39.png'} alt="" />
                        </Link>
                      </div>
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-40.png'} alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="more-link">
                      <Link to="">
                        <svg className="crumina-icon">
                          <BiDotsHorizontalRounded />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                data-swiper-slide-index="0"
                role="group"
                aria-label="1 / 2"
              >
                <div className="seller-card">
                  <div className="about-seller">
                    <div className="seller-info">
                      <div className="avatar box-64">
                        <Link to="">
                          <img src={'/Image/avatar.png'} alt="avatar" />
                        </Link>
                        <span className="verified">
                          <svg className="crumina-icon">
                            <BsCheck />
                          </svg>
                        </span>
                      </div>
                      <div className="seller-meta">
                        <div className="title">
                          {navData?.parsedLoginData?.name}
                        </div>
                        <div className="meta">
                          @{navData?.parsedLoginData?.username}
                        </div>
                      </div>
                    </div>
                    <div className="seller-stats">
                      <div className="seller-score">
                        <div className="number title">179</div>
                        <div className="label">Total Items</div>
                      </div>
                      <div className="seller-score">
                        <div className="number title">13.5K</div>
                        <div className="label">Total Sales</div>
                      </div>
                      <div className="seller-score">
                        <div className="number title">4.8 / 5</div>
                        <div className="label">Avg.Rating</div>
                      </div>
                    </div>
                  </div>
                  <div className="seller-products">
                    <div className="products-previews">
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-41.png'} alt="" />
                        </Link>
                      </div>
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-42.png'} alt="" />
                        </Link>
                      </div>
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-43.png'} alt="" />
                        </Link>
                      </div>
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-44.png'} alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="more-link">
                      <Link to="">
                        <svg className="crumina-icon">
                          <BiDotsHorizontalRounded />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <Swiper
            style={{ paddingTop: '90px' }}
            slidesPerView={1}
            navigation={true}
            keyboard={true}
            spaceBetween={2}
            freeMode={true}
            loop={true}
            loopFillGroupWithBlank={true}
            className="mySwiper2"
          >
            <SwiperSlide>
              <div
                className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next"
                data-swiper-slide-index="1"
                role="group"
                aria-label="2 / 2"
              >
                <div className="seller-card">
                  <div className="about-seller">
                    <div className="seller-info">
                      <div className="avatar box-64">
                        <Link to="">
                          <img src={'/Image/avatar-2.png'} alt="avatar" />
                        </Link>
                        <span className="verified">
                          <svg className="crumina-icon">
                            <BsCheck />
                          </svg>
                        </span>
                      </div>
                      <div className="seller-meta">
                        <div className="title">Jackie Jones</div>
                        <div className="meta">@JackieJ</div>
                      </div>
                    </div>
                    <div className="seller-stats">
                      <div className="seller-score">
                        <div className="number title">53</div>
                        <div className="label">Total Items</div>
                      </div>
                      <div className="seller-score">
                        <div className="number title">10.7K</div>
                        <div className="label">Total Sales</div>
                      </div>
                      <div className="seller-score">
                        <div className="number title">4.9 / 5</div>
                        <div className="label">Avg.Rating</div>
                      </div>
                    </div>
                  </div>
                  <div className="seller-products">
                    <div className="products-previews">
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-37.png'} alt="" />
                        </Link>
                      </div>
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-38.png'} alt="" />
                        </Link>
                      </div>
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-39.png'} alt="" />
                        </Link>
                      </div>
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-40.png'} alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="more-link">
                      <Link to="">
                        <svg className="crumina-icon">
                          {/* <use xlink:href="#dots-icon"></use> */}
                          <BiDotsHorizontalRounded />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
                data-swiper-slide-index="0"
                role="group"
                aria-label="1 / 2"
              >
                <div className="seller-card">
                  <div className="about-seller">
                    <div className="seller-info">
                      <div className="avatar box-64">
                        <Link to="">
                          <img src={'/Image/avatar.png'} alt="avatar" />
                        </Link>
                        <span className="verified">
                          <svg className="crumina-icon">
                            <BsCheck />
                          </svg>
                        </span>
                      </div>
                      <div className="seller-meta">
                        <div className="title">Dexter Stark</div>
                        <div className="meta">@DexterStark</div>
                      </div>
                    </div>
                    <div className="seller-stats">
                      <div className="seller-score">
                        <div className="number title">179</div>
                        <div className="label">Total Items</div>
                      </div>
                      <div className="seller-score">
                        <div className="number title">13.5K</div>
                        <div className="label">Total Sales</div>
                      </div>
                      <div className="seller-score">
                        <div className="number title">4.8 / 5</div>
                        <div className="label">Avg.Rating</div>
                      </div>
                    </div>
                  </div>
                  <div className="seller-products">
                    <div className="products-previews">
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-41.png'} alt="" />
                        </Link>
                      </div>
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-42.png'} alt="" />
                        </Link>
                      </div>
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-43.png'} alt="" />
                        </Link>
                      </div>
                      <div className="preview-box">
                        <Link to="">
                          <img src={'/Image/project-thumb-44.png'} alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="more-link">
                      <Link to="">
                        <svg className="crumina-icon">
                          <BiDotsHorizontalRounded />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <span
          className="swiper-notification"
          aria-live="assertive"
          aria-atomic="true"
        ></span>
      </div>
    </div>
  );
};

export default HtmlTwoSlider;
