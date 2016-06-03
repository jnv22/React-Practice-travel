// tutorial1.js

import React from "react";
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChineseHome from '../app/chineseHome';
import UsHome from '../app/usHome';

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
            <button><Link to="/zh-tw">中文</Link></button>
          </div>
          <div id = "englishSpringboard">
            <button><Link to="/en-us">English</Link></button>
          </div>
        </div>
    );
  }
});


injectTapEventPlugin();

require("./styles/app.css");

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
