import React from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import { useMutation, useQuery } from 'react-query';

import { ApiGetNoAuth, ApiPostNoAuth } from '../../services/http-service';
import Auth from 'src/helpers/Auth';
import { STORAGEKEY } from 'src/config/APP/app.config';
import { ErrorToast, SuccessToast } from 'src/helpers/Toast';
import { useDispatch } from 'react-redux';
import {
  isOpenModal,
  openModal,
  notificationCount,
  savedCount,
  userLogin
} from 'src/redux/reducer/profileUpdateSlice';
import { ApiGet, ApiPost } from 'src/helpers/API/ApiData';

const UseNav = () => {
  const history = useHistory();
  const [navCategoryData, setNavCategoryData] = React.useState([]);
  const [navbarlogin, setNavbarLogin] = React.useState('0');
  const [loginData, setloginData] = React.useState({
    email: '',
    password: ''
  });
  const [errors, setError] = React.useState({});
  const [saveLoginData, setSaveLoginData] = React.useState([]);
  const [signUpData, setSignUpData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [saveSignUpData, setSaveSignUpData] = React.useState<any>([]);
  const [signUpErrors, setSignUpErrors] = React.useState({});
  const [otpError, setOtpError] = React.useState({});
  const [otp, setOTP] = React.useState('');
  const [changePasswordEmail, setChangePasswordEmail] = React.useState<any>({
    email: ''
  });
  const [savePasswordId, setSavePasswordId] = React.useState('');
  const [newPassword, setNewPassword] = React.useState({
    currentPassword: '',
    password: '',
    confirmPassword: ''
  });
  const [newPassWordError, setNewPasswordError] = React.useState({});
  const [passwordError, setPasswordError] = React.useState({});
  const [saveNewUserData, setSaveNewUserData] = React.useState('');
  const [verify, setVerify] = React.useState(0);
  // const [savedCount, setSavedCount] = React.useState(0);
  const [isLoading, setisLoading] = React.useState(false);
  const logindata: any = localStorage.getItem('logindata');
  const parsedLoginData = JSON.parse(logindata);
  const dispatch = useDispatch();

  useQuery('fetchCategory', () => ApiGetNoAuth('user/category'), {
    onSuccess: (response: any) => {
      setNavCategoryData(response?.data?.data?.menu_categories);
    }
  });

  const getCount = async () => {
    await ApiGet('/post/favorite_post/count').then(async (res: any) => {
      await dispatch(savedCount(res?.data?.count));
    });
  };

  const { mutate: sendLoginData } = useMutation(
    (data) => ApiPostNoAuth('user/login', data),
    {
      onSuccess: async (res: any) => {
        setisLoading(false);
        setNavbarLogin('0');
        dispatch(userLogin(res?.data?.data));
        // history.push('/');
        localStorage.setItem('logindata', JSON.stringify(res?.data?.data));
        Auth.setAuthToken(res?.data?.data?.token);
        getCount();
        dispatch(isOpenModal(false));
        SuccessToast(res?.data?.message);
        ApiGet('/notification/count').then((res: any) => {
          dispatch(notificationCount(res?.data?.notificationCount));
        });
      },
      onError: (err: any) => {
        setisLoading(false);
        ErrorToast(err?.message);
        // {
        //   err?.status === 502 && dispatch(openModal('3'));
        //   const body = {
        //     email: loginData?.email
        //   };
        //   ApiPostNoAuth('user/resend_otp', body).then((res: any) => {
        //     setVerify(res?.data?.status);
        //   });
        // }
      }
    }
  );

  const { mutate: sendSignUpData } = useMutation(
    (data) => ApiPostNoAuth('user/signUp', data),
    {
      onSuccess: (res: any) => {
        setSaveNewUserData(res);
        SuccessToast(res?.data?.message);
        setisLoading(false);
        dispatch(openModal('3'));
        setSignUpData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      },
      onError: (err: any) => {
        if (err.status === 502) {
          ErrorToast(err?.message);
          dispatch(openModal('3'));
          setisLoading(false);
        } else {
          ErrorToast(err?.message);
          setisLoading(false);
        }
      }
    }
  );

  const { mutate: submitOTPMutate } = useMutation(
    (data) => ApiPostNoAuth('user/otp_verification', data),
    {
      onSuccess: (res: any) => {
        console.log('0000000000000000000000000000000', res);

        const isChangePassword =
          history.location.pathname === '/change-password' ? true : false;
        setSavePasswordId(res?.data?.data?._id);
        SuccessToast(res?.data?.message);
        savePasswordId && isChangePassword && updatePassword();
        console.log('res?.data?.status', res?.data?.status);

        if (res?.data?.status == 200) {
          console.log('iffffff');
          if (localStorage.getItem('dummyEmail')) {
            dispatch(openModal('5'));
          } else {
            dispatch(openModal('6'));
          }
        } else if (res?.status == 200) {
          dispatch(openModal('1'));
        } else {
          console.log('elseeeee');
          if (saveSignUpData[0]?.name === undefined) {
            dispatch(openModal('5'));
          } else {
            dispatch(isOpenModal(false));
          }
        }

        setChangePasswordEmail('');
        localStorage.removeItem('dummyEmail');
      },
      onError: (err: any) => {
        ErrorToast(err?.message);
      }
    }
  );

  const { mutate: resendOTPMutate } = useMutation(
    (data) => ApiPostNoAuth('user/resend_otp', data),
    {
      onSuccess: (res: any) => {
        SuccessToast(res?.data?.message);
      },
      onError: (err: any) => {
        ErrorToast(err?.message);
      }
    }
  );

  const { mutate: sendMailMutate } = useMutation(
    (data) => ApiPostNoAuth('user/forgot_password', data),

    {
      onSuccess: (res: any) => {
        SuccessToast(res?.data?.message);
        dispatch(isOpenModal(true));
        setisLoading(false);
        dispatch(openModal('3'));
        setChangePasswordEmail('');
      },
      onError: (err: any) => {
        setisLoading(false);
        ErrorToast(err?.message);
      }
    }
  );

  const { mutate: updatePasswordMutate } = useMutation(
    (data) => ApiPostNoAuth('user/reset_password', data),
    {
      onSuccess: (res: any) => {
        SuccessToast(res?.data?.message);
        dispatch(isOpenModal(true));
        setisLoading(false);
        dispatch(openModal('1'));
      },
      onError: (err: any) => {
        ErrorToast(err?.message);
      }
    }
  );

  const { mutate: passwordUpdateMutate } = useMutation(
    (data) => ApiPost('/change_password', data),
    {
      onSuccess: (res: any) => {
        // dispatch(openModal('1'))
        setisLoading(false);
        SuccessToast(res?.message);
        setNewPassword({
          currentPassword: '',
          password: '',
          confirmPassword: ''
        });
      },
      onError: (err: any) => {
        setisLoading(false);
        ErrorToast(err?.message);
      }
    }
  );

  const { mutate: loginbyGoogleMutate } = useMutation(
    (data) => ApiPostNoAuth('user/google', data),
    {
      onSuccess: (res: any) => {
        setNavbarLogin('0');
        localStorage.setItem('logindata', JSON.stringify(res?.data?.data));
        dispatch(userLogin(res?.data?.data));
        Auth.setAuthToken(res?.data?.data?.token);
        dispatch(isOpenModal(false));
        SuccessToast(res?.data?.message);
        // history.push('/');
        // history.go(0);
      },
      onError: (err: any) => {
        ErrorToast(err?.message);
      }
    }
  );

  const { mutate: loginbyFBMutate } = useMutation(
    (data) => ApiPostNoAuth('user/facebook', data),
    {
      onSuccess: (res: any) => {
        setNavbarLogin('0');
        localStorage.setItem('logindata', JSON.stringify(res?.data?.data));
        dispatch(userLogin(res?.data?.data));
        Auth.setAuthToken(res?.data?.data?.token);
        dispatch(isOpenModal(false));
        SuccessToast(res?.data?.message);
        // history.push('/');
        // history.go(0);
      },
      onError: (err: any) => {
        ErrorToast(err?.message);
      }
    }
  );

  const handleClose = () => {
    dispatch(isOpenModal(false));
    setError({});
    setSignUpErrors({});
    setNewPasswordError({});
    setPasswordError({});
    setOtpError({});
  };

  const handleLogout = () => {
    localStorage.removeItem('logindata');
    localStorage.removeItem('token');
    localStorage.removeItem('socialAccData');
    setNavbarLogin('0');
    setVerify(0);
    history.push('/');
  };

  const handleShow = () => {
    dispatch(openModal('1'));
    dispatch(isOpenModal(true));
  };

  const stodedata = (e: any) => {
    const { name, value } = e.target;
    setloginData({
      ...loginData,
      [name]: value
    });
  };

  const sinngupdata = (e: any) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value
    });
  };

  const backtolog = () => {
    dispatch(openModal('1'));
  };

  const newPasswordHandler = (e: any) => {
    const { name, value } = e.target;
    setNewPassword({
      ...newPassword,
      [name]: value
    });
  };

  const validateLoginForm = () => {
    const errors: any = {};
    let loginFormIsValid = true;

    if (!loginData.email) {
      loginFormIsValid = false;
      errors['email'] = 'Email is Required*';
    }
    if (!validator.isEmail(loginData.email)) {
      loginFormIsValid = false;
      errors['email'] = 'Email is Required*';
    }
    if (!loginData.password) {
      loginFormIsValid = false;
      errors['password'] = 'Password is Required*';
    }

    setError(errors);
    return loginFormIsValid;
  };

  const login = () => {
    if (validateLoginForm()) {
      setisLoading(true);
      const body: any = {
        email: loginData?.email,
        password: loginData?.password
      };
      sendLoginData(body);
      setSaveLoginData((): any => {
        return [loginData];
      });
    }
  };

  const validateSignUpform = () => {
    const signUpErrors: any = {};
    let signUpFormIsValid = true;

    if (!signUpData.name) {
      signUpFormIsValid = false;
      signUpErrors['name'] = 'Name is Required*';
    }
    if (!signUpData.email) {
      signUpFormIsValid = false;
      signUpErrors['email'] = 'Email is required*';
    }
    if (!validator.isEmail(signUpData.email)) {
      signUpFormIsValid = false;
      signUpErrors['email'] = 'Email is Required*';
    }
    if (!signUpData.password) {
      signUpFormIsValid = false;
      signUpErrors['password'] = 'Password is Required*';
    }
    if (!signUpData.confirmPassword) {
      signUpFormIsValid = false;
      signUpErrors['confirmPassword'] = 'Confirm Password is Required*';
    }
    if (
      signUpData.password !== signUpData.confirmPassword &&
      signUpData.confirmPassword
    ) {
      signUpFormIsValid = false;
      signUpErrors['confirmPassword'] = 'Password did not match*';
    }

    setSignUpErrors(signUpErrors);
    return signUpFormIsValid;
  };

  const signUp = async () => {
    if (validateSignUpform()) {
      setisLoading(true);
      const body: any = {
        email: signUpData?.email,
        password: signUpData?.password,
        name: signUpData?.name,
        userType: 0
      };
      sendSignUpData(body);

      setSaveSignUpData((): any => {
        return [signUpData];
      });
    }
  };

  const registerPage = () => {
    dispatch(openModal('2'));
    dispatch(isOpenModal(true));
  };

  const validateOTP = () => {
    const otpError: any = {};
    let otpIsValid = true;

    if (!otp) {
      otpIsValid = false;
      otpError['otp'] = 'OTP is Required*';
    }

    setOtpError(otpError);
    return otpIsValid;
  };

  const submitOTP = async () => {
    if (validateOTP()) {
      const body: any = {
        otp: otp
      };
      submitOTPMutate(body);
      setOTP('');
    }
  };

  const resendOTP = async () => {
    const body: any = {
      email:
        saveSignUpData[0]?.email ||
        localStorage.getItem('dummyEmail') ||
        changePasswordEmail.email
    };
    resendOTPMutate(body);
  };

  const forgotPassword = () => {
    dispatch(openModal('4'));
    setSaveSignUpData([]);
  };

  const validateNewPassword = () => {
    const newPassWordError: any = {};
    let newPasswordIsvalid = true;

    if (!changePasswordEmail.email) {
      newPasswordIsvalid = false;
      newPassWordError['email'] = 'Email is Required*';
    }

    setNewPasswordError(newPassWordError);
    return newPasswordIsvalid;
  };

  const sendMail = async () => {
    if (validateNewPassword()) {
      setisLoading(true);
      localStorage.setItem('dummyEmail', changePasswordEmail.email);
      const body: any = {
        email: changePasswordEmail.email
      };
      sendMailMutate(body);
    }
  };
  const changePassword = async () => {
    if (validateNewPassword()) {
      setisLoading(true);
      const body: any = {
        old_password: newPassword.currentPassword,
        new_password: newPassword.password
      };
      passwordUpdateMutate(body);
      // sendMailMutate(body);
    }
  };

  const validateChangedPassword = () => {
    const passwordError: any = {};
    const isChangePassword =
      history.location.pathname === '/change-password' ? true : false;
    let newPasswordSetIsValid = true;

    if (!newPassword.currentPassword && isChangePassword) {
      newPasswordSetIsValid = false;
      passwordError['currentPassword'] = 'Current Password is Required*';
    }

    if (!newPassword.password) {
      newPasswordSetIsValid = false;
      passwordError['password'] = 'Password is Required*';
    }

    if (!newPassword.confirmPassword) {
      newPasswordSetIsValid = false;
      passwordError['confirmPassword'] = 'Confirm Password is Required*';
    }

    if (
      newPassword.password !== newPassword.confirmPassword &&
      newPassword.confirmPassword
    ) {
      newPasswordSetIsValid = false;
      passwordError['confirmPassword'] = 'Password did not match*';
    }

    setPasswordError(passwordError);
    return newPasswordSetIsValid;
  };

  const updatePassword = async () => {
    if (validateChangedPassword()) {
      setisLoading(true);
      const id = savePasswordId;
      const password = newPassword.password;
      const body: any = { password, id };

      updatePasswordMutate(body);
    }
  };

  const forgotValue = (e: any) => {
    const { name, value } = e.target;
    setChangePasswordEmail({
      ...changePasswordEmail,
      [name]: value
    });
  };

  const setOTPValue = (e: any) => {
    setOTP(e);
  };

  const changeProfilePassword = () => {
    if (validateChangedPassword()) {
      setChangePasswordEmail({
        ...changePasswordEmail,
        email: parsedLoginData?.email
      });
      // sendMail();
      changePassword();
    }
  };

  // const loginbyGoogle = async () => {
  //   const socialAccData: any = localStorage.getItem(STORAGEKEY.socialAccData);
  //   const parsedsocialAccData = JSON.parse(socialAccData);
  //   const body: any = {
  //     accessToken: parsedsocialAccData?._token?.accessToken,
  //     idToken: parsedsocialAccData?._token?.idToken
  //   };
  //   loginbyGoogleMutate(body);
  // };
  const loginWithGoogle = async () => {
    const socialAccData: any = localStorage.getItem(STORAGEKEY.socialAccData);
    const parsedsocialAccData = JSON.parse(socialAccData);
    const body: any = {
      accessToken: parsedsocialAccData?.accessToken,
      idToken: parsedsocialAccData?.tokenId
    };
    loginbyGoogleMutate(body);
  };

  const loginbyFB = async () => {
    const socialAccData: any = localStorage.getItem(STORAGEKEY.socialAccData);
    const parsedsocialAccData = JSON.parse(socialAccData);
    const body: any = {
      accessToken: parsedsocialAccData?._token?.accessToken
    };
    loginbyFBMutate(body);
  };

  const loginWithFB = async () => {
    const socialAccData: any = localStorage.getItem(STORAGEKEY.socialAccData);
    const parsedsocialAccData = JSON.parse(socialAccData);
    const body: any = {
      accessToken: parsedsocialAccData.accessToken
    };
    loginbyFBMutate(body);
  };

  return {
    navCategoryData,
    loginData,
    errors,
    saveLoginData,
    signUpData,
    saveSignUpData,
    signUpErrors,
    otpError,
    otp,
    changePasswordEmail,
    savePasswordId,
    newPassword,
    passwordError,
    saveNewUserData,
    newPassWordError,
    savedCount,
    updatePassword,
    validateChangedPassword,
    sendMail,
    validateNewPassword,
    forgotPassword,
    resendOTP,
    submitOTP,
    registerPage,
    handleClose,
    handleShow,
    stodedata,
    sinngupdata,
    newPasswordHandler,
    validateLoginForm,
    login,
    validateSignUpform,
    signUp,
    backtolog,
    forgotValue,
    setOTPValue,
    handleLogout,
    navbarlogin,
    parsedLoginData,
    getCount,
    changeProfilePassword,
    // loginbyGoogle,
    loginWithGoogle,
    loginbyFB,
    loginWithFB,
    isLoading
  };
};

export default UseNav;
