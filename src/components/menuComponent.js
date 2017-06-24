import React from 'react'
import { Menu } from 'semantic-ui-react'

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
    </Menu>
  )
}

export default menu
