import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Menu from '../components/menuComponent'

const menu = props => {
  const items = [
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

  return <Menu items={items} />
}

const mapDispatchToProps = dispatch => {
  return {
    pushVote: () => dispatch(push('/')),
    pushResult: () => dispatch(push('/result'))
  }
}

export default connect(null, mapDispatchToProps)(menu)
