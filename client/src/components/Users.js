import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Users extends Component {
  state = {
    users: [],
    loggedIn: false
  }

  componentDidMount () {
    const token = localStorage.getItem('jwt')
    const requestOptions = { headers: { authorization: token } }
    axios
      .get('http://localhost:8000/api/users', requestOptions)
      .then(res => {
        this.setState({ users: res.data, loggedIn: true })
      })
      .catch(err => console.log(err))
  }

  render () {
    const { users, loggedIn } = this.state
    return (
      <div className='Users'>
        {loggedIn ? (
          <div>
            <button onClick={this.handleButtonClick}>Logout</button>
            <ul>
              {users.map(user => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h2>Route access is restricted. Redirecting to /signin route.</h2>
            {this.redirect()}
          </div>
        )}
      </div>
    )
  }

  redirect = () => {
    setTimeout(() => this.props.history.push('/signin'), 2000)
  }

  handleButtonClick = () => {
    localStorage.removeItem('jwt')
    this.setState({ loggedIn: false, users: [] })
    this.props.history.push('/signin')
  }
}

export default withRouter(Users)
