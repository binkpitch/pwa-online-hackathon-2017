import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Menu from '../components/menuComponent'

const menu = (props) => {
  const items = [
    // {
    //   name: 'Home Page',
    //   isActive: props.location.pathname === '/',
    //   onClick: props.pushHomePage
    // }, {
    //   name: 'Todo List',
    //   isActive: props.location.pathname === '/todolist',
    //   onClick: props.pushTodoList
    // },
    {
      name: 'Vote',
      isActive: props.location.pathname === '/',
      onClick: props.pushVote
    }
  ]

  return (
    <Menu header='reactor' items={items} />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    // pushHomePage: () => dispatch(push('/')),
    // pushTodoList: () => dispatch(push('/todolist')),
    pushVote: () => dispatch(push('/'))
  }
}

export default connect(null, mapDispatchToProps)(menu)
