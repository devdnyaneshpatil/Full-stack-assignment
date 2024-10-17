import { createStore } from 'redux'
import { authReducer } from './AuthReducer/authReducer'

export const store=createStore(authReducer)