import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true
class Users extends Component {
  state = {
    users: [],
    user: null,
    loggedIn: false,
    loading: true
  }

  componentDidMount () {
    axios
      .get('http://localhost:8000/api/users')
      .then(res => {
        const { users, user } = res.data
        this.setState({ users, loggedIn: true, user, loading: false })
      })
      .catch(err => {
        this.setState({ loading: false, loggedIn: false })
      })
  }

  render () {
    const { user, users, loggedIn, loading } = this.state
    return (
      <div className='Users'>
        {loggedIn && !loading ? (
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
            {loading ? (
              <h2>Loading</h2>
            ) : (
              <h2>Route access is restricted. Redirecting to /signin route.</h2>
            )}
            {!loading && !loggedIn && this.redirect()}
          </div>
        )}
      </div>
    )
  }

  redirect = () => {
    setTimeout(() => this.props.history.push('/signin'), 2000)
  }

  handleButtonClick = e => {
    e.preventDefault()
    axios
      .get('http://localhost:8000/api/logout')
      .then(res => {
        this.setState({ loggedIn: false, users: [], user: null })
      })
      .then(() => this.props.history.push('/signin'))
      .catch(err => console.error(err))
  }
}

export default withRouter(Users)
