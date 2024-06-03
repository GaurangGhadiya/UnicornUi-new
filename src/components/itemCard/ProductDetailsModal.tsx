import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsCheck } from 'react-icons/bs';
import {
  AiFillBehanceCircle,
  AiFillDribbbleCircle,
  AiFillHeart
} from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';
import {
  FaFacebookF,
  FaGithub,
  FaNewspaper,
  FaTwitter,
  FaWhatsapp
} from 'react-icons/fa';
import { FaGamepad } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import RealatedPost from 'src/Pages/products-detail/RelatedPost';
import { ApiGetNoAuth, Bucket } from '../../services/http-service';
import { ApiGet, ApiPost } from 'src/helpers/API/ApiData';
import { useDispatch, useSelector } from 'react-redux';
import {
  isOpenModal,
  openModal,
  userProfile
} from 'src/redux/reducer/profileUpdateSlice';
import moment from 'moment';
import UseNav from 'src/Hooks/Header/UseNav';
import ShowMoreText from 'react-show-more-text';
import { GoVerified } from 'react-icons/go';

import SVG, { Props as SVGProps } from 'react-inlinesvg';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

import { Dialog, DialogContent } from '@material-ui/core';
import { Dropdown } from 'react-bootstrap';
import { HiDotsVertical } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';
import { MdReport } from 'react-icons/md';
import { IoMdShareAlt } from 'react-icons/io';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ErrorToast, SuccessToast } from 'src/helpers/Toast';
let mainstring = '';
const ProductDetailsModal = (props: any) => {
  const history = useHistory();
  const { productId, fetchUserPostLike, search } = props;
  const [mainimage, setmainimage] = useState<any>('');
  const [report, setReport] = useState<any>('');
  const [states, setState] = useState<any>(
    `http://localhost:3000/productdetail/${productId}`
  );
  const [imageIndex, setimageIndex] = useState<number>(0);
  const [price, setPrice] = useState<any>('1');
  const [shareFlag, setShareFlag] = useState<boolean>(false);
  const [reportFlag, setReportFlag] = useState<boolean>(false);
  const [activeFlag, setactiveFlag] = useState<boolean>(false);
  const [productdata, setproductdata] = useState<any>([]);
  const [isPrimium, setisPrimium] = useState<boolean>(false);
  const [premiumPrice, setpremiumPrice] = useState<any>();
  const [borderC, setBorderC] = useState('border border-danger');

  const dispatch = useDispatch();
  const userProfileData = useSelector(userProfile);
  const navData: any = UseNav();

  React.useEffect(() => {
    if (localStorage.getItem('logindata')) {
      setisPrimium(
        JSON.parse(localStorage.getItem('logindata') || '')?.isPlanPurchase
      );
    }

    ApiGet('/plan').then((res: any) => {
      setpremiumPrice(res?.data[1]?.price);
    });
  }, []);

  const img = (value: any, i: number) => {
    setmainimage(value);
    setimageIndex(i);
    setBorderC('');
    setactiveFlag(true);
  };
  const refetch = () => {
    ApiGet('/post/get_by/' + productId)
      .then((res: any) => {
        window.console.log('post/get', res?.data?.post_data);
        setproductdata(res?.data?.post_data);
      })
      .catch((err: any) => {
        window.console.log(err);
      });
  };
  const refetch2 = () => {
    ApiGetNoAuth('user/post/get_by/' + productId)
      .then((res: any) => {
        setproductdata(res?.data?.data?.post_data);
      })
      .catch((err: any) => {
        window.console.log(err);
      });
  };

  // const { refetch } = useQuery(
  //   'fetchUserPostGetBy',
  //   () => ApiGetNoAuth('user/post/get_by/' + productId),
  //   {
  //     onSuccess: (response: any) => {
  //       setproductdata(response?.data?.data?.post_data);
  //     }
  //   }
  // );

  const postLike = (productId: any) => {
    if (localStorage.getItem('logindata')) {
      ApiGet(`/post/like_post/${productId}`).then(() => {
        refetch();
      });
    } else {
      dispatch(openModal('1'));
      dispatch(isOpenModal(true));
    }
  };

  const download = (v: any) => {
    if (localStorage.getItem('logindata')) {
      ApiGet('/download/add_download/' + v._id + '/' + (price - 1))
        .then((res: any) => {
          let name = v.title;
          let a = document.createElement('a');
          let url = Bucket + res?.data?.url;
          a.href = url;
          a.setAttribute('download', name);
          a.click();
        })
        .catch((err: any) => {
          window.console.log(err);
        });
    } else {
      dispatch(openModal('1'));
      dispatch(isOpenModal(true));
    }
  };

  const saveForLater = (id: any) => {
    if (localStorage.getItem('logindata')) {
      ApiGet(`/post/favorite_post/${id}`).then(() => {
        refetch();
        navData?.getCount();
        fetchUserPostLike(search);
      });
    } else {
      dispatch(openModal('1'));
      dispatch(isOpenModal(true));
    }
  };

  const share = () => {
    let extratag = productdata[0].title;
    mainstring = extratag.split(' ').join('%20');
    setShareFlag(!shareFlag);
  };

  const sendReport = (e: any) => {
    e.preventDefault();
    if (localStorage.getItem('logindata')) {
      if (report) {
        let body = {
          message: report,
          postId: productId
        };
        ApiPost(`/report`, body)
          .then((res: any) => {
            // refetch();
            setReportFlag(!reportFlag);
            SuccessToast(res?.message);
            // navData?.getCount();
          })
          .catch((error: any) => {
            //eslint-disable-next-line
          });
      } else {
        ErrorToast('Message is Requried');
      }
    } else {
      dispatch(openModal('1'));
      dispatch(isOpenModal(true));
    }
  };

  React.useEffect(() => {
    // window.scrollTo(0, 0);
    if (localStorage.getItem('logindata')) {
      refetch();
    } else {
      refetch2();
    }
  }, []);
  console.log('productData', productdata);

  return (
    <>
      <div className="primary-content-area p-4 product-page-ds">
        <div
          className="main-content-area product-ds w-100 qwewer"
          style={{ width: '68vw' }}
        >
          <div className="product-image werert">
            <figure className="product-image">
              <img
                src={mainimage ? mainimage : Bucket + productdata[0]?.thumbnail}
                data-zoom-image="images/product/product-3-1-800x900.jpg"
                className="curveImage"
                alt="Unicorn UI"
              />
            </figure>
            <div className="product-thumbnail">
              <Swiper
                slidesPerView={5}
                navigation={false}
                keyboard={true}
                spaceBetween={0}
                freeMode={true}
                loop={false}
                loopFillGroupWithBlank={false}
                className="mySwiper123"
                breakpoints={{
                  '@0.00': {
                    slidesPerView: 2,
                    spaceBetween: 10
                  },
                  '@0.75': {
                    slidesPerView: 4,
                    spaceBetween: 20
                  },
                  '@1.00': {
                    slidesPerView: 5,
                    spaceBetween: 10
                  },
                  '@1.50': {
                    slidesPerView: 5,
                    spaceBetween: 10
                  }
                }}
              >
                <SwiperSlide>
                  {imageIndex === -1 ? (
                    <div
                      className={`product-thumbnail active `}
                      onClick={() =>
                        img(Bucket + productdata[0]?.thumbnail, -1)
                      }
                    >
                      <div className={` ${activeFlag && 'borderColor'}`}>
                        <img
                          className={`curveImage fix-img ${
                            activeFlag && 'border border-3 border-white'
                          }`}
                          src={Bucket + productdata[0]?.thumbnail}
                          alt="product thumbnail"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`product-thumbnail`}
                      onClick={() =>
                        img(Bucket + productdata[0]?.thumbnail, -1)
                      }
                    >
                      <div className={`${!activeFlag && 'borderColor'}`}>
                        <img
                          className={`curveImage fix-img ${
                            !activeFlag && 'border border-3 border-white'
                          }`}
                          src={Bucket + productdata[0]?.thumbnail}
                          alt="product thumbnail"
                        />
                      </div>
                    </div>
                  )}
                </SwiperSlide>

                {productdata[0]?.image &&
                  productdata[0]?.image.map((value: any, i: number) => {
                    return (
                      <SwiperSlide>
                        {i === imageIndex ? (
                          <div
                            key={i}
                            className={`product-thumbnail active`}
                            onClick={() => img(Bucket + value, i)}
                            style={{ height: '114px' }}
                          >
                            <div className={`${activeFlag && 'borderColor'}`}>
                              <img
                                className={`curveImage fix-img ${
                                  activeFlag && 'border border-3 border-white'
                                }`}
                                src={Bucket + value}
                                alt="product thumbnail"
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div
                            key={i}
                            className="product-thumbnail"
                            onClick={() => img(Bucket + value, i)}
                          >
                            <img
                              className="curveImage fix-img"
                              src={Bucket + value}
                              alt="product thumbnail"
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                        )}
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>

            {/* {imageIndex === -1 ? (
              <figure className="product-image" style={{ height: '590px' }}>
                <img
                  src={
                    mainimage ? mainimage : Bucket + productdata[0]?.thumbnail
                  }
                  data-zoom-image="images/product/product-3-1-800x900.jpg"
                  className="curveImage h-100"
                  alt="Unicorn UI"
                />
              </figure>
            ) : (
              <div className="d-flex justify-content-center">
                <figure
                  className="product-image"
                  style={{ width: '250px', height: '550px' }}
                >
                  <img
                    src={
                      mainimage ? mainimage : Bucket + productdata[0]?.thumbnail
                    }
                    data-zoom-image="images/product/product-3-1-800x900.jpg"
                    className="curveImage h-100"
                    alt="Unicorn UI"
                  />
                </figure>
              </div>
            )} */}
          </div>

          {/* <div className="product-info">
            <div className="tabs-block swiper-container">
              <div className="swiper-nav">
                <ul className="tabs-list swiper-wrapper">
                  <li className="active">
                    <a>
                      Comments <span className="count">2</span>
                    </a>
                  </li>
                </ul>
              </div>

              <ul className="tabs-list swiper-wrapper">
                <li className="swiper-slide active">
                  <a>
                    Comments <span className="count">2</span>
                  </a>
                </li>
              </ul>
              <div className="tabs-content-wrapper">
                <div className="tab active">
                  <div className="tab-content">
                    <ul className="comments-list">
                      <li className="comment-item has-children">
                        <div className="comment-item-wrapper">
                          <div className="avatar-block">
                            <div className="avatar box-42">
                              <Link to="">
                                <img src={'/Image/avatar.png'} alt="avatar" />
                                {userProfileData?.isCreator && (
                                  <span className="verified">
                                    <BsCheck />
                                  </span>
                                )}
                              </Link>
                            </div>
                            <div className="avatar-meta">
                              <div className="avatar-title">
                                <Link to="">Dexter Stark</Link>
                              </div>
                              <div className="avatar-meta">@dexterstark</div>
                            </div>
                          </div>
                          <div className="comment-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco...
                          </div>
                          <div className="comment-meta">
                            <div className="publish-date">2 hours ago</div>
                            <div className="reply">
                              <Link to="">Reply</Link>
                            </div>
                          </div>
                        </div>
                        <ul className="children">
                          <li className="comment-item">
                            <div className="comment-item-wrapper">
                              <div className="avatar-block">
                                <div className="avatar box-42">
                                  <Link to="">
                                    <img
                                      src={'/Image/avatar.png'}
                                      alt="avatar"
                                    />
                                    {userProfileData?.isCreator && (
                                      <span className="verified">
                                        <BsCheck />
                                      </span>
                                    )}
                                  </Link>
                                </div>
                                <div className="avatar-meta">
                                  <div className="avatar-title">
                                    <Link to="">Jackie Jones</Link>
                                  </div>
                                  <div className="avatar-meta">@JackieJ</div>
                                </div>
                              </div>
                              <div className="comment-body">
                                Sed ut perspiciatis unde omnis iste natus error
                                sit voluptatem accusantium doloremque.
                              </div>
                              <div className="comment-meta">
                                <div className="publish-date">
                                  46 minutes ago
                                </div>
                                <div className="reply">
                                  <Link to="">Reply</Link>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <aside id="style-1" style={{ width: '32vw' }}>
          <div className="product-additional-info">
            <div className="product-title-section">
              <div
                className="d-flex align-items-center justify-content-between"
                id="verticalDropDown"
              >
                <h4 className="product-detail-distance">
                  {productdata[0]?.title}
                </h4>
              </div>

              <div className="product-subtitle product-detail-distance justify-content-between">
                <div className="product-author">
                  <span className="avatar box-26">
                    <a
                      href={`/public/${productdata[0]?.createdBy[0]?._id}/profile`}
                      target="_blank"
                    >
                      <img
                        src={
                          productdata[0]?.createdBy[0]?.image === null
                            ? '/Image/avatar.png'
                            : productdata[0]?.createdBy[0]?.image?.includes(
                                'googleusercontent'
                              )
                            ? productdata[0]?.createdBy[0]?.image
                            : Bucket + productdata[0]?.createdBy[0]?.image
                        }
                        alt="profile-image"
                      />
                    </a>
                    <span className="verified">
                      <BsCheck />
                    </span>
                  </span>
                  <a
                    className="bold-user-name me-2"
                    href={`/public/${productdata[0]?.createdBy[0]?._id}/profile`}
                    target="_blank"
                  >
                    @{productdata[0]?.createdBy[0]?.username}
                  </a>
                  <Link
                    to={
                      productdata[0]?.sub_category[0]?._id &&
                      `/explore-items/${productdata[0]?.sub_category[0]?._id}`
                    }
                    className="item-category ui-templates"
                  >
                    {productdata[0]?.sub_category[0]?.name
                      ? productdata[0]?.sub_category[0]?.name
                      : productdata[0]?.category[0]?.name}
                  </Link>
                </div>

                <div id="verticalDropDown">
                  <Dropdown className="dropdown-position">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <HiDotsVertical />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setReportFlag(!reportFlag)}>
                        {' '}
                        <span className="pr-2">
                          <MdReport />
                        </span>{' '}
                        &nbsp; Report as Inapproprite
                      </Dropdown.Item>
                      <Dropdown.Item onClick={share}>
                        {' '}
                        <span className="pr-2">
                          <IoMdShareAlt />
                        </span>{' '}
                        &nbsp; Share
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="product-detail-distance">
                <ShowMoreText
                  /* Default options */
                  lines={2}
                  more="Show more"
                  less="Show less"
                  className="content-css"
                  anchorClass="my-anchor-css-class"
                  onClick={(e: any) => window.console.log(e)}
                  expanded={false}
                  // width={280}
                >
                  {productdata[0]?.description}
                </ShowMoreText>
              </div>
              <div className="item-rating">
                {productdata[0]?.software.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() =>
                        history.push({
                          pathname: '/explore-items',
                          state: item?._id
                        })
                      }
                    >
                      <img
                        src={Bucket + item?.image}
                        className="me-2 software"
                        title={item?.name}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="product-fav-counter"
              onClick={() => postLike(productdata[0]?._id)}
            >
              {productdata[0]?.like ? (
                <AiFillHeart color="#c23fff" />
              ) : (
                <AiOutlineHeart />
              )}
              <span className="count">{productdata[0]?.totalLikes}</span>
            </div>
            <div className="product-purchase-info">
              <form className="cryptoki-form" id="purchase-form">
                <div className="product-purchase-info">
                  <form className="cryptoki-form" id="purchase-form">
                    <div className="product-price">
                      <div className="price">
                        {price === '1' &&
                        (isPrimium || !productdata[0]?.isAdminPremium)
                          ? 'Free'
                          : !productdata[0]?.isPremium &&
                            price !== '2' &&
                            price !== '3'
                          ? 'Free'
                          : price !== '2' &&
                            price !== '3' &&
                            productdata[0]?.isPremium &&
                            `$${premiumPrice?.toFixed(2)}`}
                        {price === '2' &&
                          `$${productdata[0]?.license?.commercialPrice?.toFixed(
                            2
                          )}`}
                        {price === '3' &&
                          `$${productdata[0]?.license?.extendedPrice?.toFixed(
                            2
                          )}`}
                        <span className="sub-text">
                          {price === '1' && isPrimium && ''}
                          {price === '1' &&
                            !isPrimium &&
                            !productdata[0]?.isPremium &&
                            ''}
                          {price === '1' &&
                            !isPrimium &&
                            productdata[0]?.isPremium &&
                            productdata[0]?.isAdminPremium &&
                            'one time payment'}

                          {price === '1' &&
                            !isPrimium &&
                            productdata[0]?.isPremium &&
                            !productdata[0]?.isAdminPremium &&
                            ''}

                          {(price === '2' || price === '3') &&
                            'one time payment'}
                        </span>
                      </div>
                    </div>
                    <div className="pricing-plans">
                      <div className="form-group">
                        <div className="d-flex flex-column">
                          <div className="">
                            <div className="d-flex align-items-center">
                              <input
                                type="radio"
                                name="payment-method"
                                id="paypal"
                                value="1"
                                onChange={(e) => setPrice(e.target.value)}
                                checked={price === '1' && true}
                              />
                              <label htmlFor="paypal" className="licence-name">
                                {productdata[0]?.isAdminPremium && isPrimium
                                  ? 'Free License'
                                  : !productdata[0]?.isPremium
                                  ? 'Free License'
                                  : !productdata[0]?.isAdminPremium
                                  ? 'Free License'
                                  : 'Go Premium'}
                              </label>
                              {isPrimium ? (
                                <ul className="navigation-menu">
                                  <li className="menu-item menu-item-has-children">
                                    <SVG
                                      src="/Image/Icons/info.svg"
                                      // title="Menu"
                                      className="info-icon"
                                    />
                                    <ul className="submenu tool-tip-info">
                                      <li className="menu-item">
                                        <a className="menu-link fw-normal">
                                          <IoCheckmarkCircleOutline color="white" />
                                          &nbsp; For personal project only
                                        </a>
                                      </li>
                                      <li className="menu-item">
                                        <a className="menu-link fw-normal">
                                          <IoCheckmarkCircleOutline color="white" />
                                          &nbsp; Future updates only
                                        </a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              ) : !productdata[0]?.isPremium ? (
                                <ul className="navigation-menu">
                                  <li className="menu-item menu-item-has-children">
                                    <SVG
                                      src="/Image/Icons/info.svg"
                                      // title="Menu"
                                      className="info-icon"
                                    />
                                    <ul className="submenu tool-tip-info">
                                      <li className="menu-item">
                                        <a className="menu-link fw-normal">
                                          <IoCheckmarkCircleOutline color="white" />
                                          &nbsp; For personal project only
                                        </a>
                                      </li>
                                      <li className="menu-item">
                                        <a className="menu-link fw-normal">
                                          <IoCheckmarkCircleOutline color="white" />
                                          &nbsp; Future updates only
                                        </a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              ) : (
                                ''
                              )}
                            </div>
                            <p className="licence-desc">
                              {productdata[0]?.isAdminPremium && isPrimium
                                ? 'Only for personal use.'
                                : !productdata[0]?.isPremium
                                ? 'Only for personal use.'
                                : !productdata[0]?.isAdminPremium
                                ? 'Only for personal use.'
                                : `From $${premiumPrice} to access thousands of commercial resources.`}
                            </p>
                          </div>

                          <div className="">
                            <div className="d-flex align-items-center">
                              <input
                                type="radio"
                                name="payment-method"
                                id="credit-card"
                                value="2"
                                onChange={(e) => setPrice(e.target.value)}
                                checked={price === '2' && true}
                              />{' '}
                              <label
                                htmlFor="credit-card"
                                className="licence-name"
                              >
                                Commercial License
                              </label>
                              <ul className="navigation-menu">
                                <li className="menu-item menu-item-has-children">
                                  <SVG
                                    src="/Image/Icons/info.svg"
                                    // title="Menu"
                                    className="info-icon"
                                  />
                                  <ul className="submenu tool-tip-info">
                                    <li className="menu-item">
                                      <a className="menu-link fw-normal">
                                        <IoCheckmarkCircleOutline color="white" />
                                        &nbsp; For{' '}
                                        <span className="font-bold">
                                          commercial use
                                        </span>
                                      </a>
                                    </li>
                                    <li className="menu-item">
                                      <a className="menu-link fw-normal">
                                        <IoCheckmarkCircleOutline color="white" />
                                        &nbsp;{' '}
                                        <span className="font-bold">
                                          Limited to 1 project
                                        </span>{' '}
                                        only
                                      </a>
                                    </li>
                                    <li className="menu-item">
                                      <a className="menu-link fw-normal">
                                        <IoCheckmarkCircleOutline color="white" />
                                        &nbsp; Lifetime support from{' '}
                                        <span
                                          onClick={() =>
                                            window.open(
                                              `https://www.development.web.unicornui.com/public/${productdata[0]?.createdBy[0]?._id}/profile`
                                            )
                                          }
                                        >
                                          {
                                            productdata[0]?.createdBy[0]?.username?.split(
                                              ' '
                                            )[0]
                                          }
                                        </span>
                                      </a>
                                    </li>
                                    <li className="menu-item">
                                      <a className="menu-link fw-normal">
                                        <IoCheckmarkCircleOutline color="white" />
                                        &nbsp; Future updates
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>

                            <p className="licence-desc">
                              {' '}
                              Pay $
                              {productdata[0]?.license?.commercialPrice?.toFixed(
                                2
                              )}{' '}
                              to get access of this product.
                            </p>
                          </div>

                          {productdata[0]?.license?.isExtended === true && (
                            <div className="">
                              <div className="d-flex align-items-center">
                                <input
                                  type="radio"
                                  name="payment-method"
                                  id="extend-license"
                                  value="3"
                                  onChange={(e) => setPrice(e.target.value)}
                                  checked={price === '3' && true}
                                />
                                <label
                                  htmlFor="extend-license"
                                  className="licence-name"
                                >
                                  Extended License
                                </label>
                                <ul className="navigation-menu">
                                  <li className="menu-item menu-item-has-children">
                                    <SVG
                                      src="/Image/Icons/info.svg"
                                      // title="Menu"
                                      className="info-icon"
                                    />
                                    <ul className="submenu tool-tip-info">
                                      <li className="menu-item">
                                        <a className="menu-link fw-normal">
                                          <IoCheckmarkCircleOutline color="white" />
                                          &nbsp; Can be included in a product
                                          for sale
                                        </a>
                                      </li>
                                      <li className="menu-item">
                                        <a className="menu-link fw-normal">
                                          <IoCheckmarkCircleOutline color="white" />
                                          &nbsp; For commercial use
                                        </a>
                                      </li>
                                      <li className="menu-item">
                                        <a className="menu-link fw-normal">
                                          <IoCheckmarkCircleOutline color="white" />
                                          &nbsp; Unlimited number of projects
                                        </a>
                                      </li>
                                      <li className="menu-item">
                                        <a className="menu-link fw-normal">
                                          <IoCheckmarkCircleOutline color="white" />
                                          &nbsp; Lifetime support from{' '}
                                          <span
                                            onClick={() =>
                                              window.open(
                                                `https://www.development.web.unicornui.com/public/${productdata[0]?.createdBy[0]?._id}/profile`
                                              )
                                            }
                                          >
                                            {
                                              productdata[0]?.createdBy[0]?.username?.split(
                                                ' '
                                              )[0]
                                            }
                                          </span>
                                        </a>
                                      </li>
                                      <li className="menu-item">
                                        <a className="menu-link fw-normal">
                                          <IoCheckmarkCircleOutline color="white" />
                                          &nbsp; Future updates
                                        </a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                              <p className="licence-desc">
                                {' '}
                                Pay ${productdata[0]?.license?.extendedPrice} to
                                get access of this product.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {price === '1' && isPrimium && productdata[0]?.isAdminPremium && (
                  <button
                    className="btn btn-fullwidth  gradient-background mb-3"
                    type="button"
                    onClick={() => download(productdata[0])}
                  >
                    Download
                  </button>
                )}
                {price === '1' && !productdata[0]?.isPremium && !isPrimium && (
                  <button
                    className="btn btn-fullwidth  gradient-background mb-3"
                    type="button"
                    onClick={() => download(productdata[0])}
                  >
                    Download
                  </button>
                )}
                {/* {price === '1' && !productdata[0]?.isPremium && isPrimium && (
                  <button
                    className="btn btn-fullwidth  gradient-background mb-3"
                    type="button"
                    onClick={() => download(productdata[0])}
                  >
                    Download
                  </button>
                )} */}
                {/* {price === '1' && !productdata[0]?.isAdminPremium && (
                  <button
                    className="btn btn-fullwidth  gradient-background mb-3"
                    type="button"
                    // onClick={() => download(productdata[0])}
                    onClick={() =>
                      history.push(
                        `/checkout/${productdata[0]?._id}?premium=true`
                      )
                    }
                  >
                    Download
                  </button>
                )} */}

                {price === '1' &&
                  productdata[0]?.isPremium &&
                  !isPrimium &&
                  productdata[0]?.isAdminPremium && (
                    <button
                      className="btn btn-fullwidth  gradient-background mb-3 buy-now"
                      type="button"
                      onClick={() =>
                        // history.push(
                        //   `/checkout/${productdata[0]?._id}?premium=true`
                        // )
                        history.push(`/plan`)
                      }
                    >
                      Buy Now
                    </button>
                  )}

                {price === '2' && !productdata[0]?.isCommercialPurchase && (
                  <button
                    className="btn btn-fullwidth  gradient-background mb-3 buy-now"
                    type="button"
                    onClick={() =>
                      history.push(
                        `/checkout/${productdata[0]?._id}?selected=${price}`
                      )
                    }
                  >
                    Buy Now
                  </button>
                )}
                {price === '2' && productdata[0]?.isCommercialPurchase && (
                  <button
                    className="btn btn-fullwidth  gradient-background mb-3"
                    type="button"
                    onClick={() => download(productdata[0])}
                  >
                    Download
                  </button>
                )}

                {price === '3' && !productdata[0]?.isExtendPurchase && (
                  <button
                    className="btn btn-fullwidth  gradient-background mb-3 buy-now"
                    type="button"
                    onClick={() =>
                      history.push(
                        `/checkout/${productdata[0]?._id}?selected=${price}`
                      )
                    }
                  >
                    Buy Now
                  </button>
                )}
                {price === '3' && productdata[0]?.isExtendPurchase && (
                  <button
                    className="btn btn-fullwidth  gradient-background mb-3"
                    type="button"
                    onClick={() => download(productdata[0])}
                  >
                    Download
                  </button>
                )}
                <button
                  className="btn btn-fullwidth  btn-dark waves-effect waves-button waves-float waves-light saved"
                  type="button"
                  onClick={() => saveForLater(productdata[0]?._id)}
                >
                  {productdata[0]?.isFavorite
                    ? 'Remove from Save'
                    : 'Save for later'}
                </button>
              </form>
            </div>
            {/* <div className="product-details">
              <div className="small-title">Item details</div>
              <div className="product-details-wrapper">
                <ul className="details-title">
                  <li>Published</li>
                   <li>Updated</li> 
                  <li>Files included</li>
                  <li>Software</li>
                  <li>Size</li>
                  <li>Tags</li>
                </ul>
                <ul className="details-value">
                  <li>
                    {moment(productdata[0]?.createdAt).format('MMM DD,YYYY')}
                  </li>
                  <li>
                    {productdata[0]?.software?.map((t: any, index: number) => {
                      return (
                        <span key={index}>
                          {index == productdata[0]?.software?.length - 1
                            ? t?.extension
                            : t?.extension + ','}
                        </span>
                      );
                    })}
                  </li>
                  <li>
                    {productdata[0]?.software?.map((t: any, index: number) => {
                      return (
                        <span key={index}>
                          {index == productdata[0]?.software?.length - 1
                            ? t?.name
                            : t?.name + ','}
                        </span>
                      );
                    })}
                  </li>
                  <li>{productdata[0]?.sourceFileSize}</li>
                  <li className="tags-list">
                    {productdata[0]?.tag.map((item: string, index: number) => {
                      return (
                        <>
                          <span className="colored" key={index}>
                            <a>
                              {index == productdata[0]?.tag?.length - 1
                                ? item
                                : item + ','}
                            </a>
                          </span>
                        </>
                      );
                    })}
                  </li>
                </ul>
              </div>
            </div> */}
            {/* <div className="seller-info">
              <div className="small-title">Item Seller</div>
              <div className="seller-box">
                <div className="avatar box-64">
                  <Link
                    to={`/public/${productdata[0]?.createdBy[0]?._id}/profile`}
                  >
                    <img
                      src={
                        Bucket +
                        (productdata[0]?.createdBy[0]?.image === null
                          ? '/Image/avatar.png'
                          : productdata[0]?.createdBy[0]?.image.split(
                              '/'
                            )[2] === 'lh3.googleusercontent.com'
                          ? productdata[0]?.createdBy[0]?.image
                          : Bucket + productdata[0]?.createdBy[0]?.image)
                      }
                      alt="avatar"
                    />
                    <span className="verified">
                      <BsCheck />
                    </span>
                  </Link>
                </div>
                <div className="seller-meta">
                  <div className="seller-name">
                    <div className="name">
                      <Link
                        to={`/public/${productdata[0]?.createdBy[0]?._id}/profile`}
                      >
                        {productdata[0]?.createdBy[0]?.name}
                      </Link>
                    </div>
                    <div
                      className="meta gradient-text cursor-pointer"
                      onClick={() =>
                        history.push(
                          `/public/${productdata[0]?.createdBy[0]?._id}/profile`
                        )
                      }
                    >
                      @{productdata[0]?.createdBy[0]?.username}
                    </div>
                  </div>
                  <ul className="social-icons-list">
                    {productdata[0]?.createdBy[0]?.websiteURL && (
                      <li className="social-icon icon-border">
                        <a
                          href={productdata[0]?.createdBy[0]?.websiteURL}
                          target="_blank"
                        >
                          <FaNewspaper />
                        </a>
                      </li>
                    )}
                    {productdata[0]?.createdBy[0]?.behanceURL && (
                      <li className="social-icon icon-border">
                        <a
                          href={productdata[0]?.createdBy[0]?.behanceURL}
                          target="_blank"
                        >
                          <AiFillBehanceCircle />
                        </a>
                      </li>
                    )}
                    {productdata[0]?.createdBy[0]?.dribbbleURL && (
                      <li className="social-icon icon-border">
                        <a
                          href={productdata[0]?.createdBy[0]?.dribbbleURL}
                          target="_blank"
                        >
                          <AiFillDribbbleCircle />
                        </a>
                      </li>
                    )}
                    {productdata[0]?.createdBy[0]?.twitterURL && (
                      <li className="social-icon icon-border">
                        <a
                          href={productdata[0]?.createdBy[0]?.twitterURL}
                          target="_blank"
                        >
                          <AiOutlineTwitter />
                        </a>
                      </li>
                    )}
                    {productdata[0]?.createdBy[0]?.instagramURL && (
                      <li className="social-icon icon-border">
                        <a
                          href={productdata[0]?.createdBy[0]?.instagramURL}
                          target="_blank"
                        >
                          <BsInstagram />
                        </a>
                      </li>
                    )}
                    {productdata[0]?.createdBy[0]?.githubURL && (
                      <li className="social-icon icon-border">
                        <a
                          href={productdata[0]?.createdBy[0]?.githubURL}
                          target="_blank"
                        >
                          <FaGithub />
                        </a>
                      </li>
                    )}
                  </ul>
                  <div className="seller-buttons">
                    <Link
                      to={`/public/${productdata[0]?.createdBy[0]?._id}/profile`}
                      className="btn  btn-small-wide gradient-background"
                    >
                      Profile
                    </Link>
                    <Link
                      to=""
                      className="btn  btn-small-wide btn-dark waves-effect waves-button waves-float waves-light"
                      onClick={() => setReportFlag(!reportFlag)}
                    >
                      Report
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </aside>
      </div>

      <div className="row product-additional-info2">
        <div className="seller-info align-items-start flex-column mb-4 col-md-4">
          <div className="small-title mb-3">Item Seller</div>
          <div className="seller-box">
            <div className="avatar box-64">
              <Link to={`/public/${productdata[0]?.createdBy[0]?._id}/profile`}>
                <img
                  src={
                    productdata[0]?.createdBy[0]?.image === null
                      ? '/Image/avatar.png'
                      : productdata[0]?.createdBy[0]?.image?.includes(
                          'googleusercontent'
                        )
                      ? productdata[0]?.createdBy[0]?.image
                      : Bucket + productdata[0]?.createdBy[0]?.image
                  }
                  alt="avatar"
                />
                <span className="verified">
                  <BsCheck />
                </span>
              </Link>
            </div>
            <div className="seller-meta">
              <div className="seller-name">
                <div className="name">
                  <Link
                    to={`/public/${productdata[0]?.createdBy[0]?._id}/profile`}
                  >
                    {productdata[0]?.createdBy[0]?.name}
                  </Link>
                </div>
                <div
                  className="meta gradient-text cursor-pointer mb-3 lh-1"
                  onClick={() =>
                    history.push(
                      `/public/${productdata[0]?.createdBy[0]?._id}/profile`
                    )
                  }
                >
                  @{productdata[0]?.createdBy[0]?.username}
                </div>
              </div>
              <ul className="social-icons-list">
                {productdata[0]?.createdBy[0]?.websiteURL && (
                  <li className="social-icon icon-border">
                    <a
                      href={productdata[0]?.createdBy[0]?.websiteURL}
                      target="_blank"
                    >
                      <FaNewspaper />
                    </a>
                  </li>
                )}
                {productdata[0]?.createdBy[0]?.behanceURL && (
                  <li className="social-icon icon-border">
                    <a
                      href={productdata[0]?.createdBy[0]?.behanceURL}
                      target="_blank"
                    >
                      <AiFillBehanceCircle />
                    </a>
                  </li>
                )}
                {productdata[0]?.createdBy[0]?.dribbbleURL && (
                  <li className="social-icon icon-border">
                    <a
                      href={productdata[0]?.createdBy[0]?.dribbbleURL}
                      target="_blank"
                    >
                      <AiFillDribbbleCircle />
                    </a>
                  </li>
                )}
                {productdata[0]?.createdBy[0]?.twitterURL && (
                  <li className="social-icon icon-border">
                    <a
                      href={productdata[0]?.createdBy[0]?.twitterURL}
                      target="_blank"
                    >
                      <AiOutlineTwitter />
                    </a>
                  </li>
                )}
                {productdata[0]?.createdBy[0]?.instagramURL && (
                  <li className="social-icon icon-border">
                    <a
                      href={productdata[0]?.createdBy[0]?.instagramURL}
                      target="_blank"
                    >
                      <BsInstagram />
                    </a>
                  </li>
                )}
                {productdata[0]?.createdBy[0]?.githubURL && (
                  <li className="social-icon icon-border">
                    <a
                      href={productdata[0]?.createdBy[0]?.githubURL}
                      target="_blank"
                    >
                      <FaGithub />
                    </a>
                  </li>
                )}
              </ul>
              <div className="seller-buttons">
                <Link
                  to={`/public/${productdata[0]?.createdBy[0]?._id}/profile`}
                  className="btn  btn-small-wide gradient-background"
                >
                  Profile
                </Link>
                <Link
                  to=""
                  className="btn  btn-small-wide btn-dark waves-effect waves-button waves-float waves-light"
                  onClick={() => setReportFlag(!reportFlag)}
                >
                  Report
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="product-details  mb-4 col-md-8">
          <div className="small-title">Item details</div>
          <div className="product-details-wrapper d-md-flex gap-4">
            <ul className="details-title">
              <li>Published</li>
              {/* <li>Updated</li> */}
              <li>Files included</li>
              <li>Software</li>
              <li>Size</li>
              <li>Tags</li>
            </ul>
            <ul className="details-value">
              <li>{moment(productdata[0]?.createdAt).format('MMM DD,YYYY')}</li>
              <li>
                {productdata[0]?.software?.map((t: any, index: number) => {
                  return (
                    <span key={index}>
                      {/* {index == productdata[0]?.software?.length - 1
                        ? t?.extension
                        : t?.extension + ','} */}
                      {t?.extension ? `${t?.extension} , ` : '-'}
                    </span>
                  );
                })}
              </li>
              <li>
                {productdata[0]?.software?.map((t: any, index: number) => {
                  return (
                    <span key={index}>
                      {index == productdata[0]?.software?.length - 1
                        ? t?.name
                        : t?.name + ','}
                    </span>
                  );
                })}
              </li>
              <li>{productdata[0]?.sourceFileSize}</li>

              <li className="tags-list">
                {productdata[0]?.tag.map((item: string, index: number) => {
                  return (
                    <>
                      <span className="colored" key={index}>
                        <a>
                          {index == productdata[0]?.tag?.length - 1
                            ? item
                            : item + ','}
                        </a>
                      </span>
                    </>
                  );
                })}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <RealatedPost
        postId={productdata[0]?._id}
        subCategory={productdata[0]?.sub_category[0]?._id}
        subCategoryName={productdata[0]?.sub_category[0]?.name}
      />
      <Dialog
        open={shareFlag}
        onClose={() => setShareFlag(!shareFlag)}
        maxWidth="xl"
      >
        <DialogContent className="px-5 pt-2 pb-4">
          <div className="d-flex justify-content-center my-3">
            <div className="sub-text">Share file</div>
            {/* <ImCross onClick={() => setShareFlag(!shareFlag)} /> */}
          </div>
          <ul className="social-icons-list">
            {/* <li className="social-icon icon-border"> */}
            <div className="d-flex align-items-center mx-2">
              <TwitterShareButton
                url={'https://www.unicornui.com/productdetail/' + mainstring}
                // title={title}
                className="shareBtn "
              >
                <FaTwitter color="#1da2f1" fontSize={25} />
              </TwitterShareButton>
            </div>
            {/* </li>
            <li className="social-icon icon-border"> */}
            <div className="d-flex align-items-center mx-2">
              <EmailShareButton
                url={'https://www.unicornui.com/productdetail/' + mainstring}
                // title={title}
                className="shareBtn"
              >
                <EmailIcon size={60} round />
              </EmailShareButton>
            </div>
            {/* </li>
            <li className="social-icon icon-border"> */}
            <div className="d-flex align-items-center mx-2">
              <FacebookShareButton
                url={'https://www.unicornui.com/productdetail/' + mainstring}
                // title={title}
                className="shareBtn "
              >
                <FaFacebookF color="#1b77f2" fontSize={25} />
              </FacebookShareButton>
            </div>
            {/* </li>
            <li className="social-icon icon-border"> */}
            <div className="d-flex align-items-center mx-2">
              <WhatsappShareButton
                url={'https://www.unicornui.com/productdetail/' + mainstring}
                // title={title}
                className="shareBtn "
              >
                <FaWhatsapp color="#25d366" fontSize={25} />
              </WhatsappShareButton>
            </div>
            {/* </li> */}
          </ul>
          {/* <h6 className="sub-text mt-3">
            Start using your components by copying<br></br> the web address
            below.
          </h6> */}
          <form
            className="cryptoki-form mt-4"
            id="personal-info-form"
            // onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group w-100">
              <div className="form-field d-flex w-100 flex-row shareLink px-1 py-1">
                <input
                  name="search"
                  type="text"
                  autoComplete="off"
                  className="flex-grow-1 border-0"
                  id="current"
                  value={states}
                  placeholder="Search by name"
                  // onChange={handlesearch}
                ></input>
                <div className="flex-shrink-1">
                  <CopyToClipboard
                    text={`https://www.development.web.unicornui.com/productdetail/${productId}`}
                    onCopy={() => {
                      setState(
                        `https://www.development.web.unicornui.com/productdetail/${productId}`
                      );
                      setShareFlag(!shareFlag);
                      SuccessToast('Copy Successfully!');
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-fullwidth  gradient-background "
                    >
                      Copy
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={reportFlag}
        onClose={() => setReportFlag(!reportFlag)}
        maxWidth="xl"
      >
        <DialogContent>
          {/* <div className="cursor-pointer">
            <ImCross onClick={() => setShareFlag(!shareFlag)} />
          </div> */}
          <div className=" text-center fw-bold fs-5">
            Write a reason to report this post !
          </div>
          <form className="cryptoki-form py-3" onSubmit={sendReport}>
            <div className="row">
              <div className="upload-column">
                <div className="form-field">
                  <label htmlFor="item-description">Message</label>
                  <textarea
                    id="item-description"
                    onChange={(e) => setReport(e.target.value)}
                    placeholder="Enter message"
                    cols={30}
                    rows={5}
                    name="description"
                  ></textarea>
                  <p className="text-danger bold font-size=22"></p>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <button
                type="submit"
                className="btn btn-fullwidth  gradient-background mx-1"
              >
                Send
              </button>
              <button
                type="button"
                className="btn btn-fullwidth  btn-dark waves-effect waves-button waves-float waves-light mx-1"
                onClick={() => setReportFlag(!reportFlag)}
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetailsModal;
