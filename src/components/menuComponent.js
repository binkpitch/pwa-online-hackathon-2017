import React from 'react'
import { Menu, Button, Popup } from 'semantic-ui-react'
import Firebase from 'firebase'
const provider = new Firebase.auth.FacebookAuthProvider()
provider.setCustomParameters({
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
      profile: null
    }
  }

  componentDidMount() {
    this.setState({
      profile: JSON.parse(localStorage.getItem('profile'))
    })
  }

  _onClickFb = () => {
    Firebase.auth().signInWithPopup(provider).then((result) => {
      localStorage.setItem('profile', JSON.stringify(result.user))
      this.setState({
        profile: result.user
      })
    }).catch(function(error) {
      console.log('Login facebook errors: ', error)
    });
  }

  _onClickLogOut = () => {
    Firebase.auth().signOut().then(() => {
      localStorage.setItem('profile', null)
      this.setState({
        profile: null
      })
    }).catch(function(error) {
      console.log('Logout errors: ', error)
    });
  }

  _renderAuth() {
    const { profile } = this.state

    if(profile) {
      return (
        <Button
          color='red'
          onClick={this._onClickLogOut}
        >
          Logout
        </Button>
      )
    } else {
      return (
        <Popup wide trigger={<Button content='Login' />} on='click'>
          <div className='flex1 margin-bottom-10'>
            <Button
              color='red'
              content='Google Plus'
              icon='google plus'
              className='flex1'
            />
          </div>
          <div className='flex1'>
            <Button
              color='blue'
              content='Facebook'
              icon='facebook'
              className='flex1'
              onClick={this._onClickFb}
            />
          </div>
        </Popup>
      )
    }
  }

  render () {
    return (
      <Menu>
        <Menu.Item header>{this.props.header}</Menu.Item>
        {
          this.props.items.map((menu, key) => (
            <Menu.Item name={menu.name} active={menu.isActive} onClick={menu.onClick} key={key}>
              {menu.name}
            </Menu.Item>
          ))
        }
        <Menu.Menu position='right'>
          <Menu.Item>
            { this._renderAuth() }
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
