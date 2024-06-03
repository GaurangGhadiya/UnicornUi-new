import React from 'react';
import {
  BsCheck,
  BsFillFileEarmarkPostFill,
  BsFillCloudArrowDownFill
} from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';
import { MdSettings } from 'react-icons/md';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import {
  AiOutlineFileText,
  AiOutlineCheckCircle,
  AiFillLike
} from 'react-icons/ai';
import { BiDollarCircle } from 'react-icons/bi';
import { BsWallet } from 'react-icons/bs';
import { MdOutlineLogout } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import UseNav from 'src/Hooks/Header/UseNav';
import { Bucket } from 'src/helpers/API/ApiData';
import { useDispatch, useSelector } from 'react-redux';
import { searching } from 'src/redux/reducer/searchFilterSlice';
import {
  userProfile,
  logOutProfile
} from 'src/redux/reducer/profileUpdateSlice';

const Aside = () => {
  const navigate = useHistory();
  const dispatch = useDispatch();
  const navData = UseNav();

  const userProfileData = useSelector(userProfile);
  const logOut = () => {
    navData?.handleLogout();
    dispatch(logOutProfile());
  };

  const Myprofile = (e: any) => {
    if (e.ctrlKey) {
      window.open('/profileinfo', '_blank');
    } else {
      navigate.push('/profileinfo');
    }
  };

  const MyDownload = (e: any) => {
    if (e.ctrlKey) {
      window.open('/my-downloads', '_blank');
    } else {
      navigate.push('/my-downloads');
    }
  };

  const LikedPosts = (e: any) => {
    if (e.ctrlKey) {
      window.open('/liked-posts', '_blank');
    } else {
      navigate.push('/liked-posts');
    }
  };
  const SavedPosts = (e: any) => {
    if (e.ctrlKey) {
      window.open('/saved-posts', '_blank');
    } else {
      navigate.push('/saved-posts');
    }
  };

  const MyPosts = (e: any) => {
    if (e.ctrlKey) {
      window.open('/my-posts', '_blank');
    } else {
      navigate.push('/my-posts');
    }
  };

  const Payouts = (e: any) => {
    if (e.ctrlKey) {
      window.open('/payouts', '_blank');
    } else {
      navigate.push('/payouts');
    }
  };
  const YourPurchases = (e: any) => {
    if (e.ctrlKey) {
      window.open('/YourPurchases', '_blank');
    } else {
      navigate.push('/YourPurchases');
    }
  };

  const salesStatement = (e: any) => {
    if (e.ctrlKey) {
      window.open('/sales-statement', '_blank');
    } else {
      navigate.push('/sales-statement');
    }
  };

  const accountSetting = (e: any) => {
    if (e.ctrlKey) {
      window.open('/account-setting', '_blank');
    } else {
      navigate.push('/account-setting');
    }
  };

  return (
    <aside>
      <div className="user-db-menu">
        <div className="user-db-header">
          <div
            className="user-db-cover-image profile-cover-image"
            style={{
              backgroundImage: !userProfileData?.coverImage
                ? `url('/Image/profile-cover-1.jpg')`
                : `url(${Bucket + userProfileData?.coverImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          ></div>
          <div className="user-header-user-profile">
            <div className="avatar box-64">
              <a>
                <img
                  src={
                    userProfileData?.image === null
                      ? '/Image/avatar.png'
                      : userProfileData?.image.includes('googleusercontent') ||
                        userProfileData?.image.includes('fbsbx')
                      ? userProfileData?.image
                      : Bucket + userProfileData?.image
                  }
                  alt="avatar"
                  style={{ objectFit: 'cover' }}
                />
                {userProfileData?.isCreator && (
                  <span className="verified">
                    <BsCheck />
                  </span>
                )}
              </a>
            </div>
            <div className="title">
              <a>{userProfileData?.name}</a>
            </div>
            <div className="item-meta">
              <span className="gradient-text" style={{ lineHeight: '1.7' }}>
                @{userProfileData?.username}
              </span>
            </div>
          </div>
        </div>
        <div className="user-db-body">
          <ul className="profile-menu">
            <li className="menu-list">
              <a
                onClick={Myprofile}
                className={`${
                  navigate.location.pathname === '/profileinfo' && 'activeTab'
                }`}
              >
                <SVG
                  src="Image/Icons/profile.svg"
                  title="Menu"
                  className="iconsSize"
                />
                Profile Info
              </a>
            </li>
            {/* <li>
              <a onClick={ForgotPassword}>
                <RiLockPasswordLine />
                Forgot Password
              </a>
            </li> */}
            <li className="menu-list">
              <a
                onClick={MyPosts}
                className={`${
                  navigate.location.pathname === '/my-posts' && 'activeTab'
                }`}
              >
                <SVG
                  src="Image/Icons/mypost.svg"
                  title="Menu"
                  className="iconsSize"
                />
                My Posts
              </a>
            </li>
            <li className="menu-list">
              <a
                onClick={MyDownload}
                className={`${
                  navigate.location.pathname === '/my-downloads' && 'activeTab'
                }`}
              >
                <SVG
                  src="Image/Icons/mydownloads.svg"
                  title="Menu"
                  className="iconsSize"
                />
                My downloads
              </a>
            </li>
            <li className="menu-list">
              <a
                onClick={LikedPosts}
                className={`${
                  navigate.location.pathname === '/liked-posts' && 'activeTab'
                }`}
              >
                <SVG
                  src="Image/Icons/like.svg"
                  title="Menu"
                  className="iconsSize"
                />
                Liked Posts
              </a>
            </li>
            <li className="menu-list">
              <a
                onClick={SavedPosts}
                className={`${
                  navigate.location.pathname === '/saved-posts' && 'activeTab'
                }`}
              >
                <SVG
                  src="Image/Icons/saved.svg"
                  title="Menu"
                  className="iconsSize"
                />
                Saved Posts
              </a>
            </li>
            <li className="menu-list">
              <a
                onClick={accountSetting}
                className={`${
                  navigate.location.pathname === '/account-setting' &&
                  'activeTab'
                }`}
              >
                {/* <MdSettings /> */}
                <SVG
                  src="Image/Icons/account-setting.svg"
                  title="Menu"
                  className="iconsSize"
                />
                Account Settings
              </a>
            </li>
            {/* <li>
              <a>
                <BsSliders />
                Notification Settings
              </a>
            </li> */}
            {/* <li>
              <a>
                <RiDashboardFill />
                Dashboard
              </a>
            </li> */}
            <li className="menu-list">
              <a
                onClick={salesStatement}
                className={`${
                  navigate.location.pathname === '/sales-statement' &&
                  'activeTab'
                }`}
              >
                <SVG
                  src="Image/Icons/sales-statement.svg"
                  title="Menu"
                  className="iconsSize"
                />
                Sales Statement
              </a>
            </li>
            {/* <li>
              <a>
                <IoMdImage />
                Upload Item
              </a>
            </li>
            <li>
              <a>
                <IoMdImage />
                Manage Items
              </a>
            </li> */}
            <li className="menu-list">
              <a
                onClick={Payouts}
                className={`${
                  navigate.location.pathname === '/payouts' && 'activeTab'
                }`}
              >
                {/* <BiDollarCircle /> */}
                <SVG
                  src="Image/Icons/payout.svg"
                  title="Menu"
                  className="iconsSize"
                />
                Payouts
              </a>
            </li>
            <li className="menu-list">
              <a
                onClick={YourPurchases}
                className={`${
                  navigate.location.pathname === '/YourPurchases' && 'activeTab'
                }`}
              >
                {/* <BsWallet /> */}
                <SVG
                  src="Image/Icons/purchase.svg"
                  title="Menu"
                  className="iconsSize"
                />
                Purchases
              </a>
            </li>

            {!userProfileData?.isCreator&&<li className="menu-list">
              <Link
                to="/getVerified"
                className={`${
                  navigate.location.pathname === '/getVerified' && 'activeTab'
                }`}
              >
                {/* <AiOutlineCheckCircle /> */}
                <SVG
                  src="Image/Icons/get-verified.svg"
                  title="Menu"
                  className="iconsSize"
                />
                Get Verified
              </Link>
            </li>}

            <li className="menu-list logout">
              <a
                onClick={() => {
                  dispatch(searching('')), logOut();
                }}
              >
                {/* <MdOutlineLogout /> */}
                <SVG
                  src="Image/Icons/logout.svg"
                  title="Menu"
                  className="iconsSize"
                />
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
