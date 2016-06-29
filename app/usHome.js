import React from "react";
import components from "../app/mdlComponents";
import api from "./api";
import moment from "moment";
require("moment-duration-format");

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';


var usHome = React.createClass({
  getInitialState: function() {
    return {
      showMenu: true
    }
  },

  toggleMenuState: function() {
    this.setState({showMenu: !this.state.showMenu});
  },

  updateFlightResults: function(flightData) {
    this.setState({flightData: flightData})
  },
  render: function() {
    console.log(this.state.showMenu, "in main")
    return (

      <div id="usHome">
        <components.Header showMenu={this.state.showMenu} toggleMenuState={this.toggleMenuState} title="US Home"/>
        <div id="content" className={this.state.showMenu ? "menuOpen" : ""}>
            <components.Card/>
        </div>
      </div>
    );
  }
})

export default usHome
