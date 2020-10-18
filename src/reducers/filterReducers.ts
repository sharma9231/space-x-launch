  
import { UPDATE_FILTER_VALUE } from '../actions/filterActions';

const initialUserState = {
    SpaceData:[],
}
export default function reducer(state = initialUserState, action: any) {
    switch(action.type) {
        case UPDATE_FILTER_VALUE: 
            return {
                ...state,
                SpaceData : action.payload
            }
            default:
                return state;
    }
}