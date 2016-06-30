import React from "react";
import components from "../app/mdlComponents";
import api from "./api";
import moment from "moment";
require("moment-duration-format");


var UsHome = React.createClass({
  render: function() {
    var showMenu = this.props.state.showMenu;
    api.requestNewsArticles()
    .then(function(res) {
      console.log(res)
    })
    return (
      <div id="usHome">
        <components.Header showMenu={showMenu} toggleMenuState={this.props.toggleMenuState} title="US Home"/>
        <components.Drawer showMenu={showMenu} onClick={this.props.toggleMenuState}/>
        <div id="content" className={showMenu ? "menuOpen" : ""}>
          <components.Card/>
        </div>
      </div>
    );
  }
})

export default UsHome
