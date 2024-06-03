import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query';

import AuthProtected from './helpers/route/authProtected';
import AuthPrevented from './helpers/route/authPrevent';
import { getFilter } from './redux/reducer/searchFilterSlice';
import HomePage from './Pages/home/HomePageContainer';
import NavBar from './layout/header/navbar';
import Header from './layout/header';
import Footer from './layout/footer';
import ProductPage from './Pages/products-detail';
import ProfileInfo from './Pages/profile/ProfileInfo';
import SalesStatement from './Pages/profile/SalesStatement';
import Payouts from './Pages/profile/Payouts';
import YourPurchases from './Pages/profile/YourPurchases';
import ForgotPassword from './Pages/profile/ForgotPassword';
import MyPost from './Pages/profile/MyPost';
import MyDownload from './Pages/profile/MyDownload';
import LikedPost from './Pages/profile/LikedPost';
import MyProfile from './Pages/profile/MyProfile';
import ExploreItems from './Pages/explore-items';
import Upload from './Pages/upload';
import contact from './Pages/ContactUs';
import faq from './Pages/FrequentlyAskedQuestions';
import notifications from './Pages/Notifications';
import getVerified from './Pages/GetVerified/index';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/css/Style1.css';
import './assets/css/Style2.css';
import './assets/css/Style3.css';
import './assets/css/Stytle4.css';
import './assets/css/login-register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccountSetting from './Pages/profile/AccountSetting';
import SavedPost from './Pages/profile/SavedPost';
import Checkout from './Pages/profile/Checkout';
import Plan from './Pages/Plan';
import Blog_List from './Pages/Blog/Blog_List';
import Blog_details from './Pages/Blog/Blog_details';
import Manage_Account from './Pages/profile/Manage_Account';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

function App() {
  const searchFilter = useSelector(getFilter);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        <NavBar />
        <Switch>
          <AuthPrevented
            key="default-home"
            exact
            path="/"
            component={searchFilter ? ExploreItems : HomePage}
          />
          <AuthProtected
            key="account-setting"
            exact
            path="/getVerified"
            component={searchFilter ? ExploreItems : getVerified}
          />
          <AuthPrevented
            key="home"
            exact
            path="/dashboard"
            component={searchFilter ? ExploreItems : HomePage}
          />
          <AuthPrevented
            key="explore-items:id"
            exact
            path="/explore-items/:id"
            component={ExploreItems}
          />
          <AuthPrevented
            key="explore-items"
            exact
            path="/explore-items"
            component={ExploreItems}
          />
          <AuthPrevented
            key="productdetail"
            exact
            path="/productdetail/:name/:id"
            component={searchFilter ? ExploreItems : ProductPage}
          />
          <AuthPrevented
            key="public-profile"
            exact
            path="/public/:userId/profile"
            component={searchFilter ? ExploreItems : MyProfile}
          />
          <AuthProtected
            key="profileinfo"
            exact
            path="/profileinfo"
            component={searchFilter ? ExploreItems : ProfileInfo}
          />
          <AuthProtected
            key="sales-statement"
            exact
            path="/sales-statement"
            component={searchFilter ? ExploreItems : SalesStatement}
          />
          <AuthProtected
            key="payouts"
            exact
            path="/payouts"
            component={searchFilter ? ExploreItems : Payouts}
          />
          <AuthProtected
            key="YourPurchases"
            exact
            path="/YourPurchases"
            component={searchFilter ? ExploreItems : YourPurchases}
          />
          <AuthProtected
            key="change-password"
            exact
            path="/change-password"
            component={searchFilter ? ExploreItems : ForgotPassword}
          />
          <AuthProtected
            key="my-posts"
            exact
            path="/my-posts"
            component={searchFilter ? ExploreItems : MyPost}
          />
          <AuthProtected
            key="my-downloads"
            exact
            path="/my-downloads"
            component={searchFilter ? ExploreItems : MyDownload}
          />
          <AuthProtected
            key="liked-posts"
            exact
            path="/liked-posts"
            component={searchFilter ? ExploreItems : LikedPost}
          />
          <AuthProtected
            key="saved-posts"
            exact
            path="/saved-posts"
            component={searchFilter ? ExploreItems : SavedPost}
          />
          <AuthProtected
            key="upload"
            exact
            path="/upload"
            component={searchFilter ? ExploreItems : Upload}
          />
          <AuthProtected
            key="contact"
            exact
            path="/contact-us"
            component={searchFilter ? ExploreItems : contact}
          />
          <AuthProtected
            key="faq"
            exact
            path="/faq"
            component={searchFilter ? ExploreItems : faq}
          />
          <AuthProtected
            key="notifications"
            exact
            path="/notifications"
            component={searchFilter ? ExploreItems : notifications}
          />
          <AuthProtected
            key="account-setting"
            exact
            path="/account-setting"
            component={searchFilter ? ExploreItems : AccountSetting}
          />
          <AuthProtected
            key="checkout"
            exact
            path="/checkout/:id"
            component={searchFilter ? ExploreItems : Checkout}
          />
          <AuthPrevented
            key="plan"
            exact
            path="/plan"
            component={searchFilter ? ExploreItems : Plan}
          />
          <AuthPrevented
            key="Blog"
            exact
            path="/blog_list"
            component={searchFilter ? ExploreItems : Blog_List}
          />
          <AuthPrevented
            key="Blog"
            exact
            path="/blog_details"
            component={searchFilter ? ExploreItems : Blog_details}
          />
          <AuthProtected
            key="manage Account"
            exact
            path="/manage_account"
            component={searchFilter ? ExploreItems : Manage_Account}
          />
        </Switch>
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default App;
