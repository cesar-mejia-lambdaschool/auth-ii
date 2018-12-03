import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true
const initialState
class Users extends Component {
  state = {
    user: null,
    users: [],
    loggedIn: false,
    loading: true
  }

  componentDidMount () {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/users`)
      .then(res => {
        const { users, user } = res.data
        this.setState({ user, users, loggedIn: true, loading: false })
      })
      .catch(err => this.setState({ loggedIn: false, loading: false }))
  }

  render () {
    const { user, users, loggedIn, loading } = this.state
    return (
      <div className='Users'>
        {loggedIn && !loading ? (
          <div>
            <button style={{ marginBottom: 10 }} onClick={this.handleButtonClick}>
              Logout
            </button>
            <br />
            {user && <img height='100' src={user.photo} alt='profile' />}
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
      .get(`${process.env.REACT_APP_SERVER_API}/logout`)
      .then(res => this.setState({ loggedIn: false, users: [], user: null }))
      .then(() => this.props.history.push('/signin'))
      .catch(err => console.error(err))
  }
}

export default withRouter(Users)
