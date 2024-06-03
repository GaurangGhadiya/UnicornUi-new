import React, { useState } from 'react';
import Aside from '../../components/aside';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { BsDownload } from 'react-icons/bs';
import { ApiPost, Bucket } from 'src/services/http-service';
import { searching } from 'src/redux/reducer/searchFilterSlice';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NoDataFound from 'src/components/noDataFound';
import Loader from 'src/components/loader';

const YourPurchases = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const [month, setmonth] = React.useState<any>(moment(new Date()).format('M'));
  const [year, setyear] = React.useState<any>(
    moment(new Date()).format('YYYY')
  );
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const fetchData = async () => {
    setloading(true);
    const body = {
      month: JSON.parse(month),
      year: JSON.parse(year)
    };
    window.console.log(
      '🚀 ~ file: YourPurchases.tsx ~ line 26 ~ React.useEffect ~ body',
      body
    );
    await ApiPost('/get_purchase', body)
      .then((res: any) => {
        setdata(res?.data);
        setloading(false);
      })
      .catch((e) => {
        setloading(false);
      });
  };
  React.useEffect(() => {
    fetchData();
  }, []);
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
  const handleDateChange = (date: any | null) => {
    setmonth(moment(date.target.value).format('M'));
    setyear(moment(date.target.value).format('YYYY'));
    setSelectedDate(date.target.value);
  };
  const classes = useStyles();
  const download = (v: any) => {
    window.console.log(
      '🚀 ~ file: YourPurchases.tsx ~ line 48 ~ download ~ v',
      v
    );
    let name = v.posts[0]?.title;
    let a = document.createElement('a');
    let url = Bucket + v?.posts[0]?.sourceFile;
    a.href = url;
    a.setAttribute('download', name);
    a.click();
  };
  window.console.log('data', data);

  return (
    <div className="primary-content-area container content-padding grid-left-sidebar">
      <Aside />
      <div className="main-content-area">
        <div className="page-title-section">
          <h2>
            <span className="gradient-text">Your </span> Purchases
          </h2>
        </div>
        <div className="purchases-list">
          <div className="filterable-bar">
            <form id="creators-filter-form">
              <div className="filter-options">
                <TextField
                  id="date"
                  type="month"
                  placeholder="Select Month"
                  defaultValue={moment(Date()).format('YYYY-MM')}
                  className={`${classes?.textField} textheight`}
                  style={{ height: '43px' }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={handleDateChange}
                />
              </div>
              <div className="filter-button">
                <button
                  type="button"
                  className="btn btn-normal btn-dark waves-effect waves-button waves-float waves-light"
                  onClick={fetchData}
                >
                  Filter
                </button>
              </div>
            </form>
          </div>
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
                    Date
                  </th>
                  <th scope="col" className="heading-label">
                    License
                  </th>
                  <th scope="col" className="heading-label">
                    Price
                  </th>
                  <th scope="col" className="heading-label"></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((e: any) => {
                  return (
                    <>
                      <tr>
                        <td data-label="Item details">
                          <div className="product-info">
                            <div className="product-thumb">
                              <Link
                                to={
                                  e?.posts[0]?._id
                                    ? `/productdetail/${e?.posts[0]?._id}`
                                    : ''
                                }
                                onClick={() => {
                                  dispatch(searching(''));
                                }}
                              >
                                <img
                                  src={
                                    e?.posts[0]?.thumbnail
                                      ? e?.posts[0]?.thumbnail.split('/')[2] ==
                                        'lh3.googleusercontent.com'
                                        ? e?.posts[0]?.thumbnail
                                        : Bucket + e?.posts[0]?.thumbnail
                                      : '/Image/avatar.png'
                                  }
                                  alt="user-avatar"
                                />
                              </Link>
                            </div>
                            <div className="product-details">
                              <div className="product-name">
                                <Link
                                  to={
                                    e?.posts[0]?._id
                                      ? `/productdetail/${e?.posts[0]?._id}`
                                      : ''
                                  }
                                  onClick={() => {
                                    dispatch(searching(''));
                                  }}
                                >
                                  {e?.posts[0]?.title}
                                </Link>
                              </div>
                              <div className="product-meta">
                                <Link
                                  to={
                                    e?.posts[0]?.category[0]?._id &&
                                    `/explore-items/${e?.posts[0]?.category[0]?._id}`
                                  }
                                  className="item-category ui-templates"
                                >
                                  <div className="item-category ui-templates">
                                    {e?.posts[0]?.category[0]?.name}
                                  </div>
                                </Link>
                                <div className="product-seller">
                                  <Link
                                    to={
                                      e?.posts[0]?.user[0]?._id
                                        ? `/public/${e?.posts[0]?.user[0]?._id}/profile`
                                        : ''
                                    }
                                    onClick={() => {
                                      dispatch(searching(''));
                                    }}
                                  >
                                    @{e?.posts[0]?.user[0]?.username}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td data-label="Date">
                          {moment(e?.createdAt).format('MMM DD,YYYY')}
                        </td>
                        <td data-label="License">
                          {e?.licenseType === 0 && 'Regular'}
                          {e?.licenseType === 1 && 'Commercial'}
                          {e?.licenseType === 2 && 'Extended'}
                        </td>
                        <td data-label="Price" className="price">
                          ${e?.price}
                        </td>
                        <td>
                          <button
                            className="download"
                            onClick={() => download(e)}
                          >
                            <svg className="crumina-icon">
                              <BsDownload />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <NoDataFound />
          )}
          {/* <div className="discount-section">
                        <form className="cryptoki-form" id="discount-form">
                            <span className="label">Redeem Code</span>
                            <input type="text" placeholder="CRYP1258OFF" />
                            <button className="btn btn-normal btn-dark waves-effect waves-button waves-float waves-light" type="submit">Redeem!</button>
                        </form>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default YourPurchases;
