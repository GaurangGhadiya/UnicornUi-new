import { TextField } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Aside from '../../components/aside';
import { Bucket } from 'src/services/http-service';
import { ApiGet, ApiPost } from 'src/helpers/API/ApiData';
import Pagination from '@material-ui/lab/Pagination';
import NoDataFound from 'src/components/noDataFound';
import Loader from 'src/components/loader';
let letestMonth = new Date();
letestMonth.setMonth(letestMonth.getMonth() - 1);
let month = moment(letestMonth).format('M');
let year = moment(letestMonth).format('YYYY');
const SalesStatement = () => {
  const [state, setstate] = useState(true);
  const [state2, setstate2] = useState(false);
  const [data, setData] = useState<any>([]);
  const [data2, setData2] = useState<any>([]);
  const [totalpage, settotalpage] = useState(0);
  const [currentpage, setcurrentpage] = useState(1);
  const [pagesize, setpagesize] = useState(10);
  const [loading, setloading] = useState(false);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  }));
  const getSalesStatement = () => {
    setloading(true);
    let body = {
      download: true,
      month: JSON.parse(month),
      year: JSON.parse(year),
      page: currentpage,
      limit: pagesize
    };
    ApiPost('/sales_statement_download_purchase', body).then((res: any) => {
      window.console.log(
        ':rocket: ~ file: SalesStatement.tsx ~ line 54 ~ ApiPost ~ res',
        res
      );
      setData(res?.data?.post_data);
      settotalpage(res?.data?.state?.page_limit);
      setcurrentpage(res?.data?.state?.page);
      setpagesize(res?.data?.state?.limit);
      setloading(false);
    });
  };
  const handleDateChange = (date: any | null) => {
    month = moment(date.target.value).format('M');
    year = moment(date.target.value).format('YYYY');
    setSelectedDate(date.target.value);
    getSalesStatement();
  };
  const classes = useStyles();
  const toggleDownload = () => {
    setstate(true);
    setstate2(false);
    setpagesize(10);
    setcurrentpage(1);
    getSalesStatement();
  };
  const togglePurchase = () => {
    setloading(true);
    setpagesize(10);
    setcurrentpage(1);
    setstate2(true);
    setstate(false);
    let body = {
      purchase: true,
      month: JSON.parse(month),
      year: JSON.parse(year),
      page: currentpage,
      limit: pagesize
    };
    window.console.log('togglePurchase', body);
    ApiPost('/sales_statement_download_purchase', body).then((res: any) => {
      window.console.log(
        ':rocket: ~ file: SalesStatement.tsx ~ line 82 ~ ApiPost ~ res',
        res
      );
      setData2(res?.data?.purchase_data);
      settotalpage(res?.data?.state?.page_limit);
      setcurrentpage(res?.data?.state?.page);
      setpagesize(res?.data?.state?.limit);
      setloading(false);
    });
  };
  React.useEffect(() => {
    getSalesStatement();
  }, [currentpage, pagesize]);
  const handleChange = (e: any, i: any) => {
    window.console.log(i);
    setcurrentpage(i);
  };
  const handleonchnagespagination = (e: any) => {
    window.console.log(e.target.value);
    setpagesize(e.target.value);
  };
  window.console.log(
    "moment(Date()).format('yyyymmm')",
    moment(Date()).format('YYYY-MM')
  );

  return (
    <>
      <div className="primary-content-area container content-padding grid-left-sidebar">
        <Aside />
        <div className="main-content-area sales-statement">
          <div className="page-title-section">
            <h2>
              <span className="gradient-text">Sales</span> Statement
            </h2>
          </div>
          <div className="dashboard-wrapper">
            <div className="user-stats-section">
              <div className="stat-item">
                <div className="stat-number">$253.36</div>
                <div className="stat-description">Monthly Earnings</div>
              </div>
              <div className="stat-item">
                <div className="stat-number green">+54.2%</div>
                <div className="stat-description">From Last Month</div>
              </div>
              <div className="stat-item">
                <div className="stat-number red">$17.60</div>
                <div className="stat-description">Montly Taxes and Fees</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">$1,978,356.04</div>
                <div className="stat-description">
                  Total Sales Amount (before fees and taxes)
                </div>
              </div>
            </div>
            <ul className="tabs-list mb-5">
              <li
                className={`swiper-slide  w-auto ${state === true && 'active'}`}
                // onChange={(e)=> window.console.log(e.target.)}
                onClick={toggleDownload}
              >
                <a>Download sales</a>
              </li>
              <li
                className={`swiper-slide  w-auto ${
                  state2 === true && 'active'
                }`}
                onClick={togglePurchase}
              >
                <a>Purchase sales</a>
              </li>
            </ul>
            <div className="statement-list">
              <div className="filterable-bar">
                <form id="creators-filter-form">
                  <TextField
                    id="date"
                    type="month"
                    placeholder="Select Month"
                    className={`${classes?.textField} textheight`}
                    style={{ height: '43px' }}
                    defaultValue={moment(letestMonth).format('YYYY-MM')}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={handleDateChange}
                  />
                  <div className="filter-button">
                    <button className="btn btn-normal btn-dark waves-effect waves-button waves-float waves-light">
                      Filter
                    </button>
                  </div>
                </form>
              </div>
              {state === true && (
                <div className="statement">
                  {loading ? (
                    <Loader />
                  ) : data.length ? (
                    <table className="content-table">
                      <thead>
                        <tr>
                          <th scope="col" className="heading-label">
                            Item details
                          </th>
                          <th scope="col" className="heading-label">
                            Download
                          </th>
                          <th scope="col" className="heading-label">
                            Price
                          </th>
                          <th scope="col" className="heading-label">
                            Fee
                          </th>
                          <th scope="col" className="heading-label">
                            Tax
                          </th>
                          <th scope="col" className="heading-label">
                            Earnings
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr> */}
                        {data?.map((item: any) => (
                          <tr>
                            <td
                              data-label="Item details"
                              className="d-flex align-items-center"
                            >
                              <img
                                src={
                                  item?.post[0]?.thumbnail
                                    ? item?.post[0]?.thumbnail.split('/')[2] ==
                                      'lh3.googleusercontent.com'
                                      ? item?.post[0]?.thumbnail
                                      : Bucket + item?.post[0]?.thumbnail
                                    : '/Image/avatar.png'
                                }
                                alt="user-avatar"
                                width="70px"
                                height="50px"
                              />
                              <div className="item-title gradient-text ms-2">
                                <a>{item?.post[0]?.title}</a>
                              </div>
                            </td>
                            <td
                              data-label="totalDownload"
                              className="stat-value"
                            >
                              {item?.statementList?.totalDownload
                                ? item?.statementList?.totalDownload
                                : '0'}
                            </td>
                            <td data-label="price" className="stat-value">
                              $
                              {item?.statementList?.price
                                ? item?.statementList?.price
                                : '0'}
                            </td>
                            <td data-label="fee" className="stat-value">
                              -$
                              {item?.statementList?.fee
                                ? item?.statementList?.fee
                                : '0'}
                            </td>
                            <td data-label="tax" className="stat-value">
                              -$
                              {item?.statementList?.tax
                                ? item?.statementList?.tax
                                : '0'}
                            </td>
                            <td
                              data-label="earnings"
                              className="green stat-value"
                            >
                              $
                              {item?.statementList?.earnings
                                ? item?.statementList?.earnings
                                : '0'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              )}
              {state2 === true && (
                <div className="statement">
                  {loading ? (
                    <Loader />
                  ) : data.length ? (
                    <table className="content-table">
                      <thead>
                        <tr>
                          <th scope="col" className="heading-label">
                            Date
                          </th>
                          <th scope="col" className="heading-label">
                            Item details
                          </th>
                          <th scope="col" className="heading-label">
                            Download
                          </th>
                          <th scope="col" className="heading-label">
                            Price
                          </th>
                          <th scope="col" className="heading-label">
                            Fee
                          </th>
                          <th scope="col" className="heading-label">
                            Tax
                          </th>
                          <th scope="col" className="heading-label">
                            Earnings
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr> */}
                        {data2?.map((item: any) => (
                          <tr>
                            <td>
                              {moment(item.createdAt).format(
                                'DD-MM-YYYY, h:mm a'
                              )}
                            </td>
                            <td
                              data-label="Item details"
                              className="d-flex align-items-center"
                            >
                              <img
                                src={
                                  item?.post[0]?.thumbnail
                                    ? item?.post[0]?.thumbnail.split('/')[2] ==
                                      'lh3.googleusercontent.com'
                                      ? item?.post[0]?.thumbnail
                                      : Bucket + item?.post[0]?.thumbnail
                                    : '/Image/avatar.png'
                                }
                                alt="user-avatar"
                                width="70px"
                                height="50px"
                              />
                              <div className="item-title gradient-text ms-2">
                                <a>{item?.post[0]?.title}</a>
                              </div>
                              {/* <div className="license-details">
                        Regular License - Invoice CRKT12354
                      </div> */}
                            </td>
                            <td
                              data-label="totalDownload"
                              className="stat-value"
                            >
                              {item?.statementList?.totalDownload
                                ? item?.statementList?.totalDownload
                                : '0'}
                            </td>
                            <td data-label="price" className="stat-value">
                              $
                              {item?.statementList?.price
                                ? item?.statementList?.price
                                : '0'}
                            </td>
                            <td data-label="fee" className="stat-value">
                              -$
                              {item?.statementList?.fee
                                ? item?.statementList?.fee
                                : '0'}
                            </td>
                            <td data-label="tax" className="stat-value">
                              -$
                              {item?.statementList?.tax
                                ? item?.statementList?.tax
                                : '0'}
                            </td>
                            <td
                              data-label="earnings"
                              className="green stat-value"
                            >
                              $
                              {item?.statementList?.earnings
                                ? item?.statementList?.earnings
                                : '0'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between mt-5  pt-10">
              <div className="my-2">
                <Pagination
                  count={totalpage}
                  page={currentpage}
                  onChange={handleChange}
                  variant="outlined"
                  shape="rounded"
                  className="pagination_"
                />
              </div>
              <div className="my-2">
                <div className="d-flex align-items-center pagination-drpdown">
                  <select
                    className="form-control pagination-drpdown1 dropdownPage"
                    id="kt_datatable_search_status"
                    onChange={(e) => handleonchnagespagination(e)}
                    value={pagesize}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SalesStatement;
