import React, { useEffect } from 'react';

import Aside from '../../components/aside';
import ItemCard from 'src/components/itemCard';
import { ApiGet, ApiPost } from 'src/helpers/API/ApiData';
import NoDataFound from 'src/components/noDataFound';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'src/components/loader';
import { CgClose } from 'react-icons/cg';

let pages = 1;
const nextPage = 1;
const SavedPost = () => {
  const [likeData, setlikeData] = React.useState<any>([]);
  const [SearchFilt, setSearchFilt] = React.useState<any>([]);
  const [postFirstData, setPostFirstData] = React.useState<any>();
  const [search, setsearch] = React.useState('');
  const [loading, setloading] = React.useState<boolean>(false);
  const [like, setLike] = React.useState<boolean>(false);

  const fetchUserPostLike = async (search: any) => {
    setloading(true);
    const post = {
      limit: 10,
      page: nextPage,
      search
    };
    setLike(false);
    await ApiPost('/get_favorite_post', post)
      .then((res: any) => {
        setlikeData(res?.data?.post_data);
        window.console.log('postt2', res?.data?.state?.post_count?.count);
        window.console.log('postt2', res?.data?.state);
        setPostFirstData(res?.data?.state?.post_count?.count);
        setloading(false);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  const handlesearch = (e: any) => {
    setsearch(e.target.value);
  };

  const postLike = (productId: any) => {
    ApiGet(`/post/like_post/${productId}`).then(async () => {
      await fetchUserPostLike(search);
    });
  };
  useEffect(() => {
    pages = 1;
    fetchUserPostLike('');
  }, [like]);
  const fetchDataLoad = async () => {
    window.console.log('postt3', pages);
    const post = {
      limit: 10,
      page: pages,
      search
    };
    window.console.log('postt', post);
    await ApiPost('/get_favorite_post', post)
      .then((res: any) => {
        pages = pages + 1;
        setlikeData([...likeData, ...res.data.post_data]);
        // setPostFirstData(res?.data?.state?.post_count?.count);
      })
      .catch((e) => {
        //eslint-disable-next-line
      });
  };
  const searchData = async () => {
    const post = {
      limit: 18,
      page: 1,
      search
    };
    await ApiPost('/get_favorite_post', post)
      .then((res: any) => {
        setSearchFilt(res?.data?.post_data);
      })
      .catch((e: any) => {
        setSearchFilt([]);
      });
  };
  React.useEffect(() => {
    searchData();
  }, []);
  React.useEffect(() => {
    pages = 1;
    window.scrollTo(0, 0);
    fetchUserPostLike(search);
  }, [search]);

  window.console.log('postt', likeData);
  return (
    <div className="primary-content-area container content-padding grid-left-sidebar">
      <Aside />
      <div className="main-content-area">
        <div className="page-title">
          <h2>
            <span className="gradient-text">Saved</span> Posts
          </h2>
        </div>

        <form
          className="cryptoki-form"
          id="personal-info-form"
          // onSubmit={handleSubmit(onSubmit)}
        >
          {SearchFilt.length > 0 && (
            <div className="form-group row position-relative">
              <div className="form-field col-md-12 mb-4">
                <input
                  className=""
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
          )}
        </form>

        <div className="user-db-content-area">
          <InfiniteScroll
            dataLength={likeData?.length}
            next={fetchDataLoad}
            style={{ overflow: 'hidden' }}
            hasMore={postFirstData !== likeData?.length}
            endMessage={
              likeData?.length !== 0 && (
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              )
            }
            loader={<div className="loader">{/* <Loader /> */}</div>}
          >
            <div className="featured-box">
              {loading ? (
                <Loader />
              ) : likeData.length ? (
                <div
                  className={`featured-box-wrapper ${
                    likeData?.length > 2
                      ? 'grid-4-columns'
                      : 'grid-1-columns save_columns'
                  }`}
                >
                  {/* {likeData?.length === 0 && <NoDataFound />} */}

                  {likeData?.map((item: any, index: any) => {
                    return (
                      <div key={index}>
                        <ItemCard
                          productId={item?._id}
                          totalLikes={item?.totalLikes}
                          thumbnail={item?.thumbnail}
                          subcategory={item?.sub_category?.[0]?.name}
                          category={item?.category?.[0]?.name}
                          subCategoryId={item?.subCategoryId}
                          title={item?.title}
                          software={item?.software}
                          image={item?.user[0]?.image ?? undefined}
                          username={item?.user[0]?.name}
                          userId={item?.user[0]?._id}
                          user={item?.user[0] ?? undefined}
                          isCreator={item?.user[0]?.isCreator}
                          like={item?.like}
                          postLike={postLike}
                          price={item?.price}
                          fetchUserPostLike={fetchUserPostLike}
                          search={search}
                          likeChange={setLike}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <NoDataFound />
              )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default SavedPost;
