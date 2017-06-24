import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

const menu = (props) => {
  return (
    <Menu>
      <Menu.Item header>{props.header}</Menu.Item>
      {
        props.items.map((menu, key) => (
          <Menu.Item name={menu.name} active={menu.isActive} onClick={menu.onClick} key={key}>
            {menu.name}
          </Menu.Item>
        ))
      }
      <Menu.Menu position='right'>
        <Menu.Item>
          <Button primary>Sign up</Button>
        </Menu.Item>

        <Menu.Item>
          <Button>Log-in</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default menu
