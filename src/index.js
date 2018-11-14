import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import builderBurgerReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :  null || compose;
const rootReducer = combineReducers({
    burgerState: builderBurgerReducer,
    orderState: orderReducer,
    authState: authReducer
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (<Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
