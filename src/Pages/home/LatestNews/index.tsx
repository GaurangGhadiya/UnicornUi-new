import React from 'react';
import { Link } from 'react-router-dom';

const LatestNews = () => {
  return (
    <div>
      <div
        className="section-small section-padding"
        style={{ padding: '85px' }}
      >
        <div className="become-seller-block">
          <img src={'/Image/become-seller.png'} alt="" />
          <div className="text-content">
            <div className="subtitle">JOIN OUR COMMUNITY!</div>
            <div className="title">
              Click{' '}
              <span className="gradient-text">
                <Link to="/upload">Here</Link>
              </span>{' '}
              to <br />
              Become a Seller!
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container section-padding">
        <div className="section-title-wrapper">
          <div className="section-title">
            Latest <span className="gradient-text">News</span>
          </div>
          <div className="all-items-link">
            <Link to="">View all Blog Posts</Link>
          </div>
        </div>
        <div className="latest-news-box grid-3-columns">
          <div className="news-item">
            <div className="news-thumb">
              <Link to="">
                <img src={'/Image/news-thumb2.png'} alt="" />
              </Link>
            </div>
            <div className="news-content">
              <div className="news-meta">
                <div className="news-tags">
                  <span className="tag-item">
                    <Link to="">Guides</Link>
                  </span>
                </div>
                by <Link to="">Unicorn UI</Link>, March 26th, 2021
              </div>
              <div className="news-title h5">
                <Link to="">
                  We explain with details everything you need to know about
                  crypto art and cryptocurrencies!
                </Link>
              </div>
              <div className="news-excerpt">
                A cryptocurrency is a digital asset designed to work as a medium
                of exchange wherein individual coin ownership records...
              </div>
              <div className="read-more-link">
                <Link to="">
                  Read More <MdOutlineKeyboardArrowRight />
                </Link>
              </div>
            </div>
          </div>
          <div className="news-item">
            <div className="news-thumb">
              <Link to="">
                <img src={'/Image/news-thumb2.png'} alt="" />
              </Link>
            </div>
            <div className="news-content">
              <div className="news-meta">
                <div className="news-tags">
                  <span className="tag-item">
                    <a>Guides</a>
                  </span>
                  <span className="tag-item">
                    <a>News</a>
                  </span>
                </div>
                by <Link to="">Marina Valentine</Link>, March 13th, 2021
              </div>
              <div className="news-title h5">
                <Link to="">
                  Here’s a quick guide about how to make money selling your
                  artworks with Criptoki!
                </Link>
              </div>
              <div className="news-excerpt">
                A cryptocurrency is a digital asset designed to work as a medium
                of exchange wherein individual coin ownership records...
              </div>
              <div className="read-more-link">
                <Link to="">
                  Read More <MdOutlineKeyboardArrowRight />
                </Link>
              </div>
            </div>
          </div>
          <div className="news-item">
            <div className="news-thumb">
              <Link to="">
                <img src={'/Image/news-thumb3.png'} alt="" />
              </Link>
            </div>
            <div className="news-content">
              <div className="news-meta">
                <div className="news-tags">
                  <span className="tag-item">
                    <a>Currencies</a>
                  </span>
                </div>
                by <Link to="">Unicorn UI</Link>, March 4th, 2021
              </div>
              <div className="news-title h5">
                <Link to="">
                  What’s ETH? An in-depth view of the currency used in the
                  market
                </Link>
              </div>
              <div className="news-excerpt">
                A cryptocurrency is a digital asset designed to work as a medium
                of exchange wherein individual coin ownership records...
              </div>
              <div className="read-more-link">
                <Link to="">
                  Read More <MdOutlineKeyboardArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LatestNews;
