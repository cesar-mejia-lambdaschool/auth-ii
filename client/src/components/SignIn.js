import React, { Component } from 'react'
import SocialLinks from '../components/SocialLinks'
import axios from 'axios'
axios.defaults.withCredentials = true
const initialState = { username: '', password: '' }
class Signin extends Component {
  state = initialState

  render (props) {
    const { username, password } = this.state

    return (
      <div className='Signin'>
        <form
          onSubmit={this.handleFormSubmit}
          style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
        >
          <label>Username:</label>
          <input
            name='username'
            type='text'
            placeholder='Enter username'
            value={username}
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
      .post(`${process.env.REACT_APP_SERVER_API}/login`, this.state)
      .then(res => this.setState(initialState))
      .then(() => this.props.history.push('/users'))
      .catch(err => {
        console.error(err)
      })
  }
}

export default Signin
