import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {name: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({name: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }
  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }
  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {name, password} = this.state
    const userDetails = {username: name, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  usernameContainer = () => {
    const {name} = this.state
    return (
      <>
        <label className="label-text" htmlFor="name">
          USERNAME
        </label>
        <br />
        <input
          className="user-input"
          type="text"
          id="name"
          placeholder="Username"
          value={name}
          onChange={this.onChangeUsername}
        />
        <br />
      </>
    )
  }

  userPasswordContainer = () => {
    const {password} = this.state
    return (
      <>
        <label className="label-text" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          className="user-input"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <form onSubmit={this.submitForm}>
            <div className="input-elements-container">
              {this.usernameContainer()}
              {this.userPasswordContainer()}
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
