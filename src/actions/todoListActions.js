// declare action types
// why? http://stackoverflow.com/questions/34965856/what-is-the-point-of-the-constants-in-redux
export const actionTypes = {
  TODOLIST_ADD_TODO: 'TODOLIST_ADD_TODO',
  TODOLIST_REMOVE_TODO: 'TODOLIST_REMOVE_TODO',
  TODOLIST_FETCH_TODO_REQUESTED: 'TODOLIST_FETCH_TODO_REQUESTED',
  TODOLIST_FETCH_TODO_SUCCEEDED: 'TODOLIST_FETCH_TODO_SUCCEEDED',
  TODOLIST_FETCH_TODO_FAILED: 'TODOLIST_FETCH_TODO_FAILED'
}

// a function that create action a.k.a. Action Creator
// this function return action.type and action.text to the reducer
export const addTodo = (text, date, time) => {
  return {
    type: actionTypes.TODOLIST_ADD_TODO,
    text,
    date,
    time
  }
}

export const removeTodo = (id) => {
  return {
    type: actionTypes.TODOLIST_REMOVE_TODO,
    id
  }
}

export const fetchTodoRequest = () => {
  return {
    type: actionTypes.TODOLIST_FETCH_TODO_REQUESTED
  }
}

export const fetchTodoResponse = (payload) => {
  return {
    type: actionTypes.TODOLIST_FETCH_TODO_SUCCEEDED,
    payload
  }
}

export const fetchTodoError = (error) => {
  return {
    type: actionTypes.TODOLIST_FETCH_TODO_FAILED,
    error
  }
}
