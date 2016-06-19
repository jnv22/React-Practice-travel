// tutorial1.js

import React from "react";
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChineseHome from '../app/chineseHome';
import UsHome from '../app/usHome';
import components from "../app/mdlComponents";
injectTapEventPlugin();
require("../app/styles/app.scss")


import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

const NoMatch = React.createClass({
  render: function() {
    return (
      <h4>Error 404</h4>
    )
  }
});

const Main = React.createClass({
  render: function() {
    return <div className="MainSite">{this.props.children} </div>
  }
});

const Springboard = React.createClass({
  render: function() {
    return (
      <div id = "content">
        <div id = "chineseSpringboard">
          <Link to="/zh-tw"><components.ButtonRaised label="中文"/></Link>
        </div>
        <div id = "englishSpringboard">
          <Link to="/en-us"><components.ButtonRaised label="English"/></Link>
        </div>
      </div>
    );
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory}>
     <Route path="/" component={Main}>
       <IndexRoute component={Springboard} />
       <Route path="zh-tw" component={Springboard}/>
       <Route path="en-us" component={UsHome}/>
     </Route>
     <Route path="*" component={NoMatch}/>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
