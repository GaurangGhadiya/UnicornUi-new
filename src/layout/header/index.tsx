/* eslint-disable*/
import React from 'react';
import { BiDollarCircle, BiSearch, BiWallet } from 'react-icons/bi';
import {
  AiFillLike,
  AiOutlineDelete,
  AiOutlineFileText,
  AiOutlineMenu,
  AiOutlineSave
} from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineBell } from 'react-icons/ai';
import {
  BsFillCloudArrowDownFill,
  BsFillFileEarmarkPostFill,
  BsMinecartLoaded
} from 'react-icons/bs';
import SVG, { Props as SVGProps } from 'react-inlinesvg';

import { IoIosArrowDown } from 'react-icons/io';
import { AiFillFacebook } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';
import { FaCrown, FaNewspaper } from 'react-icons/fa';
import { FaGamepad } from 'react-icons/fa';
import { FaRegCircle } from 'react-icons/fa';
import { HiOutlineUser } from 'react-icons/hi';
import { FiSettings } from 'react-icons/fi';
import { BsCheck } from 'react-icons/bs';
import { BsWallet } from 'react-icons/bs';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { IoIosLogOut } from 'react-icons/io';
import { BsMoonStars } from 'react-icons/bs';
import { GrClose, GrUpdate } from 'react-icons/gr';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Social from '../../components/social';
import UseNav from '../../Hooks/Header/UseNav';
import { Bucket } from 'src/helpers/API/ApiData';
import { getFilter, searching } from 'src/redux/reducer/searchFilterSlice';
import {
  getAuth,
  getSavedCount,
  isOpenModal,
  logOutProfile,
  modalFlag,
  openModal,
  openPopUp,
  userProfile,
  notiCount,
  notificationCount
} from 'src/redux/reducer/profileUpdateSlice';
import { ApiGet, ApiPost } from 'src/services/http-service';
import { Modal_Commen } from 'src/components/modal/Modal_Commen';
import { FcApproval, FcExpired } from 'react-icons/fc';
import { GiCancel } from 'react-icons/gi';
import { MdPayment } from 'react-icons/md';
import Loader from 'src/components/loader';
import NoDataFound from 'src/components/noDataFound';
// import Crown from '../../assets/Image/crown.gif';

