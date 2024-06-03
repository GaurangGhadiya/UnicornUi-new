import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from 'src/components/loader';
import ItemCard from 'src/components/itemCard';
import { ApiGet, ApiGetNoAuth, ApiPostNoAuth } from 'src/services/http-service';
import { getFilter } from 'src/redux/reducer/searchFilterSlice';
import { ApiPost } from 'src/helpers/API/ApiData';
import { Modal_Commen } from 'src/components/modal/Modal_Commen';
import {
  isOpenModal,
  openModal,
  userProfile
} from 'src/redux/reducer/profileUpdateSlice';
import NoDataFound from 'src/components/noDataFound';
import DropDown from 'src/components/dropdown/DropDown';
import { filter } from 'lodash';

let page = 1;
const ExploreItems = (props: any) => {
  const nextPage = 1;
  const location: any = useLocation();
  const searchFilter = useSelector(getFilter);
  const userProfileData = useSelector(userProfile);
  const dispatch = useDispatch();
  const softwareId = location?.state;
  const subCategoryId = props?.match?.params?.id;
  const [postData, setPostData] = React.useState<any>([]);
  const [softwareData, saveSoftwareData] = React.useState<any>([]);
  const [postFirstData, setPostFirstData] = React.useState<any>();
  const [software, setsoftware] = React.useState<any>([]);
  const [selectedSoftware2, setselectedSoftware] = React.useState<any>('');
  const [category, setcategory] = React.useState<any>([]);
  const [selectedCategory, setselectedCategory] = React.useState<any>([]);
  const [categoryId, setcategoryId] = React.useState<any>([]);
  const [softwareId1, setsoftwareId] = React.useState<any>(softwareId ?? '');
  const [subCategoryId1, setsubCategoryId] = React.useState<any>(
    [subCategoryId] ?? []
  );

  const [categoryValue, setcategoryValue] = React.useState<any>([]);
  const [postCount, setpostCount] = React.useState<any>(0);
  const [subcategoryValue, setsubcategoryValue] = React.useState<any>([]);
  const [softwareValue, setsoftwareValue] = React.useState<any>([]);
  const [subCategoryEnums, setsubCategoryEnums] = React.useState<any>([]);
  const [selectedSubCategory, setselectedSubCategory] = React.useState<any>([]);
  const [selectedSoftware, saveSelectedSoftware] = React.useState<any>(
    softwareId ? [softwareId] : []
  );

  const [dropdownOpen, setdropdownOpen] = React.useState<boolean>(false);
  const [subdropdownOpen, setsubdropdownOpen] = React.useState<boolean>(false);
  const [softwaredropdownOpen, setsoftwaredropdownOpen] =
    React.useState<boolean>(false);

  useEffect(() => {
    ApiGetNoAuth('user/sub_category').then((res: any) => {
      setsubCategoryEnums(res?.data?.data?.menu_categories);
    });
  }, []);

  useEffect(() => {
    ApiGet('/category').then((res: any) => {
      setsoftware(res?.data?.software_categories);
      setcategory(res?.data?.menu_categories);
    });
  }, []);

  // const subCategoryEnums = React.useMemo(() => {
  //   return category
  //     .filter((data: any) => data._id === categoryId)
  //     ?.map((values: any) => values.menu_sub_categories)[0];
  // }, [categoryId]);

  // window.console.log('subCategoryEnums', subCategoryEnums);

  const toggle = () => {
    setdropdownOpen(!dropdownOpen);
  };

  const subtoggle = () => {
    setsubdropdownOpen(!subdropdownOpen);
  };

  const softwaretoggle = () => {
    setsoftwaredropdownOpen(!softwaredropdownOpen);
  };

  const handleOpenCategry = (e: any) => {
    // let flag = categoryValue?.includes(e.target.innerHTML);
    let flag = categoryValue?.find((v: any) => v?.value == e.target.value);

    if (!flag) {
      // setcategoryId(e.target.value);
      // handleCategoryChange(e.target.value);
      // setcategoryValue(e.target.innerHTML);

      setselectedCategory([...selectedCategory, e.target.value]);

      setcategoryId([...categoryId, e.target.value]);
      setcategoryValue((preValue: any) => {
        return [...preValue, e.target];
      });
    }
  };

  const handleOpensubCategry = (e: any) => {
    // handleSubCategoryChange(e.target.value);
    let flag = subcategoryValue?.find((v: any) => v?.value == e.target.value);

    if (!flag) {
      setsubCategoryId([...subCategoryId1, e.target.value]);
      setsubcategoryValue((preValue: any) => {
        return [...preValue, e.target];
      });

      // setsubCategoryId(e.target.value);
      // setsubcategoryValue(e.target.innerHTML);
    }
  };
  // const handleSoftware = (e: any) => {
  //   // handleSubCategoryChange(e.target.value);
  //   setsoftwareId(e.target.value);
  //   setsoftwareValue(e.target.innerHTML);
  // };
  const handleSoftware = (e: any) => {
    let flag = softwareValue?.find((v: any) => v?.value == e.target.value);

    if (!flag) {
      saveSelectedSoftware([...selectedSoftware, e.target.value]);
      setsoftwareValue((preValue: any) => {
        return [...preValue, e.target];
      });
    }
  };
  const post = {
    limit: 20,
    page: nextPage,
    status: 'approve',
    search: searchFilter,
    software: selectedSoftware,
    categoryId: [],
    subCategoryId: subCategoryId ? [subCategoryId] : []
  };

  const post0 = {
    limit: 20,
    page: nextPage,
    search: searchFilter,
    status: 'approve',
    software: selectedSoftware,
    categoryId: [],
    subCategoryId: subCategoryId ? [subCategoryId] : []
  };

  const post2 = {
    limit: 20,
    page: nextPage,
    search: searchFilter,
    status: 'approve',
    software: selectedSoftware,
    categoryId: categoryId,
    subCategoryId: [subCategoryId]
  };

  const post3 = {
    limit: 20,
    page: nextPage,
    search: searchFilter,
    status: 'approve',
    software: selectedSoftware,
    categoryId: [],
    subCategoryId: []
  };

  const { mutate: getExploredData } = useMutation(
    () => ApiPostNoAuth('user/post', post),
    {
      onSuccess: (res: any) => {
        setPostData(res?.data?.data?.post_data);
        setPostFirstData(res?.data?.data?.state?.post_count);
      }
    }
  );

  const { mutate: getExploredDataWithAuth } = useMutation(
    () => ApiPost('/post', post0),
    {
      onSuccess: (res: any) => {
        setPostData(res?.data?.post_data);
        setPostFirstData(res?.data?.state?.post_count);
      }
    }
  );

  const { mutate: fetchSubPost } = useMutation(
    () => ApiPostNoAuth('user/post', post2),
    {
      onSuccess: (res: any) => {
        setPostData(res?.data?.data?.post_data);
        setPostFirstData(res?.data?.data?.state?.post_count);
      }
    }
  );

  const { mutate: fetchSoftPost } = useMutation(
    () => ApiPostNoAuth('user/post', post3),
    {
      onSuccess: (res: any) => {
        setPostData(res?.data?.data?.post_data);
        setPostFirstData(res?.data?.data?.state?.post_count);
      }
    }
  );

  const fetchDataLoad = async () => {
    page = page + 1;
    if (postData.length < 40 || localStorage.getItem('logindata')) {
      const post = {
        limit: 20,
        page: page,
        status: 'approve',
        search: searchFilter,
        software: selectedSoftware,
        categoryId: categoryId ? categoryId : [],
        subCategoryId: subCategoryId1 ? subCategoryId1 : []
      };

      await ApiPostNoAuth('user/post', post)
        .then((res: any) => {
          setPostData([...postData, ...res.data.data.post_data]);
        })
        .catch();
    } else {
      dispatch(isOpenModal(true));
    }
  };

  const onFilter = async () => {
    // page = page + 1;
    const post = {
      limit: 20,
      page: 1,
      status: 'approve',
      search: searchFilter,
      software: selectedSoftware,
      categoryId: categoryId ? categoryId : [],
      subCategoryId: subCategoryId1 ? subCategoryId1 : []
    };

    await ApiPostNoAuth('user/post', post)
      .then((res: any) => {
        setPostData(res?.data?.data?.post_data);
        setPostFirstData(res?.data?.data?.state?.post_count);
      })
      .catch((e) => {
        //eslint-disable-next-line
      });
  };

  React.useEffect(() => {
    page = 1;
    if (searchFilter) {
      subCategoryId === undefined;
      softwareId === undefined;
      // categoryId === undefined;
      setcategoryId('');
      setsoftwareId('');
      setsubCategoryId('');
      // setcategoryValue([]);
      // setsoftwareValue([]);
      // setsubcategoryValue([]);
      userProfileData ? getExploredDataWithAuth() : getExploredData();
    }
  }, [
    searchFilter,
    nextPage,
    userProfileData,
    // selectedCategory,
    selectedSoftware2,
    selectedSubCategory
  ]);

  React.useEffect(() => {
    if (subCategoryId) {
      page = 1;
      fetchSubPost();
    }
  }, [subCategoryId]);

  React.useEffect(() => {
    if (softwareId) {
      page = 1;
      fetchSoftPost();
    }
  }, [softwareId]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchFilter]);
  React.useEffect(() => {
    onFilter();
  }, [selectedSoftware, categoryValue, subcategoryValue]);
  // React.useEffect(() => {
  //   if (categoryValue.length == 0) onFilter();
  // }, [categoryValue]);

  React.useEffect(() => {
    userProfileData ? getExploredDataWithAuth() : getExploredData();
  }, [userProfileData]);

  const postLike = (productId: any) => {
    if (localStorage.getItem('logindata')) {
      ApiGet(`/post/like_post/${productId}`).then(() => {
        getExploredDataWithAuth();
      });
    } else {
      dispatch(openModal('1'));
      dispatch(isOpenModal(true));
    }
  };
  useQuery(
    'fetchSoftwareData',
    () => ApiGetNoAuth('user/category?software=true'),
    {
      onSuccess: (response: any) => {
        saveSoftwareData(
          response?.data?.data.map((items: any) => {
            return { value: items._id, label: items.name };
          })
        );
      }
    }
  );

  const removeSoftware = (v: any) => {
    let data = softwareValue?.filter((name: any) => name !== v);
    let data2 = selectedSoftware?.filter((name: any) => name !== v.value);
    setsoftwareValue(data);
    saveSelectedSoftware(data2);
  };

  const removeSoftware2 = (v: any) => {
    let data = categoryValue?.filter((name: any) => name !== v);
    let data2 = selectedCategory?.filter((name: any) => name !== v.value);
    let data3 = categoryId?.filter((name: any) => name !== v.value);
    setcategoryValue(data);
    setselectedCategory(data2);
    setcategoryId(data3);
  };

  const removeSoftware3 = (v: any) => {
    let data = subcategoryValue?.filter((name: any) => name !== v);
    let data2 = selectedSubCategory?.filter((name: any) => name !== v.value);
    setsubcategoryValue(data);
    setselectedSubCategory(data2);
  };

  return (
    <div className="container section-padding">
      <div className="section-title-wrapper">
        {/* {postData?.length > 0 && ( */}
        <div className="section-title">
          <span className="gradient-text">Explore</span> Items
        </div>
        {/* )} */}
      </div>

      {/* -------------------------------------------------- filter start --------------------------------------------------------------- */}

      <div className="filterable-bar mb-10">
        <form id="creators-filter-form">
          <div
            className="filter-options d-flex  justify-content-between w-100 flex-wrap1"
            // style={{ flex: 1 }}
          >
            <div
              // style={{
              //   height: `${softwareValue?.length > 3 ? 'auto' : '51px'}`
              // }}
              className="set-explore"
            >
              <DropDown
                dropdownOpen={softwaredropdownOpen}
                toggle={softwaretoggle}
                categoryValue={softwareValue}
                array={softwareData}
                onClick={handleSoftware}
                multiple={true}
                removeSoftware={removeSoftware}
                placeholder="Select Software"
                isExplore={true}
              />
            </div>

            <div
              // style={{
              //   height: `${categoryValue?.length > 3 ? 'auto' : '51px'}`
              // }}
              className="set-explore"
            >
              <DropDown
                dropdownOpen={dropdownOpen}
                toggle={toggle}
                categoryValue={categoryValue}
                array={category}
                multiple={true}
                isExplore={true}
                onClick={handleOpenCategry}
                removeSoftware={removeSoftware2}
                placeholder="Select Category"
              />
            </div>

            <div
              // style={{
              //   height: `${subcategoryValue?.length > 3 ? 'auto' : '51px'}`
              // }}
              className="set-explorel"
            >
              <DropDown
                dropdownOpen={subdropdownOpen}
                toggle={subtoggle}
                multiple={true}
                isExplore={true}
                categoryValue={subcategoryValue}
                array={subCategoryEnums ?? []}
                onClick={handleOpensubCategry}
                removeSoftware={removeSoftware3}
                placeholder="Select Subcategory"
              />
            </div>
          </div>
          {/* <div className="filter-button">
            <button
              className="btn btn-normal btn-dark"
              type="button"
              onClick={onFilter}
            >
              Filter
            </button>
          </div> */}
        </form>
      </div>

      {/* -------------------------------------------------- filter end --------------------------------------------------------------- */}
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
        loader={
          <div className="loader">
            {postFirstData !== postData?.length && <Loader />}
          </div>
        }
      >
        <div className="featured-box">
          {postData.length ? (
            <div
              className={`featured-box-wrapper  ${
                postData?.length > 1 ? 'grid-4-columns' : 'grid_25'
              }`}
            >
              {!searchFilter &&
                postData.length !== 0 &&
                postData?.map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      <ItemCard
                        productId={item._id}
                        totalLikes={item.totalLikes}
                        thumbnail={item.thumbnail}
                        subcategory={item?.subcategory}
                        subCategoryId={item?.subCategoryId}
                        title={item.title}
                        software={item.software}
                        image={item.user[0]?.image ?? undefined}
                        username={item?.user[0]?.username ?? 'Username'}
                        userId={item?.user[0]?._id}
                        isCreator={item?.user[0]?.isCreator}
                        price={item.price}
                        like={item?.like}
                        postLike={postLike}
                      />
                    </div>
                  );
                })}
              {searchFilter &&
                postData.length !== 0 &&
                postData?.map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      <ItemCard
                        productId={item._id}
                        totalLikes={item.totalLikes}
                        thumbnail={item.thumbnail}
                        subcategory={item?.subcategory}
                        subCategoryId={item?.subCategoryId}
                        title={item.title}
                        software={item.software}
                        image={item.user[0]?.image ?? undefined}
                        username={item?.user[0]?.username ?? 'Username'}
                        price={item.price}
                        userId={item?.user[0]?._id}
                        isCreator={item?.user[0]?.isCreator}
                        like={item?.like}
                        postLike={postLike}
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
  );
};

export default ExploreItems;
