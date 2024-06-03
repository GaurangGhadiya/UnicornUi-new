import React from 'react';
import DropDown from 'src/components/dropdown/DropDown';
import Aside from '../../components/aside';
import moment from 'moment';
import { ApiPost, Bucket } from 'src/services/http-service';
import Loader from 'src/components/loader';

const Payouts = () => {
  const [data, setdata] = React.useState([]);
  window.console.log(' data', data);
  const [dropdownOpen, setdropdownOpen] = React.useState<boolean>(false);
  const [Year, setYear] = React.useState<any>('2022');
  const [YearValue, setYearValue] = React.useState<any>('Select Year');
  const [loading, setloading] = React.useState<boolean>(false);

  const toggle = () => {
    setdropdownOpen(!dropdownOpen);
  };
  const handleYear = (e: any) => {
    setYear(e.target.value);
    setYearValue(e.target.innerHTML);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const YearArray = [
    {
      _id: '1',
      name: '2022'
    },
    {
      _id: '2',
      name: '2023'
    },
    {
      _id: '3',
      name: '2024'
    },
    {
      _id: '4',
      name: '2025'
    },
    {
      _id: '5',
      name: '2026'
    }
  ];
  React.useEffect(() => {
    setloading(true);
    const body = {
      search: '',
      page: 1,
      limit: 10,
      year: 2022
    };
    ApiPost('/payment_history', body)
      .then((res: any) => {
        window.console.log(
          '🚀 ~ file: Payouts.tsx ~ line 53 ~ ApiPost ~ res',
          res
        );
        setdata(res?.data?.paymentHistoryData);
        setloading(false);
      })
      .catch((e) => {
        setloading(false);
      });
  }, []);

  return (
    <div className="primary-content-area container content-padding grid-left-sidebar">
      <Aside />
      <div className="main-content-area">
        <div className="page-title-section">
          <h2>
            <span className="gradient-text">Payouts</span>
          </h2>
        </div>
        <div className="filterable-bar">
          <form id="creators-filter-form">
            <div style={{ width: '180px', height: '43px' }}>
              <DropDown
                dropdownOpen={dropdownOpen}
                toggle={toggle}
                categoryValue={YearValue}
                array={YearArray}
                onClick={handleYear}
              />
            </div>
            <div className="filter-button">
              <button className="btn btn-normal btn-dark waves-effect waves-button waves-float waves-light">
                Filter
              </button>
            </div>
          </form>
        </div>
        <div className="upload-row">
          <div className="upload-column">
            <div className="payment-history">
              <h5>Payments History</h5>
              {loading ? (
                <Loader />
              ) : (
                <table className="content-table">
                  <thead>
                    <tr>
                      <th scope="col" className="heading-label">
                        Date
                      </th>
                      <th scope="col" className="heading-label">
                        Method
                      </th>
                      <th scope="col" className="heading-label">
                        Amount
                      </th>
                      <th scope="col" className="heading-label">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((e: any) => {
                      return (
                        <>
                          <tr>
                            <td data-label="Date">
                              <div className="date">
                                {moment(e?.createdAt).format('MMM DD,YYYY')}
                              </div>
                            </td>
                            <td data-label="Method">
                              <div className="item-title">Paypal</div>
                            </td>
                            <td data-label="Amount" className="stat-value">
                              ${e?.totalAmount ? e?.totalAmount : 0}
                            </td>
                            <td data-label="price" className="stat-value">
                              {e?.paymentStatus === 0 && 'Pending'}
                              {e?.paymentStatus === 1 && ' Paid'}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="upload-column">
            <div className="payment-method-section">
              <h5>Payment Method</h5>
              <form className="cryptoki-form" id="payment-method-form">
                <div className="payment-method">
                  <input type="radio" name="payment-method" id="paypal" />
                  <label htmlFor="paypal">Paypal</label>
                  <div className="payment-description">
                    Set up your account to recieve the payouts directly every
                    month!
                  </div>
                </div>
                <div className="payment-method">
                  <input type="radio" name="payment-method" id="credit-card" />
                  <label htmlFor="credit-card">Credit or Debit Card</label>
                </div>
                <button
                  className="btn btn-wide btn-dark waves-effect waves-button waves-float waves-light"
                  type="submit"
                >
                  Confirm Method
                </button>
              </form>
              <div className="confirmed-section">
                <div className="small-title">Confirmed Method</div>
                <div className="confirmed-info">
                  <a
                    href="mailto:dexterstark@fakepay.com"
                    className="green bold"
                  >
                    dexterstark@fakepay.com
                  </a>
                  <div className="confirmed-comment">
                    <span className="bold">Paypal</span> - Confirmed on Nov 17,
                    2020
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payouts;