const Header = () => {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const isAuth = useSelector(getAuth);
  const history = useHistory();
  const Crown = require('../../assets/Image/crown.gif');
  const navData: any = UseNav();
  const dropdownRef: any = React.useRef();
  const cartMenuRef: any = React.useRef();
  const notificationMenuRef: any = React.useRef();
  const openPop = useSelector(openPopUp);
  const modalOpen = useSelector(modalFlag);
  const count = useSelector(notiCount);
  const searchFilter = useSelector(getFilter);
  const userProfileData = useSelector(userProfile);
  const savedCount2 = useSelector(getSavedCount);
  const [dropDownOpen, setDropDownOpen] = React.useState<boolean>(false);
  const [isLoader, setisLoader] = React.useState<boolean>(false);
  const [notificationMenu, setNotificationMenu] =
    React.useState<boolean>(false);
  const [cartMenu, setCartMenu] = React.useState<boolean>(false);
  console.log('userProfileData', userProfileData);
  React.useEffect(() => {
    if (isAuth) {
      navData?.getCount();
    }
  }, []);

  const logOut = () => {
    navData?.handleLogout();
    dispatch(logOutProfile());
    setDropDownOpen(false);
  };
  const loginModal = () => {
    dispatch(searching(''));
    dispatch(openModal('1'));
    dispatch(isOpenModal(true));
  };

  React.useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [modalOpen]);

  React.useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      dropDownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        setDropDownOpen(false);
      cartMenu &&
        cartMenuRef.current &&
        !cartMenuRef.current.contains(e.target) &&
        setCartMenu(false);
      notificationMenu &&
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(e.target) &&
        setNotificationMenu(false);
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [dropDownOpen, notificationMenu, cartMenu]);

  const [data, setData] = React.useState([]);

  const noification = () => {
    if (isAuth) {
      setisLoader(true);
      setNotificationMenu(!notificationMenu);
      const body = {
        search: '',
        page: 1,
        limit: 5
      };
      ApiPost('/notification/get', body)
        .then((res: any) => {
          setData(res?.data?.notification_data);
          setisLoader(false);
        })
        .catch((e) => {
          setisLoader(false);
        });
    } else {
      loginModal();
    }
  };
  const liked = () => {
    if (isAuth) {
      history.push('/liked-posts');
    } else {
      loginModal();
    }
  };
  const readNotification = () => {
    if (isAuth) {
      ApiGet('/read_notification?read=true').then(() => {
        ApiGet('/notification/count').then((res: any) => {
          dispatch(notificationCount(res?.data?.notificationCount));
        });
      });
    }
  };
  React.useEffect(() => {
    if (isAuth) {
      ApiGet('/notification/count').then((res: any) => {
        dispatch(notificationCount(res?.data?.notificationCount));
      });
    }
  }, []);

  return (
    <header className="site-header">
      <div className="header-strap header-strap-margin"></div>
      <div className="topbar padding-top-bottom border-bottom">
        <div className="topbar-wrapper container">
          <div className="mobile-nav-panel">
            <div className="mobile-nav-header">
              <div className="mobile-menu-logo logo">
                <Link to="/" onClick={() => dispatch(searching(''))}>
                  <img
                    src={'/Image/cryptoki-logo.svg'}
                    alt="Logo"
                    style={{ height: '40px', width: '40px' }}
                    className="mt-2"
                  />
                </Link>
              </div>
              <div className="close-icon">
                <svg className="crumina-icon">
                  <GrClose />
                </svg>
              </div>
            </div>
          </div>

          <div className="offcanvas offcanvas-start" id="demo">
            <div className="offcanvas-header">
              <img
                onClick={() => dispatch(searching(''))}
                className="offcanvas-title"
                src={'/Image/cryptoki-logo.svg'}
                alt="Logo"
                style={{ height: '40px', width: '40px' }}
              />
              <button
                type="button"
                className="btn btn-close text-reset"
                data-bs-dismiss="offcanvas"
              ></button>
            </div>
            <div className="offcanvas-body">
              {/* Header: Menubar */}
              <div className="mobile-menu-wrapper">
                <ul className="mobile-menu">
                  {navData?.navCategoryData?.map((v: any, i: number) => {
                    if (v?.menu_sub_categories.length === 0) {
                      return (
                        <li key={i} className="menu-item">
                          <Link className="menu-link" to="">
                            {v?.name}
                          </Link>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={i}
                          className="menu-item menu-item-has-children"
                        >
                          <a
                            className="menu-link"
                            data-bs-toggle="collapse"
                            href={'#collapseExample' + i}
                            role="button"
                          >
                            {v?.name}
                            <span className="indicator">
                              <IoIosArrowDown />
                            </span>
                          </a>
                          <ul
                            className="submenu collapse"
                            id={'collapseExample' + i}
                          >
                            {v?.menu_sub_categories?.map(
                              (e: any, index: number) => {
                                return (
                                  <li key={index} className="menu-item">
                                    <Link className="menu-link" to="">
                                      {e?.name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </li>
                      );
                    }
                  })}
                  <li className="menu-item menu-item-has-children">
                    <a
                      className="menu-link"
                      data-bs-toggle="collapse"
                      href="#collapseExampleaaa"
                      role="button"
                    >
                      More
                      <span className="indicator">
                        <IoIosArrowDown />
                      </span>
                    </a>
                    <ul className="submenu" id="collapseExampleaaa">
                      <li className="menu-item">
                        <Link className="menu-link" to="/blog_list">
                          Blog
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="menu-link" to="/faq">
                          Frequently Asked Questions
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="menu-link" to="/about-us">
                          About US
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="menu-link" to="/contact-us">
                          Contact Us
                        </Link>
                      </li>
                      <li className="menu-item">
                        <a
                          className="menu-link"
                          onClick={navData?.handleShow}
                          data-bs-dismiss="offcanvas"
                        >
                          Login
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          className="menu-link"
                          onClick={navData?.registerPage}
                          data-bs-dismiss="offcanvas"
                        >
                          Register
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <Modal_Commen />

              {/* <Modal
                show={modalOpen}
                onHide={navData?.handleClose}
                animation={false}
                className=""
              >
                {openPop === '1' && (
                  <Modal.Body>
                    <div className="primary-content-area section-medium content-padding">
                      <div className="extra-small-section">
                        <div className="page-title text-center">
                          <h2>
                            <span className="gradient-text">Account</span> Login
                          </h2>
                        </div>
                        <form
                          id="sign-in"
                          className="tk-lp-form user-register-kit-sign tk-lp-tabs-form-content active"
                          data-handler="lrk_sign_in_action"
                        >
                          <input
                            className="lrk-sign-captcha-token simple-input"
                            type="hidden"
                            name="token"
                            value=""
                          />
                          <input type="hidden" name="redirect_to" value="" />
                          <div className="tk-lp-alert-cont"></div>
                          <div className="tk-lp-form-item">
                            <label
                              htmlFor="sign_in_username"
                              className="tk-lp-label"
                            >
                              Username or Email Address
                            </label>
                            <input
                              className="tk-lp-input"
                              id="sign_in_username"
                              name="email"
                              type="text"
                              value={navData?.loginData.email}
                              onChange={navData?.stodedata}
                              autoComplete="off"
                            />
                          </div>
                          <div className="row  j-end errormsg">
                            <div className="col font_red font_NexaLight text-danger">
                              {navData?.errors['email']}
                            </div>
                          </div>
                          <div className="tk-lp-form-item ">
                            <label
                              htmlFor="sign_in_password"
                              className="tk-lp-label mt-2"
                            >
                              Password
                            </label>
                            <input
                              className="tk-lp-input"
                              id="sign_in_password"
                              name="password"
                              type="password"
                              value={navData?.loginData.password}
                              onChange={navData?.stodedata}
                              autoComplete="off"
                            />
                          </div>
                          <div className="row j-end errormsg">
                            <div className="col font_red font_NexaLight text-danger">
                              {navData?.errors['password']}
                            </div>
                          </div>
                          <div className="tk-lp-form-item">
                            <div className="tk-lp-remember">
                              <label className="tk-lp-checkbox">
                                <input
                                  type="checkbox"
                                  name="rememberme"
                                  value="forever"
                                />
                                <span className="tk-lp-control-indicator"></span>
                                Remember Me
                              </label>
                              <Link
                                to=""
                                className="tk-lp-link-lost tk-lp-tabs-form-item"
                                data-id="lost-password"
                                onClick={navData?.forgotPassword}
                              >
                                Lost your password?
                              </Link>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="submit-bttn tk-lp-button tk-lp-button--dark tk-lp-w-full"
                            onClick={navData?.login}
                            disabled={navData?.isLoading ? true : false}
                          >
                            {navData?.isLoading ? 'Loading...' : 'Log In'}
                          </button>
                          <button
                            type="button"
                            className="tk-lp-button tk-lp-button--grey tk-lp-w-full tk-lp-tabs-form-item"
                            data-id="sign-up"
                            onClick={navData?.registerPage}
                          >
                            Create an Account
                          </button>
                        </form>
                        <Social />
                      </div>
                    </div>
                  </Modal.Body>
                )}
                {openPop === '2' && (
                  <Modal.Body>
                    <div className="primary-content-area section-medium content-padding">
                      <div className="extra-small-section">
                        <div className="page-title text-center">
                          <h2>
                            <span className="gradient-text">Account</span> Login
                          </h2>
                        </div>
                        <form
                          id="sign-in"
                          className="tk-lp-form user-register-kit-sign tk-lp-tabs-form-content active"
                          data-handler="lrk_sign_in_action"
                        >
                          <input
                            className="lrk-sign-captcha-token simple-input"
                            type="hidden"
                            name="token"
                            value=""
                          />
                          <input type="hidden" name="redirect_to" value="" />
                          <div className="tk-lp-alert-cont"></div>
                          <div className="tk-lp-form-item">
                            <label
                              htmlFor="sign_in_username"
                              className="tk-lp-label"
                            >
                              Username
                            </label>
                            <input
                              className="tk-lp-input"
                              id="sign_in_username"
                              name="name"
                              type="text"
                              value={navData?.signUpData.name}
                              onChange={navData?.sinngupdata}
                              autoComplete="off"
                            />
                          </div>
                          <div className="row  j-end errormsg">
                            <div className="col font_red font_NexaLight text-danger">
                              {navData?.signUpErrors['name']}
                            </div>
                          </div>
                          <div className="tk-lp-form-item">
                            <label
                              htmlFor="sign_in_username"
                              className="tk-lp-label mt-2"
                            >
                              Email Address
                            </label>
                            <input
                              className="tk-lp-input"
                              id="sign_in_username"
                              name="email"
                              type="text"
                              value={navData?.signUpData.email}
                              onChange={navData?.sinngupdata}
                              autoComplete="off"
                            />
                          </div>
                          <div className="row  j-end errormsg">
                            <div className="col font_red font_NexaLight text-danger">
                              {navData?.signUpErrors['email']}
                            </div>
                          </div>
                          <div className="tk-lp-form-item ">
                            <label
                              htmlFor="sign_in_password"
                              className="tk-lp-label mt-2"
                            >
                              Password
                            </label>
                            <input
                              className="tk-lp-input"
                              id="sign_in_password"
                              name="password"
                              type="password"
                              value={navData?.signUpData.password}
                              onChange={navData?.sinngupdata}
                              autoComplete="off"
                            />
                          </div>
                          <div className="row  j-end errormsg">
                            <div className="col font_red font_NexaLight text-danger">
                              {navData?.signUpErrors['password']}
                            </div>
                          </div>
                          <div className="tk-lp-form-item">
                            <label
                              htmlFor="sign_in_password"
                              className="tk-lp-label mt-2"
                            >
                              Confirm Password
                            </label>
                            <input
                              className="tk-lp-input"
                              id="sign_in_password"
                              name="confirmPassword"
                              type="password"
                              value={navData?.signUpData.confirmPassword}
                              onChange={navData?.sinngupdata}
                              autoComplete="off"
                            />
                          </div>
                          <div className="row  j-end errormsg">
                            <div className="col font_red font_NexaLight text-danger">
                              {navData?.signUpErrors['confirmPassword']}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="submit-bttn tk-lp-button tk-lp-button--dark tk-lp-w-full mt-3"
                            onClick={navData?.signUp}
                            disabled={navData?.isLoading ? true : false}
                          >
                            {navData?.isLoading ? 'Loading...' : ' Sign Up'}
                          </button>
                          <button
                            type="button"
                            className="tk-lp-button tk-lp-button--grey tk-lp-w-full tk-lp-tabs-form-item"
                            data-id="sign-up"
                            onClick={navData?.handleShow}
                          >
                            Already have an account? Login
                          </button>
                        </form>
                        <Social />
                      </div>
                    </div>
                  </Modal.Body>
                )}
                {openPop === '3' && (
                  <Modal.Body>
                    <div className="primary-content-area section-medium content-padding">
                      <div className="extra-small-section">
                        <div className="page-title text-center">
                          <h2>
                            <span className="gradient-text">Enter</span> Your
                            Otp
                          </h2>
                        </div>
                        <form
                          id="sign-in"
                          className="tk-lp-form user-register-kit-sign tk-lp-tabs-form-content active"
                          data-handler="lrk_sign_in_action"
                        >
                          <input
                            className="lrk-sign-captcha-token simple-input"
                            type="hidden"
                            name="token"
                            value=""
                          />
                          <input type="hidden" name="redirect_to" value="" />
                          <div className="tk-lp-form-item">
                            <label
                              htmlFor="sign_in_password"
                              className="tk-lp-label mt-2"
                            >
                              Enter code:
                            </label>
                            <div className="otpinput">
                              <OtpInput
                                className="otpinput"
                                value={navData?.otp}
                                onChange={navData?.setOTPValue}
                                numInputs={6}
                                separator={<span className=""></span>}
                                isInputNum
                              />
                            </div>
                          </div>
                          <div className="row  j-end errormsg">
                            <div className="col font_red font_NexaLight text-danger">
                              {navData?.otpError['otp']}
                            </div>
                          </div>

                          <div className="text-end resendotp">
                            <a
                              className="menu-link"
                              onClick={navData?.resendOTP}
                            >
                              Resend Otp?
                            </a>
                          </div>

                          <button
                            type="button"
                            className="tk-lp-button tk-lp-button--grey tk-lp-w-full tk-lp-tabs-form-item mt-3"
                            data-id="sign-up"
                            onClick={navData?.submitOTP}
                            disabled={navData?.isLoading ? true : false}
                          >
                            {navData?.isLoading ? 'Loading...' : 'Submit Otp'}
                          </button>
                        </form>
                      </div>
                    </div>
                  </Modal.Body>
                )}
                {openPop === '4' && (
                  <Modal.Body>
                    <div className="primary-content-area section-medium content-padding">
                      <div className="extra-small-section">
                        <div className="page-title text-center">
                          <h2>
                            <span className="gradient-text">Forgat</span>{' '}
                            Password
                          </h2>
                        </div>
                        <form
                          id="sign-in"
                          className="tk-lp-form user-register-kit-sign tk-lp-tabs-form-content active"
                          data-handler="lrk_sign_in_action"
                        >
                          <input
                            className="lrk-sign-captcha-token simple-input"
                            type="hidden"
                            name="token"
                            value=""
                          />
                          <input type="hidden" name="redirect_to" value="" />
                          <div className="tk-lp-alert-cont"></div>
                          <div className="tk-lp-form-item">
                            <label
                              htmlFor="sign_in_username"
                              className="tk-lp-label"
                            >
                              Email Address
                            </label>
                            <input
                              className="tk-lp-input"
                              id="sign_in_username"
                              name="email"
                              type="text"
                              value={navData?.changePasswordEmail?.email}
                              onChange={navData?.forgotValue}
                            />
                          </div>
                          <div className="row  j-end errormsg">
                            <div className="col font_red font_NexaLight text-danger">
                              {navData?.newPassWordError['email']}
                            </div>
                          </div>

                          <div className="text-end">
                            <a
                              className="menu-link"
                              onClick={navData?.backtolog}
                            >
                              Back To Login ?
                            </a>
                          </div>
                          <button
                            type="button"
                            className="submit-bttn tk-lp-button tk-lp-button--dark tk-lp-w-full mt-4"
                            onClick={navData?.sendMail}
                            disabled={navData?.isLoading ? true : false}
                          >
                            {navData?.isLoading ? 'Loading...' : 'Send Mail'}
                          </button>
                        </form>
                      </div>
                    </div>
                  </Modal.Body>
                )}
                {openPop === '5' && (
                  <Modal.Body>
                    <div className="primary-content-area section-medium content-padding">
                      <div className="extra-small-section">
                        <div className="page-title text-center">
                          <h2>
                            <span className="gradient-text">New</span> Password
                          </h2>
                        </div>
                        <form
                          id="sign-in"
                          className="tk-lp-form user-register-kit-sign tk-lp-tabs-form-content active"
                          data-handler="lrk_sign_in_action"
                        >
                          <input
                            className="lrk-sign-captcha-token simple-input"
                            type="hidden"
                            name="token"
                            value=""
                          />
                          <input type="hidden" name="redirect_to" value="" />
                          <div className="tk-lp-alert-cont"></div>
                          <div className="tk-lp-form-item ">
                            <label
                              htmlFor="sign_in_password"
                              className="tk-lp-label mt-2"
                            >
                              Password
                            </label>
                            <input
                              className="tk-lp-input"
                              id="sign_in_password"
                              name="password"
                              type="password"
                              value={navData?.newPassword?.password}
                              onChange={navData?.newPasswordHandler}
                            />
                          </div>
                          <div className="row  j-end errormsg">
                            <div className="col font_red font_NexaLight text-danger">
                              {navData?.passwordError['password']}
                            </div>
                          </div>
                          <div className="tk-lp-form-item">
                            <label
                              htmlFor="sign_in_password"
                              className="tk-lp-label mt-2"
                            >
                              Confirm Password
                            </label>
                            <input
                              className="tk-lp-input"
                              id="sign_in_password"
                              name="confirmPassword"
                              type="password"
                              value={navData?.newPassword?.confirmPassword}
                              onChange={navData?.newPasswordHandler}
                            />
                          </div>
                          <div className="row  j-end errormsg">
                            <div className="col font_red font_NexaLight text-danger">
                              {navData?.passwordError['confirmPassword']}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="submit-bttn tk-lp-button tk-lp-button--dark tk-lp-w-full mt-4"
                            onClick={navData?.updatePassword}
                            disabled={navData?.isLoading ? true : false}
                          >
                            {navData?.isLoading
                              ? 'Loading...'
                              : 'Update Password'}
                          </button>
                        </form>
                      </div>
                    </div>
                  </Modal.Body>
                )}
              </Modal> */}

              <div className="mobile-nav-footer">
                <ul className="social-icons-list">
                  <li className="social-icon">
                    <Link to="#">
                      <svg className="crumina-icon">
                        <AiFillFacebook />
                      </svg>
                    </Link>
                  </li>
                  <li className="social-icon">
                    <Link to="#">
                      <svg className="crumina-icon">
                        <AiOutlineTwitter />
                      </svg>
                    </Link>
                  </li>
                  <li className="social-icon">
                    <Link to="#">
                      <svg className="crumina-icon">
                        <BsInstagram />
                      </svg>
                    </Link>
                  </li>
                  <li className="social-icon">
                    <Link to="#">
                      <svg className="crumina-icon">
                        <FaNewspaper />
                      </svg>
                    </Link>
                  </li>
                  <li className="social-icon">
                    <Link to="#">
                      <svg className="crumina-icon">
                        <FaGamepad />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="burger-icon">
            <button
              className="sidebarbtn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#demo"
            >
              <AiOutlineMenu size={20} />
            </button>
          </div>
          <div className="logo ">
            <Link
              className="logo-link"
              to="/"
              onClick={() => dispatch(searching(''))}
            >
              <div className="logo-img">
                <img src={'/Image/cryptoki-logo.svg'} alt="Logo" />
              </div>
              <div className="logo-text">UnicornUI</div>
            </Link>
          </div>
          <div className="searchbox">
            <form className="main-search" onSubmit={(e) => e.preventDefault()}>
              <button className="search-params">
                <span className="search-param-title">Search</span>
              </button>
              <input
                type="text"
                className="search-input"
                name="head-search"
                id="head-search"
                value={searchFilter}
                placeholder="Enter your search here..."
                onChange={(e) => dispatch(searching(e.target.value))}
              />

              {searchFilter ? (
                <button
                  className="search-button"
                  onClick={() => dispatch(searching(''))}
                >
                  <GrClose size={25} />
                </button>
              ) : (
                <button className="search-button">
                  <BiSearch size={25} />
                </button>
              )}
            </form>
          </div>
          <button id="mobile-search">
            <svg className="crumina-icon open-button">
              <BiSearch size={20} />
            </svg>
          </button>
          <div className="collection-box">
            {navData?.navbarlogin === '0' && userProfileData === null ? (
              <div
                onClick={() => history.push('/upload')}
                className="btn btn-normal btn-dark create-collection waves-effect waves-button waves-float waves-light"
                style={{ color: 'white' }}
              >
                Create
              </div>
            ) : (
              <Link
                to="/upload"
                onClick={() => dispatch(searching(''))}
                className="btn btn-normal btn-dark create-collection waves-effect waves-button waves-float waves-light"
                style={{ color: 'white' }}
              >
                Create
              </Link>
            )}
            {(!isAuth || !userProfileData?.isPlanPurchase) && (
              <div className="collection-title">
                <button
                  className="btn btn-fullwidth d-flex align-items-center  gradient-background  border-none myBtnColor"
                  onClick={() => window.open('/plan')}
                  style={{
                    border: 'none',
                    width: 'max-content',
                    padding: '4.5px 22px 4.5px 12px'
                  }}
                >
                  <img src={Crown} width={45} className="mx-1" />
                  <span className="mx-1">Go Premium</span>
                </button>
              </div>
            )}
            {isAuth && userProfileData?.isPlanPurchase && (
              <div className="collection-title">
                <Link to="/saved-posts">
                  My Collection
                  {savedCount2 != 0 && (
                    <span className="count colored">{savedCount2}</span>
                  )}
                </Link>
              </div>
            )}
          </div>

          <div
            className="user-activity-buttons"
            style={{ display: 'flxe', alignItems: 'center' }}
          >
            <div className="favourites-button-cont">
              <button
                className="favourites-button cryptoki-notif-bttn"
                data-target=""
                onClick={() => liked()}
              >
                <SVG src="/Image/Icons/like.svg" className="iconsSize" />

                {/* <AiOutlineHeart /> */}
              </button>
            </div>
            <div className="notifications-button-cont">
              <button
                ref={notificationMenuRef}
                className="notifications-button cryptoki-notif-bttn"
                onClick={() => noification()}
              >
                {count === 0 ? ' ' : <span className="counter">{count}</span>}
                <SVG
                  src="/Image/Icons/notification.svg"
                  className="iconsSize"
                />

                {/* <AiOutlineBell /> */}
              </button>
              <div
                id="notifications-dropdown"
                className={`cryptoki-notif-target ${
                  notificationMenu && 'active'
                }`}
              >
                {/* <div className="title">
                  {' '}
                  Notifications <span className="colored">{count}</span>
                </div> */}
                {isLoader ? (
                  <div className="my-4">
                    <Loader />
                  </div>
                ) : (
                  <div className="notifications-wrapper cryptoki-scrollbar">
                    {data.length ? (
                      data?.map((e: any, i: number) => {
                        const time = Date();
                        let now = moment(time).format('DD/MM/YYYY HH:mm:ss');
                        let then = moment(e?.createdAt).format(
                          'DD/MM/YYYY HH:mm:ss'
                        );
                        let ms: any = moment(now, 'DD/MM/YYYY HH:mm:ss').diff(
                          moment(then, 'DD/MM/YYYY HH:mm:ss')
                        );
                        let year: any = moment.duration(ms).get('year');
                        let month: any = moment.duration(ms).get('month');
                        let day: any = moment.duration(ms).get('day');
                        let hour: any = moment.duration(ms).get('hours');
                        let minutes: any = moment.duration(ms).get('minutes');
                        let second: any = moment.duration(ms).get('seconds');
                        return (
                          <>
                            <div className="notification">
                              <Link
                                to={
                                  e?.post[0]?._id
                                    ? `/productdetail/${e?.post[0]?._id}`
                                    : ''
                                }
                                onClick={() => {
                                  dispatch(searching(''));
                                }}
                              >
                                <div className="thumb-box">
                                  <img
                                    src={
                                      e?.post[0]?.thumbnail
                                        ? Bucket + e?.post[0]?.thumbnail
                                        : '/Image/avatar.png'
                                    }
                                    width="50"
                                    height="50"
                                    alt=""
                                    loading="lazy"
                                  />
                                  <span className="bid-type">
                                    <svg className="crumina-icon">
                                      {e?.notificationType === 0 && (
                                        <FcApproval />
                                      )}
                                      {e?.notificationType === 1 && (
                                        <GiCancel />
                                      )}
                                      {e?.notificationType === 2 && (
                                        <GrUpdate />
                                      )}
                                      {e?.notificationType === 3 && (
                                        <AiOutlineDelete />
                                      )}
                                      {e?.notificationType === 4 && (
                                        <AiOutlineHeart />
                                      )}
                                      {e?.notificationType === 5 && (
                                        <AiOutlineSave />
                                      )}
                                      {e?.notificationType === 6 && (
                                        <BsWallet />
                                      )}
                                      {e?.notificationType === 7 && (
                                        <FcApproval />
                                      )}
                                      {e?.notificationType === 8 && (
                                        <GiCancel />
                                      )}
                                      {e?.notificationType === 9 && (
                                        <GrUpdate />
                                      )}
                                      {e?.notificationType === 10 && (
                                        <FcExpired />
                                      )}
                                      {e?.notificationType === 11 && (
                                        <GiCancel />
                                      )}
                                      {e?.notificationType === 12 && (
                                        <MdPayment />
                                      )}
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <div className="notification-info">
                                <div className="message">
                                  <Link
                                    to={
                                      e?.user[0]?._id
                                        ? `/public/${e?.user[0]?._id}/profile`
                                        : ''
                                    }
                                    className="bold"
                                    onClick={() => {
                                      dispatch(searching(''));
                                    }}
                                  >
                                    @{e?.user[0]?.username}
                                  </Link>{' '}
                                  <Link to="" className="bold">
                                    {e?.description}
                                  </Link>
                                </div>
                                <div className="publish-date">
                                  {year !== 0
                                    ? `${year} year ago`
                                    : month !== 0
                                    ? `${month} month ago`
                                    : day !== 0
                                    ? `${day} day ago`
                                    : hour !== 0
                                    ? `${hour} hour ago`
                                    : minutes !== 0
                                    ? `${minutes} minutes ago`
                                    : second !== 0
                                    ? `${second} second ago`
                                    : 'just now'}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <NoDataFound />
                    )}
                  </div>
                )}
                {data.length ? (
                  <Link
                    to="/notifications"
                    className="btn-small-fullwidth btn-dark btn-square waves-effect waves-button waves-float waves-light"
                    onClick={readNotification}
                  >
                    View all Notifications
                  </Link>
                ) : (
                  ''
                )}
              </div>
            </div>
            {navData?.navbarlogin === '0' && userProfileData === null ? (
              <>
                <div
                  className="collection-box loginnbtn"
                  // onClick={() => dispatch(searching(''))}
                >
                  <button
                    className="btn btn-normal btn-dark create-collection waves-effect waves-button waves-float waves-light"
                    style={{ color: 'white' }}
                    onClick={loginModal}
                  >
                    Log In
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="header-user-profile cryptoki-notif-bttn">
                  <div
                    className="user-meta"
                    ref={dropdownRef}
                    onClick={() => {
                      setDropDownOpen(!dropDownOpen);
                    }}
                  >
                    <div className="user_name">{userProfileData?.name}</div>
                    <div className="user_score">
                      <span>
                        <FaRegCircle />
                      </span>
                      291.36 ETH
                    </div>
                  </div>

                  <div className="avatar box-42">
                    <div
                      ref={dropdownRef}
                      onClick={() => {
                        setDropDownOpen(!dropDownOpen);
                      }}
                      style={{ position: 'relative' }}
                    >
                      <source type="image/avif" srcSet="avif/avatar.avif" />
                      <img
                        src={
                          userProfileData?.image === null
                            ? '/Image/avatar.png'
                            : userProfileData?.image?.includes(
                                'googleusercontent'
                              ) || userProfileData?.image?.includes('fbsbx')
                            ? userProfileData?.image
                            : Bucket + userProfileData?.image
                        }
                        loading="lazy"
                        width="100"
                        height="100"
                        alt="avtar"
                        style={{ objectFit: 'cover' }}
                      />
                      {isAuth && userProfileData?.isCreator ? (
                        <span className="verified">
                          <BsCheck />
                        </span>
                      ) : userProfileData?.isPlanPurchase ? (
                        <span className="premium">
                          <FaCrown className="crown_icons" />
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className="closing-icon">
                    <div className="closeiconshow">
                      <GrClose size={30} />
                    </div>
                  </div>
                  <div
                    id="profile-dropdown"
                    className={`cryptoki-notif-target ${
                      dropDownOpen && 'active'
                    }`}
                  >
                    <div
                      className="profile-dropdown-header profile-cover-image"
                      style={{
                        backgroundImage:
                          userProfileData?.coverImage === null
                            ? `url('/Image/profile-cover-1.jpg')`
                            : `url(${Bucket + userProfileData?.coverImage})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                      }}
                    />

                    <div className="profile-dropdown-body">
                      <div className="profile-heading">
                        <div className="profile-avatar avatar box-26">
                          <img
                            src={
                              userProfileData?.image === null
                                ? '/Image/avatar.png'
                                : userProfileData?.image?.includes(
                                    'googleusercontent'
                                  )
                                ? userProfileData?.image
                                : Bucket + userProfileData?.image
                            }
                            // src="https://img.icons8.com/clouds/100/000000/user.png"
                            alt="avatar"
                            loading="lazy"
                            height="100"
                            width="100"
                            style={{ objectFit: 'cover' }}
                          />
                          {/* {userProfileData?.isCreator && (
                            <span className="verified">
                              <BsCheck />
                            </span>
                          )} */}
                          {isAuth && userProfileData?.isCreator ? (
                            <span className="verified">
                              <BsCheck />
                            </span>
                          ) : userProfileData?.isPlanPurchase ? (
                            <span className="premium">
                              <FaCrown className="crown_icons" />
                            </span>
                          ) : (
                            ''
                          )}
                        </div>

                        <div
                          className="profile-link"
                          onClick={() => dispatch(searching(''))}
                        >
                          <Link
                            className="btn btn-small gradient-background border-none"
                            to={`/profileinfo`}
                          >
                            My Profile
                          </Link>
                        </div>
                      </div>
                      <ul className="profile-menu">
                        <li
                          className="profile menu-list"
                          onClick={() => dispatch(searching(''))}
                        >
                          <Link
                            to="/profileinfo"
                            className={`${
                              history.location.pathname === '/profileinfo' &&
                              'activeTab'
                            }`}
                          >
                            <SVG
                              src="/Image/Icons/profile.svg"
                              className="iconsSize"
                            />
                            Profile Info
                          </Link>
                        </li>
                        <li
                          className="profile menu-list"
                          onClick={() => dispatch(searching(''))}
                        >
                          <Link
                            to="/my-posts"
                            className={`${
                              history.location.pathname === '/my-posts' &&
                              'activeTab'
                            }`}
                          >
                            <SVG
                              src="/Image/Icons/mypost.svg"
                              className="iconsSize"
                            />
                            My Posts
                          </Link>
                        </li>
                        <li
                          className="profile menu-list"
                          onClick={() => dispatch(searching(''))}
                        >
                          <Link
                            to="/my-downloads"
                            className={`${
                              history.location.pathname === '/my-downloads' &&
                              'activeTab'
                            }`}
                          >
                            <SVG
                              src="/Image/Icons/mydownloads.svg"
                              className="iconsSize"
                            />
                            My downloads
                          </Link>
                        </li>
                        <li
                          className="profile menu-list"
                          onClick={() => dispatch(searching(''))}
                        >
                          <Link
                            to="/liked-posts"
                            className={`${
                              history.location.pathname === '/liked-posts' &&
                              'activeTab'
                            }`}
                          >
                            <SVG
                              src="/Image/Icons/like.svg"
                              className="iconsSize"
                            />
                            Liked Posts
                          </Link>
                        </li>

                        <li
                          className="profile menu-list"
                          onClick={() => dispatch(searching(''))}
                        >
                          <Link
                            to="/saved-posts"
                            className={`${
                              history.location.pathname === '/saved-posts' &&
                              'activeTab'
                            }`}
                          >
                            <SVG
                              src="/Image/Icons/saved.svg"
                              className="iconsSize"
                            />
                            Saved Posts
                          </Link>
                        </li>
                        <li
                          className="account menu-list"
                          onClick={() => dispatch(searching(''))}
                        >
                          <Link
                            to="/account-setting"
                            className={`${
                              history.location.pathname ===
                                '/account-setting' && 'activeTab'
                            }`}
                          >
                            <SVG
                              src="/Image/Icons/account-setting.svg"
                              className="iconsSize"
                            />
                            Account Settings
                          </Link>
                        </li>
                        <li
                          className="notification menu-list"
                          onClick={() => dispatch(searching(''))}
                        >
                          <Link
                            to="/sales-statement"
                            className={`${
                              history.location.pathname ===
                                '/sales-statement' && 'activeTab'
                            }`}
                          >
                            <SVG
                              src="/Image/Icons/sales-statement.svg"
                              className="iconsSize"
                            />
                            Sales Statement
                          </Link>
                        </li>
                        <li
                          className="artwork menu-list"
                          onClick={() => dispatch(searching(''))}
                        >
                          <Link
                            to="/payouts"
                            className={`${
                              history.location.pathname === '/payouts' &&
                              'activeTab'
                            }`}
                          >
                            <SVG
                              src="/Image/Icons/payout.svg"
                              className="iconsSize"
                            />
                            Payouts
                          </Link>
                        </li>
                        <li
                          className="wallet menu-list"
                          onClick={() => dispatch(searching(''))}
                        >
                          <Link
                            to="/YourPurchases"
                            className={`${
                              history.location.pathname === '/YourPurchases' &&
                              'activeTab'
                            }`}
                          >
                            <SVG
                              src="/Image/Icons/purchase.svg"
                              className="iconsSize"
                            />
                            Purchases
                          </Link>
                        </li>

                        {!userProfileData?.isCreator && (
                          <li
                            className="verification menu-list"
                            onClick={() => dispatch(searching(''))}
                          >
                            <Link
                              to="/getVerified"
                              className={`${
                                history.location.pathname === '/getVerified' &&
                                'activeTab'
                              }`}
                            >
                              <SVG
                                src="/Image/Icons/get-verified.svg"
                                className="iconsSize"
                              />
                              Get Verified
                            </Link>
                          </li>
                        )}
                        <li className="logout menu-list">
                          <a
                            onClick={() => {
                              dispatch(searching('')), logOut();
                            }}
                          >
                            <SVG
                              src="/Image/Icons/logout.svg"
                              className="iconsSize"
                            />
                            Log Out
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* <div className="profile-dropdown-footer">
                      <div className="mode-toggle">
                        <div className="mode-title">
                          <span>
                            <svg className="crumina-icon">
                              <BsMoonStars />
                            </svg>
                          </span>
                          Night-mode
                        </div>
                        <label className="toggle-control">
                          <input type="checkbox" />
                          <span className="control"></span>
                        </label>
                      </div>
                    </div> */}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div id="mobile-search-block">
        <form action="#" id="mobile-search-form">
          <input
            type="text"
            className="search-input"
            name="mobile-search"
            placeholder="Enter your search here..."
            onChange={(event) => dispatch(searching(event?.target.value))}
          />
          <button className="search-button">
            <BiSearch />
          </button>
        </form>
      </div>
    </header>
  );
};
export default Header;
