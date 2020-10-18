import { createStore, applyMiddleware, compose} from 'redux';
import reducers from './initialReducers';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);

const reduxDevTools = compose;

const store = createStore( reducers, 
    reduxDevTools(middleware)
)

export default store;



