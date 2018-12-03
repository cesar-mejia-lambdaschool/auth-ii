import React, { Component } from 'react'
import axios from 'axios'
import SocialLinks from '../components/SocialLinks'
axios.defaults.withCredentials = true
const initialState = { email: '', password: '' }
// const serverAPI = 'http://localhost:8000/api'
const serverAPI = 'https://guarded-sands-18679.herokuapp.com/api'
class SignUp extends Component {
  state = initialState

  render () {
    const { email, password } = this.state

    return (
      <form
        type='submit'
        onSubmit={this.handleFormSubmit}
        style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
      >
        <label>Email: </label>
        <input
          name='email'
          type='text'
          placeholder='Enter email'
          value={email}
          onChange={this.handleInputChange}
          style={{ marginBottom: 10, height: 20 }}
        />
        <label>Password: </label>
        <input
          name='password'
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={this.handleInputChange}
          style={{ marginBottom: 10, height: 20 }}
        />
        <button style={{ height: 30 }} type='submit'>
          Submit
        </button>
        <SocialLinks action='Register' />
      </form>
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
      .post(`${serverAPI}/register`, this.state)
      .then(res => this.setState(initialState))
      .then(() => this.props.history.push('/users'))
      .catch(err => console.error(err))
  }
}

export default SignUp
