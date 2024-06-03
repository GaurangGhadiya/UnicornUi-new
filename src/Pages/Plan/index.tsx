import React, { useEffect, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { ApiGet, ApiPost } from 'src/helpers/API/ApiData';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuth,
  isOpenModal,
  profileUpdate,
  userLogin,
  userProfile
} from 'src/redux/reducer/profileUpdateSlice';
import { ErrorToast, SuccessToast } from 'src/helpers/Toast';
import Model from 'src/components/model';
// ********************************************
import { GrDiamond } from 'react-icons/gr';
import { FaPlaneSlash } from 'react-icons/fa';
const Plan = () => {
  const dispatch = useDispatch();
  const profileData = useSelector(userProfile);
  const isAuth = useSelector(getAuth);
  const [modal, setModal] = React.useState<boolean>(false);
  const [flag, setFlag] = React.useState<any>('');

  function loadAsync(url: any, callback: any) {
    let s = document.createElement('script');
    s.setAttribute('src', url);
    s.onload = callback;
    document.head.insertBefore(s, document.head.firstElementChild);
  }
  const [plans, setPlan] = useState<any>([]);
  React.useEffect(() => {
    ApiGet('/plan').then((res: any) => {
      setPlan(res?.data);
      // dispatch(notificationCount(res?.data?.notificationCount));
    });
  }, []);

  useEffect(() => {
    loadAsync(
      'https://www.paypal.com/sdk/js?client-id=ASoz1twMSa7OKJGxHTdM4ukuxbUw2NWqQMM2ecZByYEypgbKVgL93dNZ8-XCkMQBiZWQe2VkVh7FlA5y&vault=true&intent=subscription',
      function async() {
        (window as any).paypal
          .Buttons({
            style: {
              shape: 'rect',
              color: 'gold',
              layout: 'horizontal',
              label: '',
              tagline: 'false'
            },
            createSubscription: function (data: any, actions: any) {
              if (isAuth) {
                return actions.subscription.create({
                  /* Creates the subscription */
                  plan_id: 'P-3PC601995N9785450MJH3WTQ'
                });
              } else {
                dispatch(isOpenModal(true));
              }
            },
            onApprove: async (data: any, actions: any) => {
              window.console.log('data1', data);
              let body = {
                subscriptionId: data?.subscriptionID,
                subscriptionType: 'Yearly',
                price: '99.99'
              };

              window.console.log('body', body);

              await ApiPost('/paypal/purchase_subscription', body)
                .then((res: any) => {
                  window.console.log('res', res);
                  // SuccessToast(res?.message);
                  let local = JSON.parse(
                    localStorage.getItem('logindata') || ''
                  );
                  let data = {
                    ...local,
                    isPlanPurchase: true,
                    subscriptionType: 'Yearly'
                  };
                  localStorage.setItem('logindata', JSON.stringify(data));
                  dispatch(profileUpdate(data));
                })
                .catch((e: any) => {
                  ErrorToast(e?.message);
                });
              // You can add optional success message for the subscriber here
            }
          })
          .render('#paypal-button-container-P-3PC601995N9785450MJH3WTQ');
        //   }
        // );
        // loadAsync(
        //   'https://www.paypal.com/sdk/js?client-id=ASoz1twMSa7OKJGxHTdM4ukuxbUw2NWqQMM2ecZByYEypgbKVgL93dNZ8-XCkMQBiZWQe2VkVh7FlA5y&vault=true&intent=subscription',
        //   function () {
        (window as any).paypal
          .Buttons({
            style: {
              shape: 'rect',
              color: 'gold',
              layout: 'horizontal',
              tagline: 'false'
              // label: 'subscribe'
            },
            createSubscription: function (data: any, actions: any) {
              if (isAuth) {
                return actions.subscription.create({
                  /* Creates the subscription */
                  plan_id: 'P-84423817XT9589744MJH3KJA'
                });
              } else {
                dispatch(isOpenModal(true));
              }
            },
            onApprove: async (data: any, actions: any) => {
              // const order = await actions.subscription.capture();
              // window.console.log('total order', order);
              window.console.log('data2');
              let body = {
                subscriptionId: data?.subscriptionID,
                subscriptionType: 'Monthly',
                price: '9.99'
              };

              window.console.log('body', body);

              await ApiPost('/paypal/purchase_subscription', body)
                .then((res: any) => {
                  window.console.log('res', res);
                  // SuccessToast(res?.message);
                  let local = JSON.parse(
                    localStorage.getItem('logindata') || ''
                  );
                  let data = {
                    ...local,
                    isPlanPurchase: true,
                    subscriptionType: 'Monthly'
                  };
                  localStorage.setItem('logindata', JSON.stringify(data));
                  dispatch(profileUpdate(data));
                  setModal(true);
                  setFlag('success');
                })
                .catch((e: any) => {
                  setModal(true);
                  setFlag('error');
                  ErrorToast(e?.message);
                });
            }
          })
          .render('#paypal-button-container-P-84423817XT9589744MJH3KJA');
      }
    ); // Renders the PayPal button
  }, [isAuth]);

  const goPrimium = (v: any) => {
    if (
      v === 0 &&
      (profileData?.subscriptionType === 'Monthly' ||
        profileData?.isPlanPurchase)
    ) {
      SuccessToast('Your monthlly plan is already activated');
    }
    if (v === 1 && profileData?.subscriptionType === 'Yearly') {
      SuccessToast('Your yearly plan is already activated');
    }
  };

  return (
    <div>
      <div className="primary-content-area container content-padding">
        <div
          className={`wallet-wrapper ${
            plans.length > 2 ? 'section-large' : 'section-small'
          }`}
        >
          <div className="section-title  text-center">
            <span className="gradient-text">Connect</span> your Wallet
          </div>
          <div
            className={`${
              plans.length >= 2 ? 'wallet-grid-31' : 'wallet-grid'
            }`}
          >
            {/* {plans?.map((item: any) => (
              <div
                className={`wallet-item ${
                  item.validity === 0
                    ? 'orange-gradient'
                    : item.validity === 1
                    ? 'purple-gradient'
                    : 'turquoise-gradient'
                }`}
              >
                <div className="wallet-icon">
                  <div className="title h6 m-0">
                    {item.validity === 0
                      ? 'Monthly'
                      : item.validity === 1
                      ? 'Yearly'
                      : ''}{' '}
                  </div>
                </div>
                <div className="wallet-text text-center py-3">
                  <div className="total-price text-white h4 m-0">
                    $ {item.price}
                    <span className="notification-text">
                      /{' '}
                      {item.validity === 0
                        ? 'Monthly'
                        : item.validity === 1
                        ? 'Yearly'
                        : ''}
                    </span>
                  </div>
                </div>
                <div className="wallet-info">
                  <div className="scrollble fixheight">
                    {item?.benefits?.map((point: any) => (
                      <div className="description text-start">
                        <BiCheck />
                        {point.point}{' '}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3">
                    <button
                      className={`py-3 rounded-1 text-white w-100 ${
                        item.validity === 0
                          ? 'orange-gradient'
                          : item.validity === 1
                          ? 'purple-gradient'
                          : 'turquoise-gradient'
                      }`}
                      onClick={() => goPrimium(item.validity)}
                    >
                      Go Premium
                    </button>

                    {item.validity === 0 && !profileData?.isPlanPurchase ? (
                      <div
                        id="paypal-button-container-P-84423817XT9589744MJH3KJA"
                        style={{ marginTop: '-44px' }}
                      ></div>
                    ) : item.validity === 1 &&
                      (profileData?.subscriptionType === 'Monthly' ||
                        !profileData?.isPlanPurchase) ? (
                      <div
                        id="paypal-button-container-P-3PC601995N9785450MJH3WTQ"
                        style={{ marginTop: '-44px' }}
                      ></div>
                    ) : (
                      <></>
                    )}

                    {item.validity === 0 ? (
                      <div id="paypal-button-container-P-84423817XT9589744MJH3KJA"></div>
                    ) : item.validity === 1 ? (
                      <div id="paypal-button-container-P-3PC601995N9785450MJH3WTQ"></div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            ))} */}
            {plans?.map((item: any, i: any) => (
              <div
                className={`wallet-item1  
                ${
                  item.validity === 0
                    ? 'blackCard'
                    : item.validity === 1
                    ? 'purple-gradient'
                    : 'turquoise-gradient'
                }
                ${i === plans.length - 1 && 'pb-50'}
                ${i === plans.length - 2 && 'pb2-50'}
                `}
              >
                <div className="wallet-icon1">
                  <div className="title m-0">
                    {item.validity === 0
                      ? 'Monthly'
                      : item.validity === 1
                      ? 'Yearly'
                      : ''}{' '}
                  </div>
                </div>
                <div className="wallet-text px-3 py-3">
                  <div className="total-price text-white d-flex mx-3 ">
                    <GrDiamond className="grDiamond" size={70} />
                    <div className="me-auto ms-3">
                      <span className="h5">Standard</span> <br />
                      {item?.benefits?.length}
                      <span className="fw-lighter ms-1">Service</span>
                    </div>
                    <span className="h5">$ {item.price}</span>
                  </div>
                </div>
                <div className="scrollble fixheight1">
                  {item?.benefits?.map((point: any) => (
                    <div className="description text-start">
                      <RiCheckboxCircleFill className="RiCheckboxCircleFill me-3" />
                      {point.point}{' '}
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-center">
                  <button
                    className={`btn btn-primary w-75 py-3 mb-3 rounded-pill`}
                    onClick={() => goPrimium(item.validity)}
                  >
                    Go Premium
                  </button>

                  {item.validity === 0 && !profileData?.isPlanPurchase ? (
                    <div
                      id="paypal-button-container-P-84423817XT9589744MJH3KJA"
                      style={{ marginTop: '-44px' }}
                    ></div>
                  ) : item.validity === 1 &&
                    (profileData?.subscriptionType === 'Monthly' ||
                      !profileData?.isPlanPurchase) ? (
                    <div
                      id="paypal-button-container-P-3PC601995N9785450MJH3WTQ"
                      style={{ marginTop: '-44px' }}
                    ></div>
                  ) : (
                    <></>
                  )}

                  {/* {item.validity === 0 ? (
                      <div id="paypal-button-container-P-84423817XT9589744MJH3KJA"></div>
                    ) : item.validity === 1 ? (
                      <div id="paypal-button-container-P-3PC601995N9785450MJH3WTQ"></div>
                    ) : (
                      ''
                    )} */}
                </div>
              </div>
            ))}
          </div>
          {/* <div className="notification-text text-center">
                    New to wallets? <a href="https://html.crumina.net/cryptoki/nft/19-faq.html">Learn how to make a wallet</a> in our FAQs page and check
                    other helpful guides to get started!
                </div> */}
        </div>
        {modal && (
          <Model
            modal={modal}
            setModal={setModal}
            text={profileData}
            flag={flag}
            setFlag={setFlag}
          />
        )}
      </div>
    </div>
  );
};

export default Plan;
