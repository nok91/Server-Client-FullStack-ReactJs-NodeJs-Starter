import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers/index';
import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Feature from './components/feature-page/Feature';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import AllFiles from './components/all-files/AllFiles';

import * as serviceWorker from './serviceWorker';
import './index.css';

const store = createStore(
    reducers,
    {
       auth: { authenticated: localStorage.getItem('token') } // So now any time our application starts up we're going to check to see if we have a store token and if we do we'll up the redux state with that token as our auth dot authenticated property
    },
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route path="/" exact component={Welcome} />
                <Route path="/signup" component={Signup} />
                <Route path="/signout" component={Signout} />
                <Route path="/signin" component={Signin} />
                <Route path="/features" component={Feature} />
                <Route path="/folder" component={AllFiles} />
            </App>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
