import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ItemCard from 'src/components/itemCard';
import NoDataFound from 'src/components/noDataFound';
import {
  isOpenModal,
  openModal,
  userProfile
} from 'src/redux/reducer/profileUpdateSlice';
import { ApiGet, ApiPost, ApiPostNoAuth } from 'src/services/http-service';

const NewestItems = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const userProfileData = useSelector(userProfile);

  const witAuthPostBody = {
    limit: 20,
    page: 1,
    status: 'approve',
    search: '',
    software: [],
    categoryId: [],
    subCategoryId: []
  };

  const postBody = {
    limit: 20,
    page: 1,
    search: '',
    status: 'approve',
    software: [],
    categoryId: [],
    subCategoryId: []
  };

  const { mutate: getExploredDataWithAuth } = useMutation(
    () => ApiPost('/post', witAuthPostBody),
    {
      onSuccess: (res: any) => {
        setData(res?.data?.post_data);
      }
    }
  );

  const { mutate: getExploredData } = useMutation(
    () => ApiPostNoAuth('user/post', postBody),
    {
      onSuccess: (res: any) => {
        setData(res?.data?.data?.post_data);
      }
    }
  );

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

  React.useEffect(() => {
    userProfileData ? getExploredDataWithAuth() : getExploredData();
  }, [userProfileData]);

  return (
    <div className="container section-padding">
      <div className="section-title-wrapper">
        <div className="section-title">
          <span className="gradient-text">Newest</span> Items
        </div>
        <div className="all-items-link">
          <Link to="">Explore all Artworks</Link>
        </div>
      </div>
      <div className="featured-box">
        <div className="featured-box-wrapper grid-4-columns">
          {data?.length === 0 && <NoDataFound />}

          {data?.map((item: any, index: number) => {
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
        </div>
      </div>
    </div>
  );
};

export default NewestItems;
