import { ADD_TOKEN } from "./actionTypes"

const initState = {
    token:""
}

export const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case ADD_TOKEN:
            return {
                ...state,
                token:payload
            }
        
        default:
            return state
    }
}