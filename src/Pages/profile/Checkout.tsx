import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DropDown from 'src/components/dropdown/DropDown';
import { ApiGet, Bucket } from 'src/helpers/API/ApiData';
import queryString from 'query-string';
import Payment from './Payment';

const Checkout = () => {
  const [postData, setpostData] = React.useState<any>({});
  const [dropdownOpen, setdropdownOpen] = React.useState<boolean>(false);
  const [payment, setpayment] = React.useState<boolean>(false);
  const [LicenceArray, setLicenceArray] = React.useState<any>([]);
  const [premiumPrice, setpremiumPrice] = useState<any>();

  const [categoryValue, setcategoryValue] =
    React.useState<any>('Select Category');

  const history = useHistory();

  window.console.log('==-=-sdf0-gkg', categoryValue);
  useEffect(() => {
    let postId = window.location.pathname.split('/')[2];
    ApiGet(`/post/get_by/${postId}`).then((res: any) => {
      window.console.log('res', res);
      setpostData(res?.data?.post_data[0]);
      setTimeout(() => {
        setpayment(true);
      }, 1000);
    });
    const idValue = queryString.parse(window.location.search);
    let value =
      idValue?.selected == '1'
        ? 'Free'
        : idValue?.selected == '2'
        ? 'Commercial'
        : idValue?.selected == '3'
        ? 'Extended'
        : idValue?.premium == 'true'
        ? 'Go Premium'
        : '';
    setcategoryValue(value);

    if (postData?.license?.isExtended === true) {
      setLicenceArray([
        {
          _id: window.location.search ? 'goPremium' : 'free',
          name: window.location.search ? 'Go Premium' : 'Free'
        },
        {
          _id: 'commercial',
          name: 'Commercial'
        },
        {
          _id: 'extended',
          name: 'Extended'
        }
      ]);
    } else {
      setLicenceArray([
        {
          _id: 'extended',
          name: 'Extended'
        },
        {
          _id: 'commercial',
          name: 'Commercial'
        }
      ]);
    }
    ApiGet('/plan').then((res: any) => {
      window.console.log('czxczczcczxc', res);
      setpremiumPrice(res?.data[1]?.price);
    });
  }, []);

  const toggle = () => {
    setdropdownOpen(!dropdownOpen);
  };

  const handleOpenCategry = (e: any) => {
    setcategoryValue(e.target.innerHTML);
  };

  window.console.log('postData', postData);

  return (
    <div className="primary-content-area container content-padding shopping-cart-page">
      <div className="page-title-section">
        <h2>
          Shopping <span className="gradient-text">Cart</span>
        </h2>
      </div>
      <div className="shopping-cart-area grid-right-sidebar">
        <div className="shopping-cart">
          <table className="content-table">
            <thead>
              <tr>
                <th scope="col" className="heading-label">
                  Item details
                </th>
                <th scope="col" className="heading-label text-center">
                  License
                </th>
                <th scope="col" className="heading-label text-center">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Item details w-40">
                  <div className="product-info">
                    <div className="product-thumb">
                      <a
                        onClick={() =>
                          history.push(`/productdetail/${postData?._id}`)
                        }
                      >
                        <img src={Bucket + postData?.thumbnail} alt="" />
                      </a>
                    </div>
                    <div className="product-details">
                      <div className="product-name">
                        <a
                          onClick={() =>
                            history.push(`/productdetail/${postData?._id}`)
                          }
                        >
                          {postData?.title}
                        </a>
                      </div>
                      <div className="product-meta">
                        <div className="item-category ui-templates">
                          {postData?.sub_category?.length
                            ? postData?.sub_category[0]?.name
                            : postData?.category?.name.length
                            ? postData?.category[0]?.name
                            : 'N/A'}
                        </div>
                        <div className="product-seller">
                          {postData?.createdBy?.length &&
                            postData?.createdBy[0]?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  data-label="License w-30 text-center pr-0"
                  style={{ paddingRight: '0px' }}
                >
                  {/* <form> */}
                  <DropDown
                    dropdownOpen={dropdownOpen}
                    toggle={toggle}
                    categoryValue={categoryValue}
                    array={LicenceArray}
                    onClick={handleOpenCategry}
                  />
                  {/* </form> */}
                </td>
                <td data-label="price" className="price w-30 text-center pr-0">
                  {categoryValue == 'Go Premium' &&
                    '$' + premiumPrice?.toFixed(2)}
                  {categoryValue == 'Free' && 'Free'}
                  {categoryValue == 'Commercial' &&
                    '$' + postData?.license?.commercialPrice?.toFixed(2)}
                  {categoryValue == 'Extended' &&
                    '$' + postData?.license?.extendedPrice?.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="discount-section">
            <form className="cryptoki-form" id="discount-form">
              <span className="label">Redeem Code</span>
              <input type="text" placeholder="CRYP1258OFF" />
              <button className="btn btn-normal btn-dark" type="button">
                Redeem!
              </button>
            </form>
          </div>
        </div>
        <aside>
          <div className="cart-total-box">
            <div className="cart-total-wrapper">
              <div className="small-title">Order Total</div>
              <div className="total-price">
                {' '}
                {categoryValue == 'Go Premium' &&
                  '$' + premiumPrice?.toFixed(2)}
                {categoryValue == 'Free' && 'Free'}
                {categoryValue == 'Commercial' &&
                  '$' + postData?.license?.commercialPrice?.toFixed(2)}
                {categoryValue == 'Extended' &&
                  '$' + postData?.license?.extendedPrice?.toFixed(2)}
              </div>
              <div className="total-price-details">
                <div className="field">
                  <div className="label">Cart</div>
                  <div className="value">
                    {' '}
                    {categoryValue == 'Go Premium' &&
                      '$' + premiumPrice?.toFixed(2)}
                    {categoryValue == 'Free' && 'Free'}
                    {categoryValue == 'Commercial' &&
                      '$' + postData?.license?.commercialPrice?.toFixed(2)}
                    {categoryValue == 'Extended' &&
                      '$' + postData?.license?.extendedPrice?.toFixed(2)}
                  </div>
                </div>
                <div className="field">
                  <div className="label">Code</div>
                  <div className="value">-$0.00</div>
                </div>
                <div className="field">
                  <div className="label">Total</div>
                  <div className="value">
                    {' '}
                    {categoryValue == 'Go Premium' &&
                      '$' + premiumPrice?.toFixed(2)}
                    {categoryValue == 'Free' && 'Free'}
                    {categoryValue == 'Commercial' &&
                      '$' + postData?.license?.commercialPrice?.toFixed(2)}
                    {categoryValue == 'Extended' &&
                      '$' + postData?.license?.extendedPrice?.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="to-checkout-button">
                <a
                  className="btn btn-fullwidth gradient-background"
                  // href="28-checkout.html"
                >
                  Proceed to Checkout
                </a>
                {window.console.log(
                  'categoryValue',
                  categoryValue,
                  postData?._id
                )}
                {payment && (
                  <Payment
                    type={
                      categoryValue == 'Commercial'
                        ? 1
                        : categoryValue == 'Extended'
                        ? 2
                        : 0
                    }
                    postid={postData && postData?._id && postData?._id}
                    total={
                      categoryValue == 'Commercial'
                        ? postData?.license?.commercialPrice?.toFixed(2)
                        : categoryValue == 'Extended'
                        ? postData?.license?.extendedPrice?.toFixed(2)
                        : 1
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
