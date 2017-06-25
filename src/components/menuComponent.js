import React from 'react'
import { Button, Confirm, Menu, Popup } from 'semantic-ui-react'
import Firebase from 'firebase'

const providerGoogle = new Firebase.auth.GoogleAuthProvider();

// Facebook
const providerFacebook = new Firebase.auth.FacebookAuthProvider()
providerFacebook.setCustomParameters({
  'display': 'popup'
})

type NavMenuProps = {
  header?: string,
  items?: array
}

export default class NavMenu extends React.Component {
  props: NavMenuProps

  constructor(props) {
    super(props)

    this.state = {
      profile: null,
      openDel: false
    }
  }

  componentDidMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          profile: user
        })
      }
    });
  }

  _onClickGoogle = () => {
    Firebase.auth().signInWithPopup(providerGoogle).then((result) => {
      console.log('Login google success: ')
    }).catch(function(error) {
      console.log('Login google errors: ', error)
    });
  }

  _onClickFacebook = () => {
    Firebase.auth().signInWithPopup(providerFacebook).then((result) => {
      console.log('Login facebook success: ')
    }).catch(function(error) {
      console.log('Login facebook errors: ', error)
    });
  }

  _onClickLogOut = () => {
    this.setState({
      openDel: true
    })
  }

  _confirmLogOut = () => {
    Firebase.auth().signOut().then(() => {
      this.setState({
        profile: null,
        openDel: false
      })
    }).catch(function(error) {
      console.log('Logout errors: ', error)
    });
  }

  _cancelLogout = () => {
    this.setState({
      openDel: false
    })
  }

  _renderAuth() {
    const { profile } = this.state

    if(profile) {
      return (
        <div>
          <Button
            color='red'
            onClick={this._onClickLogOut}
          >
            Logout
          </Button>
          <Confirm
            content="Are you sure you want to sign out?"
            open={this.state.openDel}
            onCancel={this._cancelLogout}
            onConfirm={this._confirmLogOut}
          />
        </div>
      )
    } else {
      return (
        <Popup wide trigger={<Button content='Login' />} on='click'>
          <div className='flex1 margin-bottom-10'>
            <Button
              color='red'
              content='Google'
              icon='google'
              labelPosition='left'
              className='flex1'
              onClick={this._onClickGoogle}
            />
          </div>
          <div className='flex1'>
            <Button
              color='blue'
              content='Facebook'
              icon='facebook'
              labelPosition='left'
              className='flex1'
              onClick={this._onClickFacebook}
            />
          </div>
        </Popup>
      )
    }
  }

  render () {
    return (
      <Menu>
        {
          this.props.items.map((menu, key) => (
            <Menu.Item name={menu.name} active={menu.isActive} onClick={menu.onClick} key={key}>
              {menu.name}
            </Menu.Item>
          ))
        }
        <Menu.Menu position='right'>
            {
              this.state.profile
              ? (
                  <Menu.Item>
                    {this.state.profile.displayName.slice(0, 9)}... 
                  </Menu.Item>
                )
              : null
            }
          <Menu.Item>
            { this._renderAuth() }
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
