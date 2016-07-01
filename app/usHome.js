import React from "react";
import components from "../app/mdlComponents";
import api from "./api";
import moment from "moment";
require("moment-duration-format");


var newsArticles = {
  store: "",
  getNewsArticles: function() {
    return api.requestNewsArticles()
      .then(function(articles) {
        newsArticles.store = articles
      })
  }
}


var UsHome = React.createClass({
  getInitialState: function() {
    return {newsArticles: ''}
  },
  componentDidMount: function() {
    api.requestNewsArticles()
      .then((articles) => {
        this.setState({newsArticles: articles})
      })
  },
  render: function() {
    var showMenu = this.props.state.showMenu;
    console.log(this.state, "here")
    return (
      <div id="usHome">
        <components.Header showMenu={showMenu} toggleMenuState={this.props.toggleMenuState} title="US Home"/>
        <components.Drawer showMenu={showMenu} onClick={this.props.toggleMenuState}/>
        <div id="content" className={showMenu ? "menuOpen" : ""}>
          <components.Card />
          <components.GridList newsArticles={this.state.newsArticles} />
        </div>
      </div>
    );
  }
})

export default UsHome
