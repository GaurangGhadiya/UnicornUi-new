import React, { useRef, useEffect } from 'react';
import { BsCheck, BsInstagram } from 'react-icons/bs';
import { MdContentCopy, MdReport } from 'react-icons/md';
import {
  AiFillBehanceCircle,
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillDribbbleCircle
} from 'react-icons/ai';
import {
  FaNewspaper,
  FaRegCircle,
  FaGamepad,
  FaGithub,
  FaWhatsapp,
  FaFacebookF,
  FaTwitter
} from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useMutation, useQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent } from '@material-ui/core';

import ItemCard from 'src/components/itemCard';
import UseNav from 'src/Hooks/Header/UseNav';
import Loader from 'src/components/loader';
import { ApiGetNoAuth, ApiPostNoAuth, Bucket } from 'src/services/http-service';
import { ApiGet, ApiPost } from 'src/helpers/API/ApiData';
import { isOpenModal, openModal } from 'src/redux/reducer/profileUpdateSlice';
import copy from 'copy-to-clipboard';

import { ErrorToast, SuccessToast } from 'src/helpers/Toast';
import { Dropdown } from 'react-bootstrap';
import { IoMdShareAlt } from 'react-icons/io';
import { HiDotsVertical } from 'react-icons/hi';
import CopyToClipboard from 'react-copy-to-clipboard';
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
import { log } from 'console';
let mainstring = '';
let page = 1;
const MyProfile = (props: any) => {
  const navData = UseNav();
  const dispatch = useDispatch();
  const userId = props?.match?.params?.userId;
  const [nextPage, setNextPage] = React.useState<number>(1);
  const [hasMore, setHasMore] = React.useState<boolean>(false);
  const [userPostData, setUserPostData] = React.useState<any>([]);
  const [loading, setloading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<string>('created');
  const [reportFlag, setReportFlag] = React.useState<boolean>(false);
  const [shareFlag, setShareFlag] = React.useState<boolean>(false);
  const [states, setState] = React.useState<any>(window.location.href);
  const first = useRef(null);
  const [report, setReport] = React.useState<any>('');

  const [userProfileData, setUserProfileData] = React.useState<any>([]);
  const arrayOfTab = [
    { value: 'created', label: 'Created' },
    { value: 'collected', label: 'Collected' },
    { value: 'on-sale', label: 'On Sale' },
    { value: 'liked', label: 'Liked' },
    { value: 'following', label: 'Following' },
    { value: 'followers', label: 'Followers' },
    { value: 'activity', label: 'Activity' },
    { value: 'about', label: 'About' }
  ];

  useQuery(
    'fetchUserProfileData',
    () => ApiGetNoAuth(`user/public_profile?userId=${userId}`),
    {
      onSuccess: (response: any) => {
        setUserProfileData(response?.data?.data);
      }
    }
  );
  const fetchUserProfile = () => {
    setloading(true);
    const userBody = {
      userId: userId,
      page: 1,
      limit: 12,
      isLike: activeTab === 'liked',
      isFavorite: activeTab === 'collected'
    };
    console.log('userBody', userBody);
    ApiPostNoAuth('user/post/public_by_user', userBody)
      .then((res: any) => {
        console.log('useEffect fun', res.data.data.post_data);

        setUserPostData(res.data?.data.post_data);
        setHasMore(res?.data?.data?.post_data?.length >= 8 ? true : false);
        setloading(false);
      })
      .catch((e) => {
        setloading(false);
      });
  };
  const fetchUserProfile2 = () => {
    setloading(true);
    const userBody2 = {
      userId: userId,
      page: 1,
      limit: 12,
      isLike: activeTab === 'liked',
      isFavorite: activeTab === 'collected'
    };
    ApiPost('/post/public_by_user', userBody2)
      .then((res: any) => {
        setUserPostData(res.data.post_data);
        setHasMore(res?.data?.post_data?.length >= 8 ? true : false);
        setloading(false);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  function getCountOfData(activeTabValue: any) {
    if (userProfileData) {
      switch (activeTabValue) {
        case 'created':
          return userProfileData.createdPostCount
            ? userProfileData.createdPostCount
            : 0;
        case 'collected':
          return userProfileData.favoritePostCount
            ? userProfileData.favoritePostCount
            : 0;
        case 'on-sale':
          return 0;
        case 'liked':
          return userProfileData.likePostCount
            ? userProfileData.likePostCount
            : 0;
        case 'following':
          return 0;
        case 'followers':
          return 0;
        default:
          return 0;
      }
    }
  }

  const postLike = async (productId: any) => {
    if (localStorage.getItem('logindata')) {
      await ApiGet(`/post/like_post/${productId}`).then(async () => {
        await fetchUserProfile2();
      });
    } else if (!localStorage.getItem('logindata')) {
      dispatch(openModal('1'));
      dispatch(isOpenModal(true));
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem('logindata')) {
      fetchUserProfile2();
    } else if (userId) {
      fetchUserProfile();
    }
  }, [userId, activeTab]);

  const sendReport = (e: any) => {
    e.preventDefault();
    if (localStorage.getItem('logindata')) {
      if (report) {
        let body = {
          message: report,
          userId: window.location.pathname?.split('/')[2],
          type: 1
        };
        ApiPost(`/report`, body)
          .then((res: any) => {
            // refetch();
            setReportFlag(!reportFlag);
            SuccessToast(res?.message);
            // navData?.getCount();
          })
          .catch((error) => {
            ErrorToast(error?.message);
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

  const share = () => {
    // let extratag = productdata[0].title;
    let extratag = 'user name';
    mainstring = extratag.split(' ').join('%20');
    setShareFlag(!shareFlag);
  };

  const authFetchLoad = async (page: any) => {
    // setloading(true);
    const userBody = {
      userId: userId,
      page,
      limit: 12,
      isLike: activeTab === 'liked',
      isFavorite: activeTab === 'collected'
    };
    ApiPost('/post/public_by_user', userBody)
      .then((res: any) => {
        setUserPostData([...userPostData, ...res.data.post_data]);
        setHasMore(res?.data?.post_data?.length >= 8 ? true : false);
        // setloading(false);
      })
      .catch((e) => {
        setloading(false);
      });
  };
  console.log('userPostData', userPostData);
  const unAuthFetchLoad = async (page: any) => {
    // setloading(true);
    const userBody = {
      userId: userId,
      page,
      limit: 12,
      isLike: activeTab === 'liked',
      isFavorite: activeTab === 'collected'
    };
    console.log('userBody load', userBody);
    ApiPostNoAuth('user/post/public_by_user', userBody)
      .then((res: any) => {
        console.log('load fun', res.data.data);
        setUserPostData([...userPostData, ...res.data.data.post_data]);
        setHasMore(res?.data?.data?.post_data?.length >= 8 ? true : false);
        setloading(false);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  const fetchDataLoad = async () => {
    page = page + 1;
    if (localStorage.getItem('logindata')) {
      await authFetchLoad(page);
    } else {
      await unAuthFetchLoad(page);
    }
  };

  // const onScroll = (ref: any) => {
  //   console.log(ref);
  //   console.log('first');
  //   if (
  //     ref.current.scrollHeight ===
  //     ref.current.offsetHeight + ref.current.scrollTop
  //   ) {
  //     console.log('hhhhhhhhhhhhhhhhhh');
  //   }
  // };

  // React.useEffect(() => {}, [userId, activeTab, nextPage]);

  return (
    <div className="primary-content-area profile-page">
      <div className="profile-header-section">
        <div className="cover-image">
          <img
            src={
              !userProfileData?.user?.coverImage
                ? '/Image/profile-cover-1.jpg'
                : userProfileData?.user?.coverImage?.includes(
                    'googleusercontent'
                  )
                ? userProfileData?.user?.coverImage
                : Bucket + userProfileData?.user?.coverImage
            }
            alt=""
          />
        </div>
        <div className="about-author-section container">
          <div className="profile-header-user-profile">
            <div className="avatar box-152">
              <Link to="">
                <img
                  src={
                    userProfileData?.user?.image === null
                      ? '/Image/avatar.png'
                      : userProfileData?.user?.image?.includes(
                          'googleusercontent'
                        )
                      ? userProfileData?.user?.image
                      : Bucket + userProfileData?.user?.image
                  }
                  alt=""
                />
              </Link>
              {userProfileData?.user?.isCreator && (
                <span className="verified">
                  <BsCheck />
                </span>
              )}
            </div>
            <div className="follow-box">
              <div id="verticalDropDown">
                <Dropdown className="dropdown-position">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <div className="more-link" id="verticalDropDown">
                      <a>
                        <h5>...</h5>
                      </a>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setReportFlag(!reportFlag)}>
                      <span className="pr-2">
                        <MdReport />
                      </span>
                      &nbsp; Report as Inapproprite
                    </Dropdown.Item>
                    <Dropdown.Item onClick={share}>
                      <span className="pr-2">
                        <IoMdShareAlt />
                      </span>
                      &nbsp; Share
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <button className="btn btn-normal btn-dark waves-effect waves-button waves-float waves-light">
                Follow!
              </button>
            </div>
          </div>
          <div className="author-primary-info">
            <div className="activity-meta">
              <div className="followers-number">
                <div className="number">903</div>
                <div className="label">Followers</div>
              </div>
              <div className="following-number">
                <div className="number">56</div>
                <div className="label">Following</div>
              </div>
            </div>
            <div className="profile-author-info">
              <h3 className="author-name gradient-text">
                <a>{userProfileData?.user?.name}</a>
              </h3>
              <div className="author-meta">
                @{userProfileData?.user?.username}
              </div>
              <div
                className="download-file"
                onClick={() => {
                  copy(window.location.href);
                  SuccessToast('Profile link copied!');
                }}
              >
                {window.location.href}
                <MdContentCopy />
              </div>
            </div>
            <div className="projects-meta">
              <div className="projects-number">
                <div className="number">
                  {userProfileData?.createdPostCount
                    ? userProfileData?.createdPostCount
                    : 0}
                </div>
                <div className="label">Created</div>
              </div>
              <div className="likes-number">
                <div className="number">
                  {userProfileData?.user?.totalLikes
                    ? userProfileData?.user?.totalLikes
                    : 0}
                </div>
                <div className="label">Likes Received</div>
              </div>
              {/* <div className="onsale-number">
                <div className="number">12</div>
                <div className="label">On Sale</div>
              </div>
              <div className="country">
                <div className="flag">
                  <img src={flag1} alt="" />
                </div>
                <div className="label">United States</div>
              </div> */}
            </div>
          </div>
          <div className="author-description">
            <p>{userProfileData?.user?.bio}</p>
            <ul className="social-icons-list">
              {userProfileData?.user?.websiteURL && (
                <li className="social-icon icon-border">
                  <a href={userProfileData?.user?.websiteURL} target="_blank">
                    <FaNewspaper />
                  </a>
                </li>
              )}
              {userProfileData?.user?.behanceURL && (
                <li className="social-icon icon-border">
                  <a href={userProfileData?.user?.behanceURL} target="_blank">
                    <AiFillBehanceCircle />
                  </a>
                </li>
              )}
              {userProfileData?.user?.dribbbleURL && (
                <li className="social-icon icon-border">
                  <a href={userProfileData?.user?.dribbbleURL} target="_blank">
                    <AiFillDribbbleCircle />
                  </a>
                </li>
              )}
              {userProfileData?.user?.twitterURL && (
                <li className="social-icon icon-border">
                  <a href={userProfileData?.user?.twitterURL} target="_blank">
                    <AiOutlineTwitter />
                  </a>
                </li>
              )}
              {userProfileData?.user?.instagramURL && (
                <li className="social-icon icon-border">
                  <a href={userProfileData?.user?.instagramURL} target="_blank">
                    <BsInstagram />
                  </a>
                </li>
              )}
              {userProfileData?.user?.githubURL && (
                <li className="social-icon icon-border">
                  <a href={userProfileData?.user?.githubURL} target="_blank">
                    <FaGithub />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="profile-header-mobile">
        <div className="cover-image">
          <img
            src={
              userProfileData?.user?.coverImage === undefined || null
                ? '/Image/avatar.png'
                : userProfileData?.user?.coverImage?.includes(
                    'googleusercontent'
                  )
                ? userProfileData?.user?.coverImage
                : Bucket + userProfileData?.user?.coverImage
            }
            alt=""
          />
        </div>
        <div className="about-author-section container">
          <div className="profile-header-user-profile">
            <div className="avatar box-64 bordered">
              <Link to={`/public/${userProfileData?.user?._id}/profile`}>
                <img
                  src={
                    userProfileData?.user?.image === undefined || null
                      ? '/Image/avatar.png'
                      : userProfileData?.user?.image?.includes(
                          'googleusercontent'
                        )
                      ? userProfileData?.user?.image
                      : Bucket + userProfileData?.user?.image
                  }
                  alt=""
                />
              </Link>
              {userProfileData?.user?.isCreator && (
                <span className="verified">
                  <BsCheck />
                </span>
              )}
            </div>
            <div className="profile-author-info">
              <h5 className="author-name gradient-text">
                <Link to={`/public/${userProfileData?.user?._id}/profile`}>
                  {userProfileData?.user?.name}
                </Link>
              </h5>
              <div className="author-meta">
                @{userProfileData?.user?.username}
              </div>
              <div className="download-file">
                Ox465d53...d9c6
                <MdContentCopy />
              </div>
            </div>
          </div>
          <div className="follow-container">
            <div className="more-link-wrapper">
              <div className="more-link">
                <a>
                  <h5>...</h5>
                </a>
              </div>
            </div>
            <div className="follow-box">
              <button className="btn btn-wide btn-dark waves-effect waves-button waves-float waves-light">
                Follow!
              </button>
            </div>
          </div>
        </div>
        <ul className="social-icons-list">
          <li className="social-icon icon-border">
            <a>
              <FaNewspaper />
            </a>
          </li>
          <li className="social-icon icon-border">
            <a>
              <AiFillFacebook />
            </a>
          </li>
          <li className="social-icon icon-border">
            <a>
              <AiOutlineTwitter />
            </a>
          </li>
          <li className="social-icon icon-border">
            <a>
              <BsInstagram />
            </a>
          </li>
          <li className="social-icon icon-border">
            <a>
              <FaGamepad />
            </a>
          </li>
        </ul>
        <div className="author-primary-info">
          <div className="activity-meta">
            <div className="followers-number">
              <div className="number">903</div>
              <div className="label">Followers</div>
            </div>
            <div className="following-number">
              <div className="number">56</div>
              <div className="label">Following</div>
            </div>
            <div className="projects-number">
              <div className="number">135</div>
              <div className="label">Created</div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-page-container container">
        <div className="tabs-block swiper-container">
          <div className="swiper-nav">
            <div className="swiper-button-next">
              <FiChevronRight />
            </div>
            <div className="swiper-button-prev">
              <FiChevronLeft />
            </div>
          </div>

          <ul className="tabs-list swiper-wrapper">
            {arrayOfTab.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`swiper-slide ${
                    activeTab === item.value && 'active'
                  }`}
                >
                  <a
                    onClick={() => {
                      setUserPostData([]);
                      setActiveTab(item.value);
                    }}
                  >
                    {item.label}{' '}
                    {item.value !== 'about' && item.value !== 'activity' && (
                      <span className="count">
                        {getCountOfData(item.value)}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="tabs-content-wrapper" id="myDiv">
            {(activeTab === 'created' ||
              activeTab === 'collected' ||
              activeTab === 'liked') && (
              <InfiniteScroll
                dataLength={userPostData?.length}
                next={fetchDataLoad}
                style={{ overflow: 'hidden' }}
                hasMore={hasMore}
                // hasMore={842 != userPostData?.length}
                endMessage={
                  userPostData?.length !== 0 && (
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  )
                }
                loader={
                  <div className="loader">
                    {' '}
                    <Loader />{' '}
                  </div>
                }
              >
                <div id="tab1" className="tab active">
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="tab-content">
                      <div className="featured-box grid-4-columns">
                        <div className="featured-box">
                          <div
                            className={`featured-box-wrapper ${
                              userPostData?.length > 2
                                ? 'grid-4-columns'
                                : 'grid-5-columns'
                            }`}
                          >
                            {userPostData?.length !== 0 &&
                              userPostData?.map((item: any, index: number) => {
                                return (
                                  <div key={index}>
                                    <ItemCard
                                      productId={item._id}
                                      totalLikes={item.totalLikes}
                                      thumbnail={item.thumbnail}
                                      subcategory={item?.subcategory}
                                      subCategoryId={item?.subCategoryId}
                                      title={item.title}
                                      software={item.software}
                                      image={
                                        item.user
                                          ? item.user[0]?.image
                                          : undefined
                                      }
                                      username={
                                        item?.user[0]?.username ?? 'Username'
                                      }
                                      userId={item?.user[0]?._id}
                                      isCreator={item?.user[0]?.isCreator}
                                      price={item.price}
                                      like={item?.like}
                                      postLike={postLike}
                                    />
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </InfiniteScroll>
            )}
            {activeTab === 'on-sale' && (
              <div id="tab2">This is On Sale section</div>
            )}
            {activeTab === 'following' && (
              <div id="tab3">This is Following section</div>
            )}
            {activeTab === 'followers' && (
              <div id="tab4">This is Followers section</div>
            )}
            {activeTab === 'activity' && (
              <div id="tab5">
                <div className="tab-content">
                  <div className="activity-list">
                    <div className="activity-item bid">
                      <div className="bid-placer">
                        <div className="avatar box-42">
                          <Link to="">
                            <img src="/Image/avatar-15.png" alt="avatar" />
                          </Link>
                        </div>
                        <div className="bid-info">
                          <div className="bid-title">
                            Bid placed by{' '}
                            <span className="gradient-text">
                              <Link to="">Crimson Ray</Link>
                            </span>{' '}
                            of 2.31ETH (125.230 U$D) for{' '}
                            <span className="colored">
                              <Link to="">Breathing Nature</Link>
                            </span>{' '}
                            by{' '}
                            <span className="gradient-text">
                              <Link to="">
                                {navData?.parsedLoginData?.name}
                              </Link>
                            </span>
                          </div>
                          <div className="bid-date">32 minutes ago</div>
                        </div>
                      </div>
                      <div className="bid-product">
                        <Link to="">
                          <img src="/Image/project-thumb-1.png" alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="activity-item bid">
                      <div className="bid-placer">
                        <div className="avatar box-42">
                          <Link to="">
                            <img src="/Image/avatar-13.png" alt="avatar" />
                          </Link>
                        </div>
                        <div className="bid-info">
                          <div className="bid-title">
                            Bid placed by{' '}
                            <span className="gradient-text">
                              <Link to="">JennArt</Link>
                            </span>{' '}
                            of 1.90ETH (86.325 U$D) for
                            <span className="colored">
                              <Link to="">Social Blockz</Link>
                            </span>{' '}
                            by{' '}
                            <span className="gradient-text">
                              <Link to="">Jackie Jones</Link>
                            </span>
                          </div>
                          <div className="bid-date">39 minutes ago</div>
                        </div>
                      </div>
                      <div className="bid-product">
                        <Link to="">
                          <img src="/Image/project-thumb-5.png" alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="activity-item like">
                      <div className="bid-placer">
                        <div className="avatar box-42">
                          <Link to="">
                            <img src="/Image/avatar-5.png" alt="avatar" />
                          </Link>
                          <span className="verified">
                            <BsCheck />
                          </span>
                        </div>
                        <div className="bid-info">
                          <div className="bid-title">
                            <span className="gradient-text">
                              <Link to="">Noir Artworks</Link>
                            </span>
                            liked{' '}
                            <span className="colored">
                              <Link to="">Canary’s Kitchen</Link>
                            </span>
                          </div>
                          <div className="bid-date">47 minutes ago</div>
                        </div>
                      </div>
                      <div className="bid-product">
                        <Link to="">
                          <img src="/Image/project-thumb-6.png" alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="activity-item follow">
                      <div className="bid-placer">
                        <div className="avatar box-42">
                          <Link to="">
                            <img src="/Image/avatar-10.png" alt="avatar" />
                          </Link>
                          <span className="verified">
                            <BsCheck />
                          </span>
                        </div>
                        <div className="bid-info">
                          <div className="bid-title">
                            <span className="gradient-text">
                              <Link to="">Nicholas Stevens</Link>
                            </span>
                            is now following{' '}
                            <span className="gradient-text">
                              <Link to="">Jackie Jones</Link>
                            </span>
                          </div>
                          <div className="bid-date">52 minutes ago</div>
                        </div>
                      </div>
                    </div>
                    <div className="activity-item sale">
                      <div className="bid-placer">
                        <div className="avatar box-42">
                          <Link to="">
                            <img src="/Image/avatar.png" alt="avatar" />
                          </Link>
                          <span className="verified">
                            <BsCheck />
                          </span>
                        </div>
                        <div className="bid-info">
                          <div className="bid-title">
                            <span className="gradient-text">
                              <Link to="">
                                {navData?.parsedLoginData?.name}
                              </Link>
                            </span>{' '}
                            sold
                            <span className="colored">
                              <Link to="">Golden Ebony</Link>
                            </span>{' '}
                            for 1.97ETH (104.368 U$D)
                          </div>
                          <div className="bid-date">53 minutes ago</div>
                        </div>
                      </div>
                      <div className="bid-product">
                        <Link to="">
                          <img src="/Image/project-thumb-7.png" alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="activity-item purchase">
                      <div className="bid-placer">
                        <div className="avatar box-42">
                          <Link to="">
                            <img src="/Image/avatar-14.png" alt="avatar" />
                          </Link>
                        </div>
                        <div className="bid-info">
                          <div className="bid-title">
                            <span className="gradient-text">
                              <Link to="">Derek Greyson</Link>
                            </span>
                            purchased{' '}
                            <span className="colored">
                              <Link to="">Bubblegum Dream</Link>
                            </span>
                            for 3.01ETH (169.478 U$D)
                          </div>
                          <div className="bid-date">56 minutes ago</div>
                        </div>
                      </div>
                      <div className="bid-product">
                        <Link to="">
                          <img src="/Image/project-thumb-8.png" alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="activity-item listing">
                      <div className="bid-placer">
                        <div className="avatar box-42">
                          <Link to="">
                            <img src="/Image/avatar-2.png" alt="avatar" />
                          </Link>
                          <span className="verified">
                            <BsCheck />
                          </span>
                        </div>
                        <div className="bid-info">
                          <div className="bid-title">
                            <span className="gradient-text">
                              <Link to="">Jackie Jones</Link>
                            </span>{' '}
                            just listed{' '}
                            <span className="colored">
                              <Link to="">Soul Picz Block</Link>
                            </span>{' '}
                            for 3.25ETH (259.022 U$D)
                          </div>
                          <div className="bid-date">58 minutes ago</div>
                        </div>
                      </div>
                      <div className="bid-product">
                        <Link to="">
                          <img src="/Image/project-thumb-9.png" alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="activity-item bid">
                      <div className="bid-placer">
                        <div className="avatar box-42">
                          <Link to="">
                            <img src="/Image/avatar-15.png" alt="avatar" />
                          </Link>
                        </div>
                        <div className="bid-info">
                          <div className="bid-title">
                            Bid placed by{' '}
                            <span className="gradient-text">
                              <Link to="">Crimson Ray</Link>
                            </span>{' '}
                            of 0.25ETH (67.007u$d) for{' '}
                            <span className="colored">
                              <Link to="">Octo-Oceanic</Link>
                            </span>
                          </div>
                          <div className="bid-date">59 minutes ago</div>
                        </div>
                      </div>
                      <div className="bid-product">
                        <Link to="">
                          <img src="/Image/project-thumb-4.png" alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="load-more_bars">
                    <div className="load-more_bar"></div>
                    <div className="load-more_bar"></div>
                    <div className="load-more_bar"></div>
                    <div className="load-more_bar"></div>
                    <div className="load-more_bar"></div>
                    <div className="load-more_bar"></div>
                    <div className="load-more_bar"></div>
                    <div className="load-more_bar"></div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'about' && (
              <div id="tab6">
                <div className="tab-content">
                  <div className="about-author-wrapper">
                    <div className="author-bio">
                      <div className="small-title">Full Bio</div>
                      <p>
                        I am a self-taught digital artist who specializes in 3d
                        art and motion graphics. Most of my works are inspired
                        by nature and biomechanic themes.
                      </p>
                      <p>
                        What does it mean? Biomechanics is the study of the
                        structure, function and motion of the mechanical aspects
                        of biological systems, at any level from whole organisms
                        to organs, cells and cell organelles, using the methods
                        of mechanics. Biomechanics is a branch of biophysics.
                      </p>
                    </div>
                    <div className="author-details">
                      <div className="small-title">Details</div>
                      <ul className="details-list">
                        <li>
                          <FaRegCircle />
                          <span className="detail-label">Joined</span>
                          <span className="bold">January 5th, 2021</span>
                        </li>
                        <li>
                          <FaRegCircle />
                          <span className="detail-label">Formats</span>
                          <span className="bold">
                            Austin, TX - United States
                          </span>
                        </li>
                        <li>
                          <FaRegCircle />
                          <span className="detail-label">Email</span>
                          <span className="bold">
                            <Link to="mailto:dexstarkart@fakemail.com">
                              dexstarkart@fakemail.com
                            </Link>
                          </span>
                        </li>
                        <li>
                          <FaRegCircle />
                          <span className="detail-label">Speciality</span>
                          <span className="bold">Motion Graphics</span>
                        </li>
                      </ul>
                    </div>
                    <div className="author-social-networks">
                      <div className="small-title">Social Media</div>
                      <ul className="social-styled-list">
                        <li>
                          <a>
                            <span className="marker">
                              <FaNewspaper />
                            </span>
                            www.dexstarkart.com
                            <span className="verified">
                              <BsCheck />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a>
                            <span className="marker">
                              <AiFillFacebook />
                            </span>
                            @dexstarkart
                          </a>
                        </li>
                        <li>
                          <a>
                            <span className="marker">
                              <AiOutlineTwitter />
                            </span>
                            @dexstark_art
                            <span className="verified">
                              <BsCheck />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a>
                            <span className="marker">
                              <BsInstagram />
                            </span>
                            @dexstark
                            <span className="verified">
                              <BsCheck />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a>
                            <span className="marker">
                              <FaNewspaper />
                            </span>
                            @dexstarkstreams
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
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
            Write a reason to report this user !
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
                url={window.location.href}
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
                url={window.location.href}
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
                url={window.location.href}
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
                url={window.location.href}
                // title={title}
                className="shareBtn "
              >
                <FaWhatsapp color="#25d366" fontSize={25} />
              </WhatsappShareButton>
            </div>
            {/* </li> */}
          </ul>
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
                    text={window.location.href}
                    onCopy={() => setState(window.location.href)}
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
    </div>
  );
};

export default MyProfile;
