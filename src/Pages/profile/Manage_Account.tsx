import React from 'react'
import Aside from '../../components/aside';

const Manage_Account = () => {
  return (
    <div className="primary-content-area container content-padding grid-left-sidebar">
    <Aside />
    <div className="main-content-area">
        <div className="page-title">
            <h2>
                <span className="gradient-text">Notification</span> Settings
            </h2>
        </div>
        <div className="user-db-content-area">
            <form className="cryptoki-form" id="personal-info-form">
              <div className="form-group row">
              <div className="form-field col-12">
                <p>Notifications on your content:</p>
                <input type="checkbox" id="1" name="1"/>
                <label className='justify-content-start' htmlFor="1"> Achievement notifications like medals, statistics, sales, etc</label>
                <p className='mt-5'>Notifications from new comments:</p>
                <input type="checkbox" id="2" name="2"/>
                <label className='justify-content-start' htmlFor="2">  A new comment on a post you submitted</label>
                <input type="checkbox" id="3" name="3"/>
                <label className='justify-content-start' htmlFor="3"> A new comment on a post you commented</label>
                <input type="checkbox" id="4" name="4"/>
                <label className='justify-content-start' htmlFor="4">  A new comment on a post you made</label>
                <p className='mt-5'>Notifications from users you follow:</p>
                <input type="checkbox" id="5" name="5"/>
                <label className='justify-content-start' htmlFor="5">  A user is following you</label>
                <input type="checkbox" id="6" name="6"/>
                <label className='justify-content-start' htmlFor="6">New posts are posted by people you follow</label>
                <input type="checkbox" id="7" name="7"/>
                <label className='justify-content-start' htmlFor="7">   A new comment on a post you made</label>
                <button
            className="btn btn-wide btn-dark waves-effect waves-button waves-float waves-light col-12 mt-5 mb-3"
            type="submit"
          >
            Update Settings
          </button>
                </div>
              </div>
              </form>
              </div>
        </div>
    </div>
  )
}

export default Manage_Account