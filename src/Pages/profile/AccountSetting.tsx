import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import UseNav from 'src/Hooks/Header/UseNav';
import Aside from '../../components/aside';
import { Link } from 'react-router-dom';
import { openPopUp } from 'src/redux/reducer/profileUpdateSlice';

const AccountSetting = () => {
  const [profileData, setprofileData] = useState({ email: '' });
  window.console.log(
    '🚀 ~ file: AccountSetting.tsx ~ line 13 ~ AccountSetting ~ profileData',
    profileData
  );
  useEffect(() => {
    if (localStorage.getItem('logindata')) {
      setprofileData(JSON.parse(localStorage.getItem('logindata') || ''));
    }
  }, []);

  const navData: any = UseNav();
  const openPop = useSelector(openPopUp);

  React.useEffect(() => {
    if (navData?.show) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [navData?.show]);

  return (
    <>
      <div className="primary-content-area container content-padding grid-left-sidebar">
        <Aside />
        <div className="main-content-area">
          <div className="page-title">
            <h2>
              <span className="gradient-text">Account</span> Settings
            </h2>
          </div>
          <div className="my-4">
            <h6>Change Password</h6>
          </div>
          <div className="user-db-content-area">
            <form className="cryptoki-form" id="personal-info-form">
              <div className="form-group row">
                <div className="form-field col-12">
                  <label htmlFor="current">Current Password</label>
                  <input
                    name="currentPassword"
                    type="password"
                    value={navData?.newPassword?.currentPassword}
                    onChange={navData?.newPasswordHandler}
                    id="current"
                  />
                </div>
                <div className="row  j-end errormsg">
                  <div className="col font_red font_NexaLight text-danger">
                    {navData?.passwordError['currentPassword']}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="form-field col-12">
                  <label htmlFor="New">New Password</label>
                  <input
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
              </div>
              <div className="form-group row">
                <div className="form-field col-12">
                  <label htmlFor="Confirm">Confirm Passsword</label>
                  <input
                    className="mb-4"
                    name="confirmPassword"
                    type="password"
                    value={navData?.newPassword?.confirmPassword}
                    onChange={navData?.newPasswordHandler}
                    id="confirmPassword"
                  />
                </div>
                <div className="row  j-end errormsg">
                  <div className="col font_red font_NexaLight text-danger">
                    {navData?.passwordError['confirmPassword']}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <button
            className="btn btn-wide btn-dark waves-effect waves-button waves-float waves-light col-12 mb-4 m-35"
            onClick={navData?.changeProfilePassword}
          >
            Change Password
          </button>

          <div className="mt-5 ">
            <h6>Email Setting</h6>
          </div>
          <form className="cryptoki-form" id="personal-info-form">
            <div className="form-group row">
              <div className="form-field col-md-6">
                <label htmlFor="Email">Your Email</label>
                <input
                  type="text"
                  id="Email"
                  defaultValue={profileData?.email}
                  disabled
                />
              </div>
              <div className="form-field col-md-6">
                <label htmlFor="Notification">Your Notification</label>
                <Link to="/manage_Account">
                  <button
                    type="button"
                    className="btn btn-wide btn-dark waves-effect waves-button waves-float waves-light col-12"
                  >
                    Manage Notification
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal
        show={navData?.show}
        onHide={navData?.handleClose}
        animation={false}
        className=""
      >
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
                    <Link
                      to=""
                      className="menu-link"
                      onClick={navData?.resendOTP}
                    >
                      Resend Otp?
                    </Link>
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
      </Modal>
    </>
  );
};

export default AccountSetting;
