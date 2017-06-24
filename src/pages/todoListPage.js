import React from 'react'
import TodoList from '../containers/todoListContainer'
// Support for inline css
import injectSheet from 'react-jss'
import styles from './todoListPageStyle'

const TodoListPage = () => {
  return (
    <TodoList style={styles} />
  )
}

export default injectSheet(styles)(TodoListPage)
