import React, { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { ApiDelete, Bucket } from 'src/helpers/API/ApiData';
import { Link, NavLink, useHistory } from 'react-router-dom';
import SVG, { Props as SVGProps } from 'react-inlinesvg';

import { useDispatch, useSelector } from 'react-redux';
import { searching } from 'src/redux/reducer/searchFilterSlice';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Row } from 'reactstrap';
import { ImCross } from 'react-icons/im';
import { CgClose } from 'react-icons/cg';
import ProductDetailsModal from './ProductDetailsModal';
import { userProfile } from 'src/redux/reducer/profileUpdateSlice';
import { IoCloseOutline } from 'react-icons/io5';
// import deleteImg from '../../../public/Image/Icons/deleteModal.png';

const ItemCard = (props: any) => {
  const {
    isRelated,
    productId,
    totalLikes,
    thumbnail,
    subcategory,
    category,
    subCategoryId,
    title,
    software,
    image,
    username,
    price,
    like,
    postLike,
    userId,
    postDetete,
    postEdit,
    isCreator,
    fetchUserPostLike,
    search,
    likeChange
  } = props;
  console.log('subcategoryyy', subcategory);
  const dispatch = useDispatch();
  const history = useHistory();
  const profileData = useSelector(userProfile);
  const [show, setShow] = useState(false);

  const [modal, setModal] = useState(false);
  let title2 = title?.replace('–', '');

  let title3 = title2?.replace('  ', ' ')?.replace(' ', '–');

  let title4 = title3?.split(' ').join('-');

  const renderSoftwareImage = (data: any) => {
    return data?.map((item: any, index: number) => {
      // window.console.log(" item", item)
      return (
        <a
          key={index}
          onClick={() =>
            history.push({
              state: item._id ? item?._id : productId,
              pathname: '/explore-items'
            })
          }
        >
          <img
            src={item.image ? Bucket + item.image : '/Image/avatar.png'}
            className="me-2 software"
            style={{ cursor: 'pointer' }}
          />
        </a>
      );
    });
  };
  const urlTitle = title
    .replaceAll('-', '')
    ?.replaceAll('  ', '-')
    ?.replaceAll(' ', '-');
  const b = urlTitle.replace('---', '-');
  console.log('urlTitle', urlTitle);
  // React.useEffect(() => {
  //   if (show) {
  //     document.body.style.overflow = 'hidden';
  //     document.body.style.height = '100vh';
  //   }
  //   return () => {
  //     document.body.style.overflow = 'unset';
  //     document.body.style.height = 'auto';
  //     document.body.style.paddingRight = '0px';
  //   };
  // }, [show]);

  return (
    <>
      <div
        className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
        data-swiper-slide-index="0"
        role="group"
        aria-label="1/4"
        style={{ width: '100%', marginRight: '20px' }}
      >
        <div className="featured-item v5">
          <div className="featured-item-wrapper">
            <div className="featured-item-content">
              {window.location.pathname == '/my-posts' && (
                <>
                  <div
                    className="fav-counter edit"
                    onClick={() => postEdit(productId)}
                  >
                    <SVG
                      src="Image/Icons/EditPost.svg"

                      // className="iconsSize"
                    />
                  </div>{' '}
                  <div
                    className="fav-counter delete"
                    onClick={() => setModal(true)}
                  >
                    <SVG
                      src="Image/Icons/DeletePost.svg"

                      // className="iconsSize"
                    />
                  </div>
                </>
              )}
              <div className="fav-counter" onClick={() => postLike(productId)}>
                {like ? <AiFillHeart color="#c23fff" /> : <AiOutlineHeart />}
                <span className="count">{totalLikes}</span>
              </div>
              <div
                className="featured-item-image"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  isRelated
                    ? window.open(`/productdetail/${productId}`)
                    : setShow(true)
                }
              >
                <img
                  src={Bucket + thumbnail}
                  alt="featured-image"
                  height={202}
                  style={{ width: '100%' }}
                />
              </div>
              {/*==================================== Category Title Software section ==================================== */}
              <div className="featured-item-info">
                <Link
                  to={subcategory && `/explore-items/${subCategoryId}`}
                  className="item-category ui-templates"
                  target="_blank"
                >
                  {subcategory ? subcategory : category ? category : 'N/A'}
                </Link>
                <div className="title">
                  <Link
                    to={`/productdetail/${title4}/${productId}`}
                    target="_blank"
                    onClick={() => {
                      dispatch(searching(''));
                    }}
                  >
                    {title}
                  </Link>
                </div>
                <div className="item-rating">
                  {renderSoftwareImage(software)}
                </div>
              </div>
            </div>

            {/*==================================== User and Pricing Section==================================== */}
            <div className="featured-item-post-content">
              <div className="item-meta">
                <span className="avatar box-26">
                  <Link
                    to={`/public/${userId}/profile`}
                    target="_blank"
                    onClick={() => {
                      dispatch(searching(''));
                    }}
                  >
                    <img
                      src={
                        image
                          ? image?.includes('googleusercontent')
                            ? image
                            : Bucket + image
                          : '/Image/avatar.png'
                      }
                      alt="user-avatar"
                    />
                  </Link>
                  {isCreator && (
                    <span className="verified">
                      <BsCheck className="svg" />
                    </span>
                  )}
                </span>
                <NavLink
                  className="bold-user-name cursor-pointer"
                  to={`/public/${userId}/profile`}
                  target="_blank"
                >
                  {' '}
                  @{username}
                </NavLink>
              </div>
              <div className="item-price">
                {price == 0 ? 'FREE' : `$${price}`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={show}
        onClose={() => setShow(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="curveImage" id="style-1">
          <Row style={{ direction: 'rtl' }} className="position-relative">
            <div className="cursor-pointer crossImage">
              <IoCloseOutline
                size={24}
                onClick={() => {
                  setShow(false);
                  likeChange(true);
                }}
              />
            </div>
          </Row>
          <ProductDetailsModal
            productId={productId}
            fetchUserPostLike={fetchUserPostLike}
            search={search}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth="sm"
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="curveImage" id="style-1">
          <Row style={{ direction: 'rtl' }}>
            <div className="cursor-pointer">
              <CgClose onClick={() => setModal(false)} />
            </div>
          </Row>
          <div className="text-center">
            <img src="Image/Icons/deleteModal.png" width={200} />

            <h5 style={{ marginTop: '-20px' }}>
              Hey {profileData?.name?.split(' ')[0]},
            </h5>

            <p className="mb-4" style={{ fontSize: '17px' }}>
              Are you sure you want to remove this post.
            </p>

            <div className="d-flex">
              <button
                className="btn btn-fullwidth btn-dark mb-3 saved  "
                type="button"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-fullwidth gradient-background mb-3 ms-3 d-flex justify-content-center "
                type="button"
                onClick={() => postDetete(productId)}
              >
                Yes, Remove it!
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ItemCard;
