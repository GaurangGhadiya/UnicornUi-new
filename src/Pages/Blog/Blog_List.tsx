import moment from 'moment';
import React, { useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { ApiGetNoAuth, ApiPostNoAuth } from 'src/helpers/API/ApiData';
import { ApiPost, Bucket } from 'src/services/http-service';

const Blog_List = () => {
  const history = useHistory();
  const [data, setData] = React.useState([]);
  const [categoryData, setcategoryData] = React.useState([]);
  window.console.log('🚀 ~ file: Blog_List.tsx ~ line 6 ~ data', data);
  useEffect(() => {
    const body = {
      search: '',
      page: 1,
      limit: 1000
    };
    ApiPostNoAuth('user/blog/get', body).then((res: any) => {
      console.log('res', res);

      setData(res?.data?.data?.blog_data);
    });

    ApiGetNoAuth('user/category/get?blog=true').then((res: any) => {
      console.log('res', res);
      setcategoryData(res?.data?.data);
    });
  }, []);
  const blogDetails = (q: any) => {
    history.push({
      pathname: '/blog_details',
      state: q
    });
  };

  console.log('data', data);

  return (
    <div className="primary-content-area container content-padding">
      <div className="page-title-section">
        <h2>
          Our<span className="gradient-text"> Blog</span>
        </h2>
      </div>
      <div className="blog-classNameic-area grid-right-sidebar-large">
        <div className="blog-list">
          {data.map((e: any) => {
            return (
              <div className="news-item-classNameic">
                <div className="news-thumb">
                  {/* <a href="19-blog-post-sidebar.html"> */}
                  {/* {e?.URLs[0]?.includes('.mp4') && (
                      <a
                        className="post-format-icon"
                        data-fslightbox=""
                        data-type="youtube"
                        href="https://www.youtube.com/embed/Ik05cmjalXw"
                      >
                        <FaPlay />
                      </a>
                    )} */}
                  {/* <div className="news-thumb"> */}
                  <a onClick={() => blogDetails(e)}>
                    {e?.URLs[0]?.includes('.mp4') ? (
                      <video
                        src={Bucket + e?.URLs[0]}
                        // height="270"
                        // style={{
                        //   width: '100%',

                        //   objectFit: 'cover',
                        //   borderRadius: '25px'
                        // }}
                        style={{ height: '100%', objectFit: 'cover' }}
                      ></video>
                    ) : (
                      <img
                        src={Bucket + e?.URLs[0]}
                        // className="img-fluid"
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                    )}
                    {/* </a> */}
                    {/* </div> */}
                  </a>
                </div>
                <div className="news-content">
                  <div className="news-tags">
                    <a className="tag-item" href="#">
                      {e?.category[0]?.name}
                    </a>
                  </div>
                  <div className="news-title h5">
                    <a onClick={() => blogDetails(e)} className="news-title-in">
                      {e?.title}
                    </a>
                  </div>

                  <div className="news-meta">
                    by <a href="#">Unicorn UI</a>,{' '}
                    {moment(e?.createdAt).format('MMMM DD,YYYY')}
                  </div>
                  <div className="archive-item">
                    <a
                      onClick={() => blogDetails(e)}
                      className="read-more-link fw_800"
                    >
                      Read More
                      <svg className="crumina-icon"></svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          {/* <div className="pagination-section flex-left">
            <ul className="pagination-list">
              <li className="page-item page-nav-prev">
                <a href="#">Prev</a>
              </li>
              <li className="page-item">
                <a href="#">01</a>
              </li>
              <li className="page-item">
                <a href="#">02</a>
              </li>
              <li className="page-item">
                <a href="#">03</a>
              </li>
              <li className="page-item page-more-link">
                <a href="#">...</a>
              </li>
              <li className="page-item">
                <a href="#">16</a>
              </li>
              <li className="page-item page-nav-next">
                <a href="#">Next</a>
              </li>
            </ul>
          </div> */}
        </div>
        <aside>
          <div className="widgets-list">
            <div className="widget-2 recent-posts-widget">
              <div className="widget-title h5">Latest News</div>
              <div className="widget-body">
                {data.map((e: any, i: any) => {
                  return (
                    i <= 2 && (
                      <div className="recent-posts-widget-item">
                        <div className="recent-posts-widget-item-img">
                          <a onClick={() => blogDetails(e)}>
                            <img
                              src={Bucket + e?.URLs[0]}
                              alt=""
                              style={{ height: '100%' }}
                            />
                          </a>
                        </div>
                        <div className="recent-posts-widget-item-info">
                          <div className="recent-posts-widget-item-tags">
                            <a className="tag-item" href="#">
                              {e?.category[0]?.name}
                            </a>
                          </div>
                          <div className="recent-posts-widget-item-title">
                            <a onClick={() => blogDetails(e)}>{e?.title}</a>
                          </div>
                          <div className="recent-posts-widget-item-meta">
                            by <a href="#">Unicorn UI</a>,{' '}
                            {moment(e?.createdAt).format('MMMM DD,YYYY')}
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>

            <div className="widget-2 categories-widget">
              <div className="widget-title h5">Categories</div>
              <div className="widget-body">
                <div className="categories-widget-list">
                  {categoryData?.map((e: any) => {
                    return (
                      <a href="#" className="categories-widget-item">
                        {e?.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      {/* <div className="news-feed grid-3-columns">
        {data.map((e: any) => {
          return (
            <div
              className={`news-item ${
                e?.URLs[0]?.includes('.mp4') && 'video-post-format'
              }`}
            >
              {e?.URLs[0]?.includes('.mp4') && (
                <a
                  className="post-format-icon"
                  data-fslightbox=""
                  data-type="youtube"
                  href="https://www.youtube.com/embed/Ik05cmjalXw"
                >
                  <FaPlay />
                </a>
              )}
              <div className="news-thumb" style={{ height: '270px' }}>
                <a onClick={() => blogDetails(e)} style={{ height: '270px' }}>
                  {e?.URLs[0]?.includes('.mp4') ? (
                    <video
                      src={Bucket + e?.URLs[0]}
                      height="270"
                      style={{
                        width: '100%',

                        objectFit: 'cover',
                        borderRadius: '25px'
                      }}
                    ></video>
                  ) : (
                    <img
                      src={Bucket + e?.URLs[0]}
                      className="img-fluid"
                      style={{ height: '270px', objectFit: 'cover' }}
                    />
                  )}
                </a>
              </div>
              <div className="news-content">
                <div className="news-meta">
                  <div className="news-tags">
                    <span className="tag-item">
                      <a>{e?.category[0]?.name}</a>
                    </span>
                  </div>
                  by{' '}
                  <a href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/08-profile-page.html">
                    Unicorn UI
                  </a>
                  , {moment(e?.createdAt).format('MMMM DD,YYYY')}
                </div>
                <div className="news-title h5">{e?.title}</div>

                <div className="read-more-link">
                  <a onClick={() => blogDetails(e)}>
                    Read More
                    <svg className="crumina-icon"></svg>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default Blog_List;
