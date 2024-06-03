import React, { useState } from 'react';
import { ApiPost } from 'src/helpers/API/ApiData';
import { Bucket } from 'src/helpers/API/ApiData';
import moment from 'moment';
import { BsWallet } from 'react-icons/bs';
import { FcApproval, FcExpired } from 'react-icons/fc';
import { GiCancel } from 'react-icons/gi';
import { AiOutlineDelete, AiOutlineHeart, AiOutlineSave } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { searching } from 'src/redux/reducer/searchFilterSlice';
import { useDispatch } from 'react-redux';
import { GrUpdate } from 'react-icons/gr';
import { MdPayment } from 'react-icons/md';
import NoDataFound from 'src/components/noDataFound';
import Pagination from '@material-ui/lab/Pagination';
import Loader from 'src/components/loader';
const index = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  window.console.log('🚀 ~ file: index.tsx ~ line 20 ~ index ~ data', data);
  const [totalpage, settotalpage] = useState(0);
  const [currentpage, setcurrentpage] = useState(1);
  const [pagesize, setpagesize] = useState(10);
  const [loading, setloading] = useState(false);
  React.useEffect(() => {
    setloading(true);
    const body = {
      read: true,
      search: '',
      page: currentpage,
      limit: pagesize
    };
    ApiPost('/notification/get', body).then((res: any) => {
      setData(res?.data?.notification_data);
      settotalpage(res.data.state.page_limit);
      setcurrentpage(res.data.state.page);
      setpagesize(res.data.state.limit);
      setloading(false);
    }).catch;
  }, [currentpage, pagesize]);
  const handleChange = (e: any, i: any) => {
    window.console.log(i);
    setcurrentpage(i);
  };
  const handleonchnagespagination = (e: any) => {
    window.console.log(e.target.value);
    setpagesize(e.target.value);
  };
  window.console.log(data);

  return (
    <div className="primary-content-area container  content-padding">
      <div className="main-content-area">
        <div className="page-title">
          <h2>
            <span className="gradient-text">Notifications</span>
          </h2>
        </div>
        <div className="notifications-list">
          <div className="notifications-list-wrapper">
            {loading ? (
              <Loader />
            ) : data.length ? (
              data?.map((e: any, i: number) => {
                const time = Date();
                let now = moment(time).format('DD/MM/YYYY HH:mm:ss');
                let then = moment(e?.createdAt).format('DD/MM/YYYY HH:mm:ss');
                let ms: any = moment(now, 'DD/MM/YYYY HH:mm:ss').diff(
                  moment(then, 'DD/MM/YYYY HH:mm:ss')
                );
                let year: any = moment.duration(ms).get('year');
                let month: any = moment.duration(ms).get('month');
                let day: any = moment.duration(ms).get('day');
                let hour: any = moment.duration(ms).get('hours');
                let minutes: any = moment.duration(ms).get('minutes');
                let second: any = moment.duration(ms).get('seconds');
                return (
                  <div key={i}>
                    <div className="notification">
                      <div className="notification-body">
                        <Link
                          to={
                            e?.post[0]?._id
                              ? `/productdetail/${e?.post[0]?._id}`
                              : ''
                          }
                          onClick={() => {
                            dispatch(searching(''));
                          }}
                        >
                          <div className="thumb-box">
                            <a>
                              <img
                                src={
                                  e?.post[0]?.thumbnail
                                    ? Bucket + e?.post[0]?.thumbnail
                                    : '/Image/avatar.png'
                                }
                                alt=""
                              />

                              <span className="bid-type">
                                <svg className="crumina-icon">
                                  {e?.notificationType === 0 && <FcApproval />}
                                  {e?.notificationType === 1 && <GiCancel />}
                                  {e?.notificationType === 2 && <GrUpdate />}
                                  {e?.notificationType === 3 && (
                                    <AiOutlineDelete />
                                  )}
                                  {e?.notificationType === 4 && (
                                    <AiOutlineHeart />
                                  )}
                                  {e?.notificationType === 5 && (
                                    <AiOutlineSave />
                                  )}
                                  {e?.notificationType === 6 && <BsWallet />}
                                  {e?.notificationType === 7 && <FcApproval />}
                                  {e?.notificationType === 8 && <GiCancel />}
                                  {e?.notificationType === 9 && <GrUpdate />}
                                  {e?.notificationType === 10 && <FcExpired />}
                                  {e?.notificationType === 11 && <GiCancel />}
                                  {e?.notificationType === 12 && <MdPayment />}
                                </svg>
                              </span>
                            </a>
                          </div>
                        </Link>
                        <div className="notification-info">
                          <div className="message">
                            {e?.user[0]?._id !== '60f566936da9ce2768adbc6d' && (
                              <Link
                                to={
                                  e?.user[0]?._id
                                    ? `/public/${e?.user[0]?._id}/profile`
                                    : ''
                                }
                                onClick={() => {
                                  dispatch(searching(''));
                                }}
                              >
                                <a className="bold">@{e?.user[0]?.username}</a>
                              </Link>
                            )}
                            <a className="bold">
                              {e?.user[0]?._id === '60f566936da9ce2768adbc6d' &&
                                'Admin'}{' '}
                              {e?.description}
                            </a>
                          </div>
                          <div className="publish-date">
                            {year !== 0
                              ? `${year} year ago`
                              : month !== 0
                              ? `${month} month ago`
                              : day !== 0
                              ? `${day} day ago`
                              : hour !== 0
                              ? `${hour} hour ago`
                              : minutes !== 0
                              ? `${minutes} minutes ago`
                              : second !== 0
                              ? `${second} second ago`
                              : 'just now'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>
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
  );
};

export default index;
