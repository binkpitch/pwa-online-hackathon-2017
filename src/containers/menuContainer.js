import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Menu from '../components/menuComponent'

const menu = (props) => {
  const items = [
    {
      name: 'Vote',
      isActive: props.location.pathname === '/',
      onClick: props.pushVote
    }
  ]

  return (
    <Menu header='Reactor' items={items} />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    pushHomePage: () => dispatch(push('/')),
    pushTodoList: () => dispatch(push('/todolist')),
    pushVote: () => dispatch(push('/vote'))
  }
}

export default connect(null, mapDispatchToProps)(menu)
