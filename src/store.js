import thunkMiddleWare from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/index'
import logger from 'redux-logger'

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleWare,
    logger,
  )
)


export default store;
