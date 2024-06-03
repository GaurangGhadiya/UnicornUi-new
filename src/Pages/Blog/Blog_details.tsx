import moment from 'moment';
import React, { Children, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bucket } from 'src/services/http-service';
import { Link, useHistory } from 'react-router-dom';
import parse, { attributesToProps, domToReact } from 'html-react-parser';
import { Element } from 'domhandler/lib/node';

import { ApiGetNoAuth, ApiPostNoAuth } from 'src/helpers/API/ApiData';

const Blog_details = () => {
  const location: any = useLocation();
  const history = useHistory();

  const option = {
    replace: (domNode: any) => {
      if (
        domNode instanceof Element &&
        domNode.attribs &&
        domNode.attribs.target == '_blank'
      ) {
        const props = attributesToProps(domNode.attribs);

        if (props.href == '') {
          console.log('hello insideddddddddddd');
          delete props.href;
          delete props.target;
        }

        return <a {...props}>{domToReact(domNode.children, option)}</a>;
      }
    }
  };

  const data1 = location.state;
  console.log(data1.html_code);
  // window.console.log('🚀 ~ file: Blog_details.tsx ~ line 7 ~ data', data);

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
  return (
    <>
      <div className="primary-content-area container content-padding">
        <div className="single-post single-post-sidebar grid-right-sidebar-large">
          <div className="single-post-body">
            <div className="post-heading">
              <div className="news-tags">
                <span className="tag-item">
                  <a href="#">{data1?.category[0]?.name}</a>
                </span>
              </div>
              <h1>{data1?.title}</h1>
              <div className="news-meta">
                <div className="post-author">
                  by <a href="#">Unicorn UI</a>,{' '}
                  {moment(data1?.createdAt).format('MMMM DD,YYYY')}
                </div>
                <ul className="social-icons-list">
                  <li className="social-icon">
                    <a href="#">
                      <svg className="crumina-icon"></svg>
                    </a>
                  </li>
                  <li className="social-icon">
                    <a href="#">
                      <svg className="crumina-icon"></svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="post-featured-image">
              {data1?.URLs[0]?.includes('.mp4') ? (
                <video
                  src={Bucket + data1?.URLs[0]}
                  style={{ width: '100%', height: '100%' }}
                  controls
                ></video>
              ) : (
                <img src={Bucket + data1?.URLs[0]} className="img-fluid" />
              )}
            </div>
            <div className="post-content">
              {parse(data1?.html_code, option)}
            </div>
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
                              <a className="tag-item" href="">
                                {e?.category[0]?.name}
                              </a>
                            </div>
                            <div className="recent-posts-widget-item-title">
                              <a onClick={() => blogDetails(e)}>{e?.title}</a>
                            </div>
                            <div className="recent-posts-widget-item-meta">
                              by <a href="">Unicorn UI</a>,{' '}
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
                        <a href="" className="categories-widget-item">
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
      </div>
      {/* <div classNameName="primary-content-area container content-padding">
      <div classNameName="single-post medium-section">
        <div classNameName="post-heading">
          <div classNameName="news-tags">
            <span classNameName="tag-item" style={{ cursor: 'auto' }}>
              <span>{data?.category[0]?.name}</span>
            </span>
          </div>
          <h1>{data?.title}</h1>
          <div classNameName="news-meta">
            <div classNameName="post-author">
              by <span>Unicorn UI</span>,{' '}
              {moment(data?.createdAt).format('MMMM DD,YYYY')}
            </div>
            <ul classNameName="social-icons-list">
              <li classNameName="social-icon">
                <span>
                  <svg classNameName="crumina-icon"></svg>
                </span>
              </li>
              <li classNameName="social-icon">
                <span>
                  <svg classNameName="crumina-icon"></svg>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div classNameName="post-featured-image">
          {data?.URLs[0]?.includes('.mp4') ? (
            <video
              src={Bucket + data?.URLs[0]}
              style={{ width: '100%', height: '100%' }}
              controls
            ></video>
          ) : (
            <img src={Bucket + data?.URLs[0]} classNameName="img-fluid" />
          )}
        </div>
        <div classNameName="post-content">
          {parse(data?.html_code.replace(/!important/g, ''))}
        </div>
      </div>
    </div> */}
    </>
  );
};

export default Blog_details;
