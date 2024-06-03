import React, { useEffect } from 'react';
import { AiFillFacebook, AiOutlineTwitter } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';
import { FaGamepad, FaNewspaper } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DropDown from 'src/components/dropdown/DropDown';
import { ErrorToast, SuccessToast } from 'src/helpers/Toast';
import { ApiGet, ApiPost } from 'src/services/http-service';

const index = () => {
  const [state, setstate] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [dropdownOpen, setdropdownOpen] = React.useState<boolean>(false);
  const [subjectValue, setsubjectValue] = React.useState<any>('Select Subject');

  const [data, setData] = React.useState([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setstate({
      ...state,
      [name]: value
    });
  };

  const toggle = () => {
    setdropdownOpen(!dropdownOpen);
  };
  const sendConatctUs = async () => {
    const body = { ...state, subject: subjectValue };
    ApiPost('/contact_us', body)
      .then((res: any) => {
        SuccessToast(res?.message);
        setstate({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch(async (err: any) => {
        ErrorToast(err?.message);
      });
  };
  useEffect(() => {
    ApiGet('/subject').then((res: any) => {
      setData(res?.data);
    });
    // .catch(async (err: any) => {});
  }, []);

  const handleOpenCategry = (e: any) => {
    setsubjectValue(e.target.innerHTML);
  };
  return (
    <div className="primary-content-area container content-padding">
      <div className="page-title">
        <h2>
          <span className="gradient-text">Get In Touch</span> With Us
        </h2>
      </div>
      <div className="grid-right-sidebar">
        <div className="main-content-area">
          <form
            className="cryptoki-form"
            id="contact-form"
            method="POST"
            action="https://html.crumina.net/cryptoki/nft/forms/submit-mail.php"
          >
            <input type="hidden" name="recaptcha_site_key" value="" />
            <input type="hidden" name="recaptcha_token" value="" />
            <div className="form-group row">
              <div className="form-field col-md-6">
                <label htmlFor="name">Your name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={state?.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field col-md-6">
                <label htmlFor="email">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={state?.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <DropDown
                dropdownOpen={dropdownOpen}
                toggle={toggle}
                categoryValue={subjectValue}
                array={data}
                onClick={handleOpenCategry}
              />
              {/* <label htmlFor="subject">Subject</label>
                            <select 
                            // className="select-nice" 
                            name="subject" 
                            id="subject" 
                            onChange={handleChange}
                            >
                              {data.map((e : any) => {
                                return (
                                  <>
                                  <option value={e?.subject}>{e?.subject}</option>
                                  </>
                                )
                              })
                              }
                            </select> */}
            </div>
            <div className="form-field comment-area">
              <label htmlFor="message">Your comment</label>
              <textarea
                id="message"
                name="message"
                className="comment-form message"
                cols={30}
                rows={10}
                value={state?.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="button"
              className="button btn btn-normal btn-dark waves-effect waves-button waves-float waves-light"
              data-badge="inline"
              onClick={sendConatctUs}
            >
              Send
            </button>
          </form>
        </div>
        <aside>
          <div className="widgets-list">
            <div className="widget widget-contact">
              <div className="widget-title h5">Business Inquiries</div>
              <div className="widget-body">
                <div className="email">
                  <a href="mailto:business@cryptoki.com">
                    business@cryptoki.com
                  </a>
                </div>
                <div className="email-owner">
                  Marina Valentine - Business Manager
                </div>
              </div>
            </div>
            <div className="widget widget-contact">
              <div className="widget-title h5">Partnership Inquiries</div>
              <div className="widget-body">
                <div className="email">
                  <a href="mailto:partners@cryptoki.com">
                    partners@cryptoki.com
                  </a>
                </div>
                <div className="email-owner">Anthony Rodgers - PR Manager</div>
              </div>
            </div>
            <div className="widget widget-social">
              <div className="widget-title h5">Social Accounts</div>
              <div className="widget-body">
                <ul className="social-styled-list">
                  <li className="social-icon">
                    <Link to="">
                      <svg className="crumina-icon">
                        <AiFillFacebook />
                      </svg>{' '}
                      @cryptoki
                    </Link>
                  </li>
                  <li className="social-icon">
                    <Link to="">
                      <svg className="crumina-icon">
                        <AiOutlineTwitter />
                      </svg>{' '}
                      @cryptokilive
                    </Link>
                  </li>
                  <li className="social-icon">
                    <Link to="">
                      <svg className="crumina-icon">
                        <BsInstagram />
                      </svg>{' '}
                      @cryptoki_art
                    </Link>
                  </li>
                  <li className="social-icon">
                    <Link to="">
                      <svg className="crumina-icon">
                        <FaNewspaper />
                      </svg>{' '}
                      @cryptoki
                    </Link>
                  </li>
                  <li className="social-icon">
                    <Link to="">
                      <svg className="crumina-icon">
                        <FaGamepad />
                      </svg>{' '}
                      @cryptoki
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default index;
