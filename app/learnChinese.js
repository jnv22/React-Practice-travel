import React from 'react';
import components from "../app/mdlComponents";

module.exports = React.createClass({
  render:function() {
    var showMenu = this.props.state.showMenu;
    return (
      <div id="usHome">
        <components.Header showMenu={showMenu} toggleMenuState={this.props.toggleMenuState} title="US Home"/>
        <components.Drawer showMenu={showMenu} onClick={this.props.toggleMenuState}/>
        <div className="learnChinese"></div>
      </div>
    )
  }
})
