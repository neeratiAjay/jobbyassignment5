import {Link, withRouter} from 'react-router-dom'
import {RiHome4Fill} from 'react-icons/ri'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo-image"
        />
      </Link>

      <ul className="icons-container list-container-icons">
        <Link to="/" className="link">
          <li>
            <RiHome4Fill className="home-icon" />
          </li>
        </Link>
        <Link to="/jobs" className="link">
          <li>
            <BsFillBriefcaseFill className="home-icon" />
          </li>
        </Link>
        <li>
          <button className="btn" onClick={onClickLogout}>
            <FiLogOut className="home-icon" />
          </button>
        </li>
      </ul>

      <ul className="lg-icons-container">
        <Link to="/" className="link">
          <li className="home-text">Home</li>
        </Link>
        <Link to="/jobs" className="link">
          <li className="home-text">Jobs</li>
        </Link>
      </ul>

      <button
        className="header-logout-btn lg-icons-container"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
