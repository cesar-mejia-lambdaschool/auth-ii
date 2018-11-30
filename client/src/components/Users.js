import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true
class Users extends Component {
  state = {
    users: [],
    loggedIn: false,
    fetching: true
  }

  componentDidMount () {
    this.setState({ fetching: true })
    axios
      .get('http://localhost:8000/api/users')
      .then(res => {
        this.setState({ users: res.data, loggedIn: true, fetching: false })
      })
      .catch(err => {
        this.setState({ loggedIn: false, fetching: false })
        console.error(err)
      })
  }

  render () {
    const { users, loggedIn, fetching } = this.state
    return (
      <div className='Users'>
        {!fetching && loggedIn ? (
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
            {fetching ? (
              <h2>Loading</h2>
            ) : (
              <div>
                You must login to access this resource. Redirecting to /signin.
                {this.redirect()}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  redirect = () => {
    setTimeout(() => this.props.history.push('/signin'), 3000)
  }

  handleButtonClick = () => {
    axios
      .get('http://localhost:8000/api/logout')
      .then(() => {
        this.setState(
          { loggedIn: false, users: [], fetching: false },
          this.props.history.push('/signin')
        )
      })
      .catch(err => console.log(err))
  }
}

export default withRouter(Users)
