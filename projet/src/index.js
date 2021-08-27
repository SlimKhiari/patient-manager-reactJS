import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore , applyMiddleware} from "redux";
import maladeReducer from "./redux/reducers/maladeReducer"
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(maladeReducer,composeWithDevTools(), applyMiddleware(thunk) );

ReactDOM.render(

  <Provider store={store}>
    <Router>
    <App />
    </Router>
    </Provider>
  ,
  document.getElementById('root')
);

