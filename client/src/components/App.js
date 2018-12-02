import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Users from './Users'

class App extends Component {
  render () {
    return (
      <div className='App' style={{ marginLeft: '20px' }}>
        <header>
          <nav
            style={{
              display: 'flex',
              marginBottom: '20px'
            }}
          >
            <Link style={{ marginRight: '20px' }} to='/signup'>
              Register
            </Link>
            <Link style={{ marginRight: '20px' }} to='/signin'>
              Sign In
            </Link>
            <Link style={{ marginRight: '20px' }} to='/users'>
              Users
            </Link>
          </nav>
        </header>
        <Route exact path='/' component={Home} />
        <Route path='/signup' render={props => <SignUp {...props} />} />
        <Route path='/signin' render={props => <SignIn {...props} />} />
        <Route path='/users' render={props => <Users {...props} />} />
      </div>
    )
  }
}

export default App
