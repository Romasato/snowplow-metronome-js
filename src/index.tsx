import 'reset-css';
import './styles/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from './stores/store';

import App from './components/App';

const RootComponent = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(RootComponent, document.getElementById('root'));
