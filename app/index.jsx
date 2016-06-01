// tutorial1.js

import React from "react";
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Component from '../app/mdlComponent';
injectTapEventPlugin();

require("./styles/app.css");

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Component />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
