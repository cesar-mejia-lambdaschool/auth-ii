import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
  state = {
    username: '',
    password: '',
    department: ''
  }

  render () {
    const { username, password, department } = this.state

    return (
      <form
        type='submit'
        onSubmit={this.handleFormSubmit}
        style={{ display: 'flex', flexDirection: 'column', width: '200px' }}
      >
        <label>Username: </label>
        <input
          name='username'
          type='text'
          placeholder='Enter username'
          value={username}
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
        <label>Department: </label>
        <input
          name='department'
          type='text'
          placeholder='Enter department'
          value={department}
          onChange={this.handleInputChange}
          style={{ marginBottom: 10, height: 20 }}
        />
        <button style={{ height: 30 }} type='submit'>
          Signup
        </button>
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
      .post('http://localhost:8000/api/register', this.state)
      .then(res => {
        const { token } = res.data
        localStorage.setItem('jwt', token)
        this.setState({
          username: '',
          password: '',
          department: ''
        })
        this.props.history.push('/users')
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export default Signup
