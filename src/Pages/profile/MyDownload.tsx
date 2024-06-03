import React, { useEffect } from 'react';
import 'date-fns';
import Aside from '../../components/aside';
import { BsCheck2, BsDownload } from 'react-icons/bs';
import { ApiPost, Bucket } from 'src/helpers/API/ApiData';
import { NavLink, useHistory } from 'react-router-dom';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DropDown from 'src/components/dropdown/DropDown';
import NoDataFound from 'src/components/noDataFound';
import Pagination from '@material-ui/lab/Pagination';
import Loader from 'src/components/loader';

const licenceArray = [
  {
    _id: '0',
    name: 'Regular license'
  },
  {
    _id: '1',
    name: 'Commercial license'
  },
  {
    _id: '2',
    name: 'Extended license'
  }
];

const filterArray = [
  {
    _id: 'new',
    name: 'Newest to Oldest'
  },
  {
    _id: 'old',
    name: 'Oldest to Newest'
  }
];

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

let date = new Date();

const MyDownload = () => {
  const [downloadData, setdownloadData] = React.useState([]);
  const [licence, setlicence] = React.useState<any>('0');
  const [licenceValue, setlicenceValue] = React.useState<any>('Select Licence');
  const [newOld, setnewOld] = React.useState<any>('new');
  const [newOldValue, setnewOldValue] = React.useState<any>('Newest to Oldest');
  const [month, setmonth] = React.useState<any>(moment(new Date()).format('M'));
  const [year, setyear] = React.useState<any>(
    moment(new Date()).format('YYYY')
  );
  const [dropdownOpen, setdropdownOpen] = React.useState<boolean>(false);
  const [dropdownOpen2, setdropdownOpen2] = React.useState<boolean>(false);
  const [totalpage, settotalpage] = React.useState(0);
  const [currentpage, setcurrentpage] = React.useState(1);
  const [pagesize, setpagesize] = React.useState(10);
  const [loading, setloading] = React.useState<boolean>(false);
  const [searchFilt, setSearchFilt] = React.useState([]);

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const history = useHistory();
  const handleLicence = (e: any) => {
    setlicence(e.target.value);
    setlicenceValue(e.target.innerHTML);
  };
  const handleNewOld = (e: any) => {
    setnewOld(e.target.value);
    setnewOldValue(e.target.innerHTML);
  };

  const toggle = () => {
    setdropdownOpen(!dropdownOpen);
  };
  const toggle2 = () => {
    setdropdownOpen2(!dropdownOpen2);
  };

  const handleDateChange = (date: any | null) => {
    setmonth(moment(date.target.value).format('MM'));
    setyear(moment(date.target.value).format('YYYY'));
    setSelectedDate(date.target.value);
  };

  const handleChange = (e: any, i: any) => {
    setcurrentpage(i);
  };
  const getDownload = async () => {
    setloading(true);
    const body = {
      page: currentpage,
      limit: pagesize,
      month: +month,
      year: +year,
      licenseType: +licence,
      sortKey: newOld
    };

    await ApiPost(`/download/get`, body)
      .then((res: any) => {
        window.console.log(
          '🚀 ~ file: MyDownload.tsx ~ line 113 ~ getDownload ~ body',
          res?.data?.post_data
        );
        setdownloadData(res?.data?.post_data);
        settotalpage(res?.data?.state?.page_limit);
        setcurrentpage(res?.data?.state?.page);
        setpagesize(res?.data?.state?.limit);
        setloading(false);
      })
      .catch((error: any) => {
        setloading(false);
        //eslint-disable-next-line
      });
  };
  const searchData = async () => {
    const body = {
      page: currentpage,
      limit: pagesize,
      month: +month,
      year: +year,
      licenseType: +licence,
      sortKey: newOld
    };
    await ApiPost(`/download/get`, body)
      .then((res: any) => setSearchFilt(res?.data?.post_data))
      .catch((err) => setSearchFilt([]));
  };
  useEffect(() => {
    searchData();
  }, []);
  console.log('searchFilt', searchFilt);
  const download = (v: any) => {
    let name = v.title;
    let a = document.createElement('a');
    let url = Bucket + v?.sourceFile;
    a.href = url;
    a.setAttribute('download', name);
    a.click();
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getDownload();
  }, [currentpage, pagesize]);
  const classes = useStyles();

  const resetFilter = async () => {
    setlicence('0');
    setlicenceValue('Select Licence');
    setnewOld('new');
    setnewOldValue('Newest to Oldest');
    setmonth('');
    setyear('');
    setSelectedDate(new Date());
    const body = {
      page: currentpage,
      limit: pagesize,
      month: '',
      year: '',
      // licenseType: "",
      sortKey: 'new'
    };
    await ApiPost(`/download/get`, body)
      .then((res: any) => {
        setdownloadData(res?.data?.post_data);
        settotalpage(res?.data?.state?.page_limit);
        setcurrentpage(res?.data?.state?.page);
        setpagesize(res?.data?.state?.limit);
        setloading(false);
      })
      .catch((error: any) => {
        setloading(false);
        //eslint-disable-next-line
      });
  };
  console.log('download', downloadData);
  return (
    <div className="primary-content-area container content-padding grid-left-sidebar">
      <Aside />
      <div className="main-content-area">
        <div className="page-title">
          <h2>
            <span className="gradient-text">My</span> Downloads
          </h2>
        </div>
        {/* <div classNameName="user-db-content-area">
          <div classNameName="featured-box">
            <div classNameName="featured-box-wrapper grid-4-columns">
              {data?.postData?.map((eve, index) => {
                return (
                  <div key={index}>
                    <Theam data={eve} />
                  </div>
                );
              })}
            </div>
          </div>
        </div> */}

        <div className="purchases-list">
          {searchFilt.length > 0 && (
            <div className="filterable-bar">
              <form id="creators-filter-form">
                <div className="filter-options d-flex  flex-wrap">
                  {/* <form className={classes?.container} noValidate> */}
                  <TextField
                    type="month"
                    placeholder="Select Month"
                    className={`${classes?.textField} textheight`}
                    style={{ height: '43px' }}
                    // InputLabelProps={{
                    //   shrink: true
                    // }}
                    defaultValue={moment(Date()).format('YYYY-MM')}
                    onChange={handleDateChange}
                  />

                  <div>
                    <DropDown
                      dropdownOpen={dropdownOpen}
                      toggle={toggle}
                      categoryValue={licenceValue}
                      array={licenceArray}
                      onClick={handleLicence}
                    />
                  </div>

                  <div>
                    <DropDown
                      dropdownOpen={dropdownOpen2}
                      toggle={toggle2}
                      categoryValue={newOldValue}
                      array={filterArray}
                      onClick={handleNewOld}
                    />
                  </div>
                  <button
                    className="btn btn-normal btn-dark mb-20"
                    type="button"
                    onClick={getDownload}
                  >
                    Filter
                  </button>
                  <button
                    className="btn btn-normal btn-dark mb-20 "
                    type="button"
                    onClick={resetFilter}
                  >
                    Reset
                  </button>
                </div>
                {/* <div className="filter-button  ms-3"> */}

                {/* </div> */}
              </form>
            </div>
          )}
          <table className="content-table">
            {/* <thead>
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
                <th scope="col" className="heading-label">
                  Rating
                </th>
                <th scope="col" className="heading-label"></th>
              </tr>
            </thead> */}
            <tbody>
              {/* {downloadData?.length === 0 && <NoDataFound />} */}
              {loading ? (
                <Loader />
              ) : downloadData?.length ? (
                downloadData?.map((v: any) => {
                  window.console.log('v', v);

                  return (
                    <tr>
                      <td data-label="Item details">
                        <div className="product-info">
                          <div className="product-thumb">
                            <a href="05-product.html">
                              <img src={Bucket + v?.thumbnail} alt="" />
                            </a>
                          </div>
                          <div className="product-details">
                            <div className="product-name">
                              <NavLink to={`/productdetail/${v?._id}`}>
                                {v?.title}
                              </NavLink>
                            </div>
                            <div className="product-meta">
                              <div
                                className="item-category ui-templates cursor-pointer"
                                onClick={() =>
                                  history.push(
                                    `/explore-items/${v?.subCategoryId}`
                                  )
                                }
                              >
                                {v?.subcategory ? v?.subcategory : v?.category}
                              </div>
                              <div
                                className="product-seller cursor-pointer"
                                onClick={() =>
                                  history.push(
                                    `/public/${v?.user[0]?._id}/profile`
                                  )
                                }
                              >
                                @{v?.user?.length > 0 && v?.user[0]?.username}
                                {/* <span className="verified">
                                  <svg className="crumina-icon">
                                    <BsCheck2 />
                                  </svg>
                                </span> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td data-label="Date">
                        {moment(v?.createdAt).format('MMM DD, YYYY')}
                      </td>
                      <td data-label="License">
                        {' '}
                        {v?.licenseType === 0 && 'Free'}
                        {v?.licenseType === 1 && 'Commercial'}
                        {v?.licenseType === 2 && 'Extended'}
                      </td>
                      <td data-label="Price" className="price px-3">
                        ${v?.price}
                      </td>
                      <td>
                        <button
                          className="download"
                          onClick={() => download(v)}
                        >
                          <svg className="crumina-icon">
                            <BsDownload />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <NoDataFound />
              )}
            </tbody>
          </table>
          {downloadData.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDownload;
