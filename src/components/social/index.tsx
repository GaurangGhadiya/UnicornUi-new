import React from 'react';
import { AiFillFacebook } from 'react-icons/ai';
import { ImFacebook } from 'react-icons/im';
import { AiOutlineGoogle } from 'react-icons/ai';

import { STORAGEKEY } from 'src/config/APP/app.config';
import UseNav from 'src/Hooks/Header/UseNav';
import SocialButton from './SocialButton';
import { ErrorToast } from 'src/helpers/Toast';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const Social = () => {
  const navData: any = UseNav();
  const [getSocialLogin, setSocialLogin] = React.useState('');

  const handleGoogleLogin = (user: any) => {
    localStorage.setItem(STORAGEKEY.socialAccData, JSON.stringify(user));
    navData.loginWithGoogle(user);
  };
  const handleFBLogin = (user: any) => {
    if (user.status !== 'unknown') {
      localStorage.setItem(STORAGEKEY.socialAccData, JSON.stringify(user));
      navData.loginWithFB(user);
    }
  };

  const handleSocialLoginFailure = (err: any) => {
    // ErrorToast(err?.message);
    // ErrorToast(err?.details);
  };

  return (
    <>
      <div className="social-login">
        <div className="social-login-text">
          Or login with your social account!
        </div>
        <div className="social-login-buttons d-flex flex-column">
          {/* <div
            className="btn btn-normal2 facebook m-0 border30"
            onClick={() => setSocialLogin('faceBook')}
          >
            <SocialButton
              provider="facebook"
              appId={process.env.REACT_APP_FB_ID || ''}
              onLoginSuccess={handleFBLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              <AiFillFacebook />
            </SocialButton>
          </div> */}
          {/* <div
            className=""
            onClick={() => setSocialLogin('google')}
          > */}
          {/* <SocialButton
              provider="google"
              appId='1045891194371-ak7uqmuqeuah1mt1rnd36rvehc3l2dtl.apps.googleusercontent.com'
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              <AiOutlineGoogle />
            </SocialButton> */}
          <FacebookLogin
            appId={process.env.REACT_APP_FB_ID || ''}
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFBLogin}
            cssClass="btn btn-normal2 facebook m-0 border30 w-100 text-white d-flex align-items-center justify-content-center"
            icon={<ImFacebook className="mx-2" />}
            textButton={'Continue With Facebook'}

            // callback={responseFacebook}
          />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID || ''}
            render={(renderProps) => (
              <button
                className="btn btn-normal2 mt-4 google border30"
                onClick={renderProps.onClick}
              >
                <div className="d-flex justify-content-center text-white align-items-center ">
                  <div>
                    <AiOutlineGoogle className="mx-2" />
                  </div>
                  <div>Continue With Google</div>
                </div>
              </button>
            )}
            buttonText=""
            onSuccess={handleGoogleLogin}
            onFailure={handleSocialLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Social;
