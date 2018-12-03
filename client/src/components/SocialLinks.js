import React, { Fragment } from 'react'
import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton
} from 'react-social-login-buttons'
const SocialLinks = props => {
  const authURL = 'https://guarded-sands-18679.herokuapp.com/api/auth'
  // const authURL = 'http://localhost:8000/api/auth'
  return (
    <Fragment>
      <FacebookLoginButton
        onClick={() => (window.location.href = `${authURL}/facebook`)}
      >
        <span>{props.action} with Facebook</span>
      </FacebookLoginButton>
      <GoogleLoginButton
        onClick={() => (window.location.href = `${authURL}/google`)}
      >
        <span>{props.action} with Google</span>
      </GoogleLoginButton>
      <GithubLoginButton
        onClick={() => (window.location.href = `${authURL}/github`)}
      >
        <span>{props.action} with Github</span>
      </GithubLoginButton>
    </Fragment>
  )
}

export default SocialLinks
