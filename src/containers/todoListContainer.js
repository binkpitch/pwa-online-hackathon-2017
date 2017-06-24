import React from 'react'
import { connect } from 'react-redux'
import { addTodo, removeTodo, fetchTodoRequest } from '../actions/todoListActions.js'
import { Button } from 'semantic-ui-react'
import List from '../components/listComponent'
import TextArea from '../components/textAreaComponent'

const TodoList = (props) => {
  const handleAddTodo = (event) => {
    event.preventDefault()
    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleTimeString()
    props.todoForm.values
    ? props.addTodo(props.todoForm.values.textArea, date, time)
    : props.addTodo('')
  }

  return (
    <div style={props.style}>
      <TextArea formName='todo' onSubmit={handleAddTodo} />
      <h4>OR</h4>
      <Button content='Fetch Todo using GET' onClick={props.fetchTodo} />
      <br />
      <h2>Todo</h2>
      <List dataSource={props.dataSource} removeItem={props.removeTodo} />
    </div>
  )
}

// recieve store's state as prop
const mapStateToProps = (state) => {
  return {
    dataSource: state.todoList.list,
    todoForm: state.form.todo
  }
}

// receive dispatch (contain action creators) as prop
const mapDispatchToProps = (dispatch) => {
  return {
    // wrap action creators into dispatch
    addTodo: (text, date, time) => dispatch(addTodo(text, date, time)),
    removeTodo: (id) => dispatch(removeTodo(id)),
    fetchTodo: () => dispatch(fetchTodoRequest())
  }
}

// connect component to store using higher order components
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
