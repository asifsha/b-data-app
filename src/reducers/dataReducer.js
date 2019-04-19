import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default (state = initialState.data, action) => {    
    switch (action.type) {
        case types.ApiGetData:        
            return action.data;
        default:
            return state;
    }
}




