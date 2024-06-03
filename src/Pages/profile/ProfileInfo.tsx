import React from 'react';
import { FaBehance } from 'react-icons/fa';
import { AiOutlineGlobal, AiOutlineInstagram } from 'react-icons/ai';
import { FiTwitter, FiDribbble, FiGithub } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { FiCamera } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import Aside from '../../components/aside';
import { ApiGet, ApiPut, ApiUpload, Bucket } from '../../services/http-service';
import UseNav from 'src/Hooks/Header/UseNav';
import { ErrorToast, SuccessToast } from 'src/helpers/Toast';
import { profileUpdate } from 'src/redux/reducer/profileUpdateSlice';
import Loader from 'src/components/loader';

type FormData = {
  username: string;
  name: string;
  bio: string;
  websiteURL: string;
  twitterURL: string;
  instagramURL: string;
  dribbbleURL: string;
  behanceURL: string;
  githubURL: string;
};

const ProfileInfo = () => {
  const navData = UseNav();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [profileData, setProfileData] = React.useState<any>([]);
  const [profileImage, setprofileImage] = React.useState<any>([]);
  const [bannerImage, setbannerImage] = React.useState<any>([]);
  const [isLoding, setisLoding] = React.useState<any>(false);
  const [Loding, setLoding] = React.useState<any>(true);
  window.console.log(
    '🚀 ~ file: ProfileInfo.tsx ~ line 36 ~ ProfileInfo ~ Loding',
    Loding
  );
  const [compressedProfileImage, saveCompressedProfileImage] =
    React.useState<any>('');
  const [compressedBannerImage, saveCompressedBannerImage] =
    React.useState<any>('');

  useQuery('fetchProfileData', () => ApiGet('/profile'), {
    onSuccess: (response: any) => {
      setLoding(false);
      setProfileData(response?.data);
      reset(response?.data);
      window.scrollTo(0, 0);
    }
  });

  const { mutateAsync: profileDataMutate } = useMutation(
    () => ApiGet('/profile'),
    {
      onSuccess: (response: any) => {
        setProfileData(response?.data);
        let obj = {
          ...response?.data,
          userType: navData?.parsedLoginData?.userType,
          token: navData?.parsedLoginData?.token
        };
        localStorage.setItem('logindata', JSON.stringify(obj));
        dispatch(profileUpdate(obj));
      }
    }
  );

  const { mutateAsync: profileInfoData } = useMutation(
    (data) => ApiPut('/', data),
    {
      onSuccess: (response: any) => {
        profileDataMutate();
        SuccessToast(response?.message);
        setisLoding(false);
      },
      onError: (error: any) => {
        setisLoding(false);
        ErrorToast(error?.message);
      }
    }
  );

  const { mutateAsync: uploadProfilePhoto } = useMutation(
    (data) => ApiUpload('upload/compress_image/profile_image', data, {}),
    {
      onSuccess: (response: any) => {
        saveCompressedProfileImage(response?.data?.image);
      },
      onError: (error: any) => {
        setisLoding(false);
        ErrorToast(error?.message);
      }
    }
  );

  const { mutateAsync: uploadBanner } = useMutation(
    (data) => ApiUpload('upload/compress_image/profile_image', data, {}),
    {
      onSuccess: (response: any) => {
        saveCompressedBannerImage(response?.data?.image);
      },
      onError: (error: any) => {
        setisLoding(false);
        ErrorToast(error?.message);
      }
    }
  );

  const uploadProfileImage = async () => {
    const formData: any = new FormData();
    if (profileImage[0]?.fileURL) {
      formData.append('image', profileImage[0]);
      uploadProfilePhoto(formData);
    }
  };
  const uploadBannerImage = async () => {
    const formData: any = new FormData();
    if (bannerImage[0]?.fileURL) {
      formData.append('image', bannerImage[0]);
      uploadBanner(formData);
    }
  };

  const handleimage = (e: any) => {
    let file = e.target.files[0];
    let fileURL = URL.createObjectURL(file);
    file.fileURL = fileURL;
    setprofileImage([file]);
  };

  const handleimage2 = (e: any) => {
    let file = e.target.files[0];
    let fileURL = URL.createObjectURL(file);
    file.fileURL = fileURL;
    setbannerImage([file]);
  };

  const onSubmit = async (data: any) => {
    setisLoding(true);
    // eslint-disable-next-line
    let { email, ...rest } = data;

    if (compressedProfileImage) {
      rest.image = compressedProfileImage || '';
    }
    if (compressedBannerImage) {
      rest.coverImage = compressedBannerImage || '';
    }
    window.scrollTo(0, 0);
    profileInfoData(rest);
  };

  React.useEffect(() => {
    profileImage?.length !== 0 && uploadProfileImage();
    bannerImage?.length !== 0 && uploadBannerImage();
  }, [profileImage, bannerImage]);

  return (
    <div className="primary-content-area container content-padding grid-left-sidebar">
      <Aside />
      <div className="main-content-area">
        <div className="page-title">
          <h2>
            <span className="gradient-text">Profile</span> Info
          </h2>
        </div>
        {!Loding ? (
          <div className="user-db-content-area">
            <div className="upload-photo-box">
              <div className="user-db-title">Avatar and Cover</div>
              <div className="user-avatar position-relative">
                <img
                  src={
                    profileImage[0]?.fileURL
                      ? profileImage[0]?.fileURL
                      : profileData?.image?.includes('googleusercontent') ||
                        profileData?.image?.includes('fbsbx') ||
                        profileData?.image?.includes('https://')
                      ? profileData?.image
                      : profileData?.image
                      ? Bucket + profileData?.image
                      : '/Image/avatar.png'
                  }
                  alt="image"
                />
                <div className="position-absolute labelFile">
                  <label htmlFor="images" className="">
                    <FiCamera size={15} />
                    <input
                      type="file"
                      id="images"
                      name="profile_avatar"
                      accept=".png, .jpg, .jpeg"
                      hidden
                      onChange={(e) => handleimage(e)}
                    />
                  </label>
                </div>
              </div>
              <div className="user-cover-image position-relative">
                <img
                  src={
                    bannerImage[0]?.fileURL
                      ? bannerImage[0]?.fileURL
                      : profileData?.coverImage
                      ? Bucket + profileData?.coverImage
                      : '/Image/profile-cover-1.jpg'
                  }
                  alt="bg"
                />
                <div className="position-absolute labelFile">
                  <label htmlFor="images1" className="">
                    <FiCamera size={15} />
                    <input
                      type="file"
                      id="images1"
                      name="profile_avatar"
                      accept=".png, .jpg, .jpeg"
                      hidden
                      onChange={(e) => handleimage2(e)}
                    />
                  </label>
                </div>
              </div>
              <div className="upload-notice">
                Images must be .png or .jpg format. Min size 100x100px (avatar)
                and 1920x320px (cover){' '}
              </div>
            </div>
            <form
              className="cryptoki-form"
              id="personal-info-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-group row">
                <div className="form-field col-md-6">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" {...register('username')} />
                </div>
                <div className="form-field col-md-6">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" {...register('name')} />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="item-description">Bio</label>
                <textarea
                  id="item-description"
                  cols={30}
                  rows={5}
                  {...register('bio')}
                />
              </div>
              <div className="my-5">
                <h6>Social Accounts</h6>
              </div>

              <div className="form-group row">
                <div className="form-field col-md-6">
                  <label htmlFor="Website">Website URL</label>
                  <div className="row URl">
                    <AiOutlineGlobal className="col-1 ms-md-2" />
                    <input
                      type="text"
                      id="Website"
                      className="col-10 ms-1"
                      {...register('websiteURL')}
                    />
                  </div>
                </div>

                <div className="form-field col-md-6">
                  <label htmlFor="Twitter">Twitter URL</label>
                  <div className="row URl">
                    <FiTwitter className="col-1 ms-md-2" />
                    <input
                      type="text"
                      id="Twitter"
                      className="col-10 ms-1"
                      {...register('twitterURL')}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="form-field col-md-6">
                  <label htmlFor="Instagram">Instagram URL</label>
                  <div className="row URl">
                    <AiOutlineInstagram className="col-1 ms-md-2" />
                    <input
                      type="text"
                      id="Instagram"
                      className="col-10 ms-1"
                      {...register('instagramURL')}
                    />
                  </div>
                </div>
                <div className="form-field col-md-6">
                  <label htmlFor="Dribbble">Dribbble URL</label>
                  <div className="row URl">
                    <FiDribbble className="col-1 ms-md-2" />
                    <input
                      type="text"
                      id="Dribbble"
                      className="col-10 ms-1"
                      {...register('dribbbleURL')}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="form-field col-md-6">
                  <label htmlFor="Behance">Behance URL</label>
                  <div className="row URl">
                    <FaBehance
                      className="col-1 ms-md-2"
                      style={{ height: '100%' }}
                    />
                    <input
                      type="text"
                      id="Behance"
                      className="col-10 ms-1"
                      {...register('behanceURL')}
                    />
                  </div>
                </div>
                <div className="form-field col-md-6">
                  <label htmlFor="Github">Github URL</label>
                  <div className="row URl">
                    <FiGithub
                      className="col-1 ms-md-2"
                      style={{ height: '100%' }}
                    />
                    <input
                      type="text"
                      id="Github"
                      className="col-10 ms-1"
                      {...register('githubURL')}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="my-4">
              <h6>Email Setting</h6>
            </div>
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
                <button type='button' className="btn btn-wide btn-dark waves-effect waves-button waves-float waves-light col-12">
                  Manage Notification
                </button>
              </div>
            </div> */}
              <button
                className="btn btn-wide btn-dark waves-effect waves-button waves-float waves-light col-12"
                type="submit"
                disabled={isLoding ? true : false}
              >
                {isLoding ? 'Loading...' : 'Save Changes'}
              </button>
            </form>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
