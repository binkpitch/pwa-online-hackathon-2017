import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Menu from '../components/menuComponent'

const menu = (props) => {
  const items = [
    {
      name: 'Home Page',
      isActive: props.location.pathname === '/',
      onClick: props.pushHomePage
    }
  ]

  return (
    <Menu header='Reactor' items={items} />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    pushHomePage: () => dispatch(push('/'))
  }
}

export default connect(null, mapDispatchToProps)(menu)
