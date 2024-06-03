import React from 'react';
import { AiFillFacebook } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';
import { FaNewspaper } from 'react-icons/fa';
import { FaGamepad } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer footer-margin">
      <div className="footer-wrapper container">
        <div className="subscribe-widget-v2">
          <div className="animated-img"></div>
          <div className="subscribe-text">
            <div className="h2">Subscribe to our Newsletter!</div>
            <div className="subtitle">
              DEALS, NEW ITEMS, FREEBIES AND MUCH MORE!
            </div>
          </div>
          <div className="subscribe-form-v2">
            <form
              className="cryptoki-subscribe-form"
              action="https://html.crumina.net/cryptoki/ds/forms/submit.php"
            >
              <input
                className="subscribe-input"
                type="email"
                name="email"
                placeholder="Subscribe to our newsletter"
              />
              <button
                className="subscribe-submit btn btn-dark waves-effect waves-button waves-float waves-light"
                type="submit"
              >
                <span className="button-text">Subscribe</span>
                <FaTelegramPlane />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-content flex-space-between">
          <div className="footer-column footer-column-large">
            <div className="footer-widget">
              <div className="logo">
                <a className="logo-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/01-index.html">
                  <div className="logo-img">
                  <img src={'/Image/logofooter.svg'} alt="logo" />
                    </div>
                  <div className="logo-text">Unicorn UI</div>
                </a>
              </div>
              <div className="footer-text">
                <p>We are a huge marketplace dedicated to connecting great artists of all mediums with their fans and
                  unique token collectors!</p>
              </div>
              <ul className="social-icons-list">
              <li className="social-icon">
                <Link to="">
                  <svg className="crumina-icon">
                    <AiFillFacebook />
                  </svg>
                </Link>
              </li>
              <li className="social-icon">
                <Link to="">
                  <svg className="crumina-icon">
                    <AiOutlineTwitter />
                  </svg>
                </Link>
              </li>
              <li className="social-icon">
                <Link to="">
                  <svg className="crumina-icon">
                    <BsInstagram />
                  </svg>
                </Link>
              </li>
              <li className="social-icon">
                <Link to="">
                  <svg className="crumina-icon">
                    <FaNewspaper />
                  </svg>
                </Link>
              </li>
              <li className="social-icon">
                <Link to="">
                  <svg className="crumina-icon">
                    <FaGamepad />
                  </svg>
                </Link>
              </li>
            </ul>
              
            </div>
          </div>
          <div className="footer-column">
            <div className="footer-widget">
              <div className="widget-title">Unicorn UI</div>
              <div className="is-two-col-element">
                <ul className="footer-menu">
                  <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/01-index.html">Home</a></li>
                  <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/02-explore.html">Explore</a></li>
                  <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/10-creators.html">Creators</a></li>
                  <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/11-collectors.html">Collectors</a></li>
                  <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/16-spotlight.html">Spotlight</a></li>
                </ul>
                <ul className="footer-menu">
                  <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/08-profile-page.html">Profile Page</a></li>
                  <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/03-explore-v2.html">Artwork Page</a></li>
                  <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/17-activity.html">Activity</a></li>
                  <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/26-upload-artwork.html">Upload Art</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-column">
            <div className="footer-widget">
              <div className="widget-title">Explore</div>
              <ul className="footer-menu">
                <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/02-explore.html">3D Artworks</a></li>
                <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/03-explore-v2.html">Motion Graphics</a></li>
                <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/04-item-versions.html">Illustrations</a></li>
                <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/02-explore.html">Photography</a></li>
                <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/03-explore-v2.html">Pop Culture</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-column">
            <div className="footer-widget">
              <div className="widget-title">Helpful Links</div>
              <ul className="footer-menu">
                <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/13-blog-classic.html">Our Blog</a></li>
                <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/24-become-a-creator.html">Become a Creator</a></li>
                <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/19-faq.html">FAQs</a></li>
                <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/%21.html#">About Us</a></li>
                <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/20-contact.html">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright flex-space-between">
          <span className="copyright-text">
          Unicorn UI 2021 - All Rights Reserved
          </span>
          <ul className="sub-footer-menu">
            <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/%21.html#">Terms of Service</a></li>
            <li className="menu-item"><a className="menu-link" href="file:///C:/Users/Admin/OneDrive/Desktop/HTML%20Cryptoki/cryptoki/nft/%21.html#">Privacy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
