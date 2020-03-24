import {
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM
} from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        case FETCH_STREAMS:
            const streamsObject = _.mapKeys(action.payload, 'id'); //[{id, title}] => {id:{id, title}}
            return { ...state, ...streamsObject};



        default:
            return state
    }
}