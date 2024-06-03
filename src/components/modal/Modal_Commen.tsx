import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import UseNav from 'src/Hooks/Header/UseNav';
import {
  isOpenModal,
  modalFlag,
  openModal,
  openPopUp
} from 'src/redux/reducer/profileUpdateSlice';
import Social from '../social';
import { Dialog, DialogContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paperScrollPaper: {
    minWidth: '450px'
  }
}));

export const Modal_Commen = ({ flag }: any) => {
  const classes = useStyles();
  const navData: any = UseNav();
  const history = useHistory();
  const dispatch = useDispatch();

  const modalOpen = useSelector(modalFlag);
  console.log('🚀 ~ file: Modal_Commen.tsx ~ line 24 ~ modalOpen', modalOpen);
  const [modal, setmodal] = useState(true);
  const openPop = useSelector(openPopUp);
  const [successModal, setsuccessModal] = useState(true);

  useEffect(() => {
    if (openPop === '6') setsuccessModal(true);
  }, []);

  const closeModal1 = () => {
    setsuccessModal(false);
    dispatch(openModal('1'));
    dispatch(isOpenModal(true));
  };

  return (
    <div>
      {openPop !== '6' && (
        <Modal
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
                        autoComplete="off"
                      />
                    </div>
                    <div className="row j-end errormsg">
                      <div
                        className="col font_red font_NexaLight text-danger"
                        style={{ letterSpacing: 'initial', wordSpacing: '2px' }}
                      >
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
                      <div
                        className="col font_red font_NexaLight text-danger"
                        style={{ letterSpacing: 'initial', wordSpacing: '2px' }}
                      >
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
                      <span className="gradient-text">Create</span> Account
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
                      <div
                        className="col font_red font_NexaLight text-danger"
                        style={{ letterSpacing: 'initial', wordSpacing: '2px' }}
                      >
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
                      <div
                        className="col font_red font_NexaLight text-danger"
                        style={{ letterSpacing: 'initial', wordSpacing: '2px' }}
                      >
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
                      <div
                        className="col font_red font_NexaLight text-danger"
                        style={{ letterSpacing: 'initial', wordSpacing: '2px' }}
                      >
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
                      <div
                        className="col font_red font_NexaLight text-danger"
                        style={{ letterSpacing: 'initial', wordSpacing: '2px' }}
                      >
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
                      className={`tk-lp-button tk-lp-button--grey tk-lp-w-full tk-lp-tabs-form-item mt-3 ${
                        navData?.otp?.length === 6 &&
                        'gradient-background text-white'
                      }`}
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
                      <div
                        className="col font_red font_NexaLight text-danger"
                        style={{ letterSpacing: 'initial' }}
                      >
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
      )}

      {openPop === '6' && (
        <Dialog
          maxWidth="md"
          classes={{ paper: classes.paperScrollPaper }}
          open={successModal}
          onClose={closeModal1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent className="curveImage" id="style-1">
            {/* <Row style={{ direction: 'rtl' }}>
            <div className="cursor-pointer">
              <CgClose onClick={closeModal} />
            </div>
          </Row> */}
            <div className="text-center">
              <img
                src={flag === 'error' ? 'Image/false.png' : 'Image/true.png'}
                width={100}
              />

              <>
                <h6 className="my-3">Account Created</h6>

                <p>Congratulation! Your account has been created succesfully</p>
              </>
            </div>
            <div className="d-flex">
              {/* <button
              className="btn btn-fullwidth btn-dark mb-3 saved  "
              type="button"
              // onClick={() => setModal(false)}
            >
              Done
            </button> */}
              <button
                className="btn btn-fullwidth gradient-background mb-3  d-flex justify-content-center "
                type="button"
                onClick={closeModal1}
                // onClick={() => postDetete(productId)}
              >
                Done
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
