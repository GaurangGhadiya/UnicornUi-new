import React from 'react';
import OtpInput from 'react-otp-input';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGamepad } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { BsInstagram } from 'react-icons/bs';
import { FaNewspaper } from 'react-icons/fa';
import { AiFillFacebook } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineTwitter } from 'react-icons/ai';

import UseNav from '../../../Hooks/Header/UseNav';
import Social from '../../../components/social';
import { searching } from 'src/redux/reducer/searchFilterSlice';
import { openPopUp } from 'src/redux/reducer/profileUpdateSlice';

const NavBar = () => {
  const navData: any = UseNav();
  const dispatch = useDispatch();
  const openPop = useSelector(openPopUp);

  return (
    <>
      <nav className="border-bottom">
        <div className="navigation-wrapper container flex-space-between align-items-center">
          <ul className="navigation-menu">
            {navData?.navCategoryData?.map((v: any, i: number) => {
              if (v?.menu_sub_categories.length === 0) {
                return (
                  <li key={i} className="menu-item">
                    <Link className="menu-link" to="#">
                      {v?.name}
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li key={i} className="menu-item menu-item-has-children">
                    <Link className="menu-link" to="#">
                      {v?.name}
                      <span className="indicator">
                        <IoIosArrowDown />
                      </span>
                    </Link>
                    <ul className="submenu">
                      {v?.menu_sub_categories?.map((e: any, i: number) => {
                        return (
                          <li
                            key={i}
                            className="menu-item"
                            onClick={() => {
                              window.open(`/explore-items/${e?._id}`, '_blank');
                              dispatch(searching(''));
                            }}
                          >
                            <div className="menu-link">{e?.name}</div>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }
            })}
            <li className="menu-item menu-item-has-children">
              <a className="menu-link">
                More
                <span className="indicator">
                  <IoIosArrowDown />
                </span>
              </a>
              <ul className="submenu">
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
              </ul>
            </li>
          </ul>

          <ul className="social-icons-list">
            <li className="social-icon">
              <Link to="">
                <AiFillFacebook />
              </Link>
            </li>
            <li className="social-icon">
              <Link to="">
                <AiOutlineTwitter />
              </Link>
            </li>
            <li className="social-icon">
              <a
                href="https://www.instagram.com/unicornui.official/?hl=en"
                target="_blank"
              >
                <BsInstagram />
              </a>
            </li>
            <li className="social-icon">
              <Link to="">
                <FaNewspaper />
              </Link>
            </li>
            <li className="social-icon">
              <Link to="">
                <FaGamepad />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Modal
        show={navData?.show}
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
                    <label htmlFor="sign_in_username" className="tk-lp-label">
                      Username or Email Address
                    </label>
                    <input
                      className="tk-lp-input"
                      id="sign_in_username"
                      name="email"
                      type="text"
                      value={navData?.loginData.email}
                      onChange={navData?.stodedata}
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
                  >
                    Log In
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
                    <label htmlFor="sign_in_username" className="tk-lp-label">
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
                    <span className="gradient-text">Enter</span> Your Otp
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
                    <a className="menu-link" onClick={navData?.resendOTP}>
                      Resend Otp?
                    </a>
                  </div>

                  <button
                    type="button"
                    className="tk-lp-button tk-lp-button--grey tk-lp-w-full tk-lp-tabs-form-item mt-3"
                    data-id="sign-up"
                    onClick={navData?.submitOTP}
                  >
                    Submit Otp
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
                    <span className="gradient-text">Forgot</span> Password
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
                    <label htmlFor="sign_in_username" className="tk-lp-label">
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
                    <a className="menu-link" onClick={navData?.backtolog}>
                      Back To Login ?
                    </a>
                  </div>
                  <button
                    type="button"
                    className="submit-bttn tk-lp-button tk-lp-button--dark tk-lp-w-full mt-4"
                    onClick={navData?.sendMail}
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
                    {navData?.isLoading ? 'Loading...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default NavBar;
