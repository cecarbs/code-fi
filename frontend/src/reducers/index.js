import { combineReducers } from 'redux';
import songsReducer from './songsReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
    songs: songsReducer,
    ui: uiReducer
});

export default rootReducer;