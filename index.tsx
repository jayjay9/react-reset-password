import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import * as serviceWorker from './serviceWorker';
import { ToastContainer } from 'react-toastify';

// styles
import 'bootstrap/dist/css/bootstrap.css';
import 'scss/custom/bootstrap.scss';
import 'scss/custom/reactToastify.scss';
import 'scss/main.scss';

// icons
import 'utils/fontawesome';

// components & pages
import ResetPassword from 'pages/ResetPassword';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="app">
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Router>
          <Switch>
            <Route
              path="/reset-password/:reset_token"
              render={(props) => {
                return <ResetPassword match={props.match}></ResetPassword>;
              }}
            />
          </Switch>
        </Router>
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
