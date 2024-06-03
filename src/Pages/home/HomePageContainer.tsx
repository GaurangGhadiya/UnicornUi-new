import React, { useEffect } from 'react';
import HeroBanner from './HeroBanner';
import FeaturedItems from './FeaturedItems';
import BrowseCategories from './BrowseCategories';
import NewestItems from './NewestItems';
import FeaturedSellers from './FeaturedSeller';
import LatestNews from './LatestNews';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuth,
  isOpenModal,
  openModal
} from 'src/redux/reducer/profileUpdateSlice';

const HomePageContainer = () => {
  const location: any = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector(getAuth);

  useEffect(() => {
    if (isAuth) {
      console.log('isAuth :>> ', isAuth);
      location.state?.from && history.push(location.state?.from);
    } else {
      if (history.location.pathname !== '/') {
        console.log('first');
        // dispatch(openModal('1'));
        // dispatch(isOpenModal(true));
      }
    }
  }, [isAuth]);

  return (
    <>
      <HeroBanner />
      <FeaturedItems />
      <BrowseCategories />
      <NewestItems />
      {/* <FeaturedSellers /> */}
      <LatestNews />
    </>
  );
};

export default HomePageContainer;
