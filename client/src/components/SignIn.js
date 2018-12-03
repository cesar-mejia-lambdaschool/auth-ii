import React, { Component } from 'react'
import SocialLinks from '../components/SocialLinks'
import axios from 'axios'
axios.defaults.withCredentials = true
// const serverAPI = 'http://localhost:8000/api'
const serverAPI = 'https://guarded-sands-18679.herokuapp.com/api'
const initialState = { email: '', password: '' }

class SignIn extends Component {
  state = initialState

  render (props) {
    const { email, password } = this.state

    return (
      <div className='Signin'>
        <form
          onSubmit={this.handleFormSubmit}
          style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
        >
          <label>Email:</label>
          <input
            name='email'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={this.handleInputChange}
            style={{ marginBottom: 10, height: 20 }}
          />
          <label>Password:</label>
          <input
            name='password'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={this.handleInputChange}
            style={{ marginBottom: 10, height: 20 }}
          />
          <button style={{ height: 30 }} type='submit'>
            Login
          </button>
          <SocialLinks action='Login' />
        </form>
      </div>
    )
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()

    axios
      .post(`${serverAPI}/login`, this.state)
      .then(res => this.setState(initialState))
      .then(() => this.props.history.push('/users'))
      .catch(err => console.error(err))
  }
}

export default SignIn
