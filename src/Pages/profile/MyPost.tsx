import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { BsUpload } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

import Aside from '../../components/aside';
import ItemCard from 'src/components/itemCard';
import { ApiDelete, ApiGet, ApiPost } from 'src/helpers/API/ApiData';
import NoDataFound from 'src/components/noDataFound';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'src/components/loader';
import { SuccessToast } from 'src/helpers/Toast';
import { CgClose } from 'react-icons/cg';

let page = 1;
const MyPost = () => {
  const history = useHistory();
  const [status, setstatus] = useState('approve');
  const [count, setcount] = useState<any>({});
  const [postData, setPostData] = React.useState<any>([]);
  const [nextPage, setNextPage] = React.useState<number>(1);
  const [data, setdata] = React.useState<any>([]);
  const [postFirstData, setPostFirstData] = React.useState<any>();

  const [search, setsearch] = React.useState('');
  const [loading, setloading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: true
  });

  window.console.log('postData', postData);

  const fetchUserPost = async (status: any, search: any, pageNo: any) => {
    setloading(true);
    setstatus(status);
    const post = {
      limit: 15,
      page: 1,
      // page: pageNo ? pageNo : nextPage,
      status: status === 'reject' ? 'approve' : status,
      search,
      isPostActive: status === 'reject' ? false : true
    };

    await ApiPost('/user_post', post)
      .then((res: any) => {
        setPostData(res?.data?.post_data);
        window.console.log('RES', res.data);
        setPostFirstData(res?.data?.state?.post_count?.count);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        //eslint-disable-next-line
      });
  };

  useEffect(() => {
    page = 1;
    ApiGet('/post/count').then((res: any) => {
      setcount(res?.data);
    });
    fetchUserPost(status, search, 1);
  }, [search]);

  // const filteredData = React.useMemo(() => {
  //   return postData.filter(
  //     ({ _id: postDataId }) =>
  //       !data.some(
  //         ({ _id: receivedDataId }: any) => receivedDataId === postDataId
  //       )
  //   );
  // }, [postData]);

  const fetchDataLoad = async () => {
    page = page + 1;
    const post = {
      limit: 15,
      page: page,
      status: status === 'reject' ? 'approve' : status,
      search,
      isPostActive: status === 'reject' ? false : true
    };

    window.console.log('postt', post);

    await ApiPost('/user_post', post)
      .then((res: any) => {
        setPostData([...postData, ...res.data.post_data]);
        // setPostData([...postData, ...res.data.data.post_data]);
        window.console.log('RES', res.data);
        setPostFirstData(res?.data?.state?.post_count?.count);
      })
      .catch((error) => {
        //eslint-disable-next-line
      });
  };

  // React.useEffect(() => {
  //   if (inView && postData.length !== 0) {
  //     setdata((preValue: any) => {
  //       return [...preValue, ...filteredData];
  //     });
  //     inView && filteredData.length === 15 && setNextPage(nextPage + 1);
  //   }
  // }, [postData]);

  const handlesearch = (e: any) => {
    setsearch(e.target.value);
  };

  const handleStatus = (sta: any) => {
    setstatus(sta);
    fetchUserPost(sta, search, 1);
  };

  const postLike = (productId: any) => {
    ApiGet(`/post/like_post/${productId}`).then(() => {
      fetchUserPost(status, search, 1);
    });
  };

  const postDetete = (id: any) => {
    ApiDelete(`/post/${id}`).then((res: any) => {
      window.console.log('res', res);
      fetchUserPost(status, search, 1);
      SuccessToast(res?.message);
    });
  };
  const postEdit = (id: any) => {
    // history.push('/upload');
    history.push({
      pathname: '/upload',
      state: id
    });
  };

  window.console.log('postt2', postData);
  window.console.log('postt3', page);

  return (
    <div className="primary-content-area container content-padding grid-left-sidebar">
      <Aside />
      <div className="main-content-area">
        <div className="page-title">
          <h2>
            <span className="gradient-text">My</span> Post
          </h2>
        </div>
        <form className="cryptoki-form" id="personal-info-form">
          <div className="form-group row position-relative">
            <div className="form-field col-md-12">
              <input
                name="search"
                type="text"
                autoComplete="off"
                id="current"
                value={search}
                placeholder="Search by name"
                onChange={handlesearch}
              ></input>
            </div>
            {search && (
              <CgClose className="closeCg" onClick={() => setsearch('')} />
            )}
          </div>
        </form>

        <ul className="tabs-list mb-5">
          <li
            className={`swiper-slide  w-auto ${
              status === 'approve' && 'active'
            }`}
            onClick={() => handleStatus('approve')}
          >
            <a>
              Active
              <span className="count">{count?.public}</span>
            </a>
          </li>
          <li
            className={`swiper-slide  w-auto ${
              status === 'reject' && 'active'
            }`}
            onClick={() => handleStatus('reject')}
          >
            <a>
              In Active
              <span className="count">{count?.rejected}</span>
            </a>
          </li>
          <li
            className={`swiper-slide  w-auto ${
              status === 'request' && 'active'
            }`}
            onClick={() => handleStatus('request')}
          >
            <a>
              Pending
              <span className="count">{count?.pending}</span>
            </a>
          </li>
        </ul>
        <div className="user-db-content-area">
          <InfiniteScroll
            dataLength={postData?.length}
            next={fetchDataLoad}
            style={{ overflow: 'hidden' }}
            hasMore={postFirstData !== postData?.length}
            endMessage={
              postData?.length !== 0 && (
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              )
            }
            loader=""
          >
            {loading ? (
              <Loader />
            ) : (
              <div className="featured-box">
                <div
                  className={`featured-box-wrapper ${
                    postData?.length > 2 ? 'grid-4-columns' : 'grid-1-columns'
                  }`}
                >
                  {status === 'approve' && (
                    <div className="create-item">
                      <div className="create-item-wrapper">
                        <div className="create-item-content">
                          <div
                            className="create-item-image cursor-pointer h-197px my-0"
                            onClick={() => history.push('/upload')}
                          >
                            <BsUpload />
                          </div>
                          <div className="create-item-info">
                            <div className="small-title">
                              Create a New Item!
                            </div>
                            <div
                              className="description cursor-pointer"
                              onClick={() => history.push('/upload')}
                            >
                              Click here to start
                            </div>
                          </div>
                        </div>
                        <div className="create-item-post-content my-2"></div>
                      </div>
                    </div>
                  )}
                  {postData?.map((eve: any, index: any) => {
                    return (
                      <div key={index}>
                        <ItemCard
                          productId={eve?._id}
                          totalLikes={eve?.totalLikes}
                          thumbnail={eve?.thumbnail}
                          subcategory={eve?.sub_category?.[0]?.name}
                          category={eve?.category?.[0]?.name}
                          title={eve?.title}
                          software={eve?.software}
                          image={eve?.user[0]?.image ?? undefined}
                          username={eve?.user[0]?.name}
                          userId={eve?.user[0]?._id}
                          isCreator={eve?.user[0]?.isCreator}
                          price={eve?.price}
                          like={eve?.like}
                          postLike={postLike}
                          postDetete={postDetete}
                          postEdit={postEdit}
                        />
                      </div>
                    );
                  })}
                </div>
                <div ref={ref} />
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default MyPost;
