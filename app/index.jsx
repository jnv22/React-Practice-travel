// tutorial1.js

import React from "react";
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChineseHome from '../app/chineseHome';
import UsHome from '../app/usHome';
import UsBookFlight from '../app/bookFlight'
import components from "../app/mdlComponents";
import learnChinese from "../app/learnChinese";

injectTapEventPlugin();
require('../app/styles/app.scss')
require ('../app/styles/font-awesome/css/font-awesome.css');



import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';


const Main = React.createClass({
  getInitialState: function() {
    return {showMenu:false}
  },

  toggleMenuState: function() {
    this.setState({showMenu: !this.state.showMenu});
  },

  render: function() {
    var childrenWithProps = React.cloneElement(this.props.children, {state: this.state, toggleMenuState: this.toggleMenuState});
    return <div className="MainSite">{childrenWithProps}</div>
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

const NoMatch = React.createClass({
  render: function() {
    return (
      <h4>Error 404</h4>
    )
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory}>
     <Route path="/" component={Main}>
       <IndexRoute component={Springboard} />
       <Route path="zh-tw" component={Springboard}/>
       <Route path="en-us" component={UsHome}/>
         <Route path="book-a-flight" component={UsBookFlight}/>
          <Route path="learn" component={learnChinese}/>
     </Route>
     <Route path="*" component={NoMatch}/>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.body
);
