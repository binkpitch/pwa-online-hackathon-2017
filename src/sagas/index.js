// use 'takeEvery' to intercept action and run saga task
// use 'takeLatest' same as 'takeEvery' but also cancel previous saga task (if any)
// use 'fork' to run saga task immediately
import { takeLatest } from 'redux-saga/effects'
import todoListSaga from './todoListSaga'

// import your action here
import { actionTypes as todoListActionTypes } from '../actions/todoListActions'

// add your saga here
function * rootSagas () {
  // intercept 'TODOLIST_FETCH_TODO_REQUEST' action and run 'todoListSaga'
  yield takeLatest(todoListActionTypes.TODOLIST_FETCH_TODO_REQUESTED, todoListSaga)
}

export default rootSagas
