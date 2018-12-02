import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true
class Users extends Component {
  state = {
    users: [],
    user: null,
    loggedIn: false
  }

  componentDidMount () {
    axios
      .get('http://localhost:8000/api/users')
      .then(res => {
        const { users, user } = res.data
        this.setState({ users, loggedIn: true, user })
      })
      .catch(err => console.log(err))
  }

  render () {
    const { user, users, loggedIn } = this.state
    return (
      <div className='Users'>
        {loggedIn ? (
          <div>
            <button onClick={this.handleButtonClick}>Logout</button>
            <br />
            {user && <img height='50' src={user.photo} alt='profile' />}

            <ul>
              {users.map(user => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h2>Route access is restricted. Redirecting to /signin route.</h2>
          </div>
        )}
      </div>
    )
  }

  redirect = () => {
    setTimeout(() => this.props.history.push('/signin'), 2000)
  }

  handleButtonClick = () => {
    axios
      .get('http://localhost:8000/api/logout')
      .then(res => {
        this.setState(
          { loggedIn: false, users: [], user: null },
          this.props.history.push('/signin')
        )
      })
      .catch(err => console.error(err))
  }
}

export default withRouter(Users)
