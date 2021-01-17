import {
    CREATE_POST,
    DELETE_POST,
    READ_POST,
    UPDATE_POST,
} from '../_actions/types';
 
function reducer(state={},action){
    switch(action.type){
        case CREATE_POST:
            return {...state, createSuccess: action.payload }
        case READ_POST:
            return { ...state, read: action.payload }
        case UPDATE_POST:
            return {...state, update: action.payload }
        case DELETE_POST:
            return {...state }
        default:
            return state;
    }
}

export default reducer