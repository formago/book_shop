"use strict"
import { applyMiddleware, createStore } from 'redux';

import reducers from './reducers/index';
import { addToCart } from "./actions/cartActions";
import { postBooks, deleteBooks, updateBooks } from './actions/booksActions';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// STEP 1 create the store
const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';


const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={BooksList} />
                <Route path="/admin" component={BooksForm} />
                <Route path="/cart" component={Cart} />
            </Route>
        </Router>
    </Provider>)

render(
    Routes, document.getElementById('app')
);