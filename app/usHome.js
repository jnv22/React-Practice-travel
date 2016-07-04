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
        this.newsArticles = [];
        articles.data.results.map((tile, index) => {
          index < 9 ? hasHiDefPictures(tile, this.newsArticles) : ""
        });
      this.setState({newsArticles: this.newsArticles})
    });
    function hasHiDefPictures(tile, newsArticles) {
      if (tile.multimedia.length > 4) {
        return newsArticles.push(tile)
      }
    }
  },
  render: function() {
    var showMenu = this.props.state.showMenu;
    console.log(this.state.newsArticles)
    return (
      <div id="usHome">
        <components.Header showMenu={showMenu} toggleMenuState={this.props.toggleMenuState} title="US Home"/>
        <components.Drawer showMenu={showMenu} onClick={this.props.toggleMenuState}/>
        <div id="content" className={showMenu ? "menuOpen" : ""}>
          <div className="welcomeBanner">
            <components.Card />
          </div>
          {this.state.newsArticles !== "" ? <components.GridList newsArticles={this.state.newsArticles} /> : ""}
        </div>
      </div>
    );
  }
})

export default UsHome
