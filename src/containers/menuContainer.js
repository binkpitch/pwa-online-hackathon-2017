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
    },
    {
      name: 'Result',
      isActive: props.location.pathname === '/result',
      onClick: props.pushResult
    }
  ]

  return (
    <Menu items={items} />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    // pushHomePage: () => dispatch(push('/')),
    // pushTodoList: () => dispatch(push('/todolist')),
    pushVote: () => dispatch(push('/')),
    pushResult: () => dispatch(push('/result'))
  }
}

export default connect(null, mapDispatchToProps)(menu)
