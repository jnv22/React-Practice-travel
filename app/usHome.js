import React from "react";
import components from "../app/mdlComponents";
console.log("here")

var usHome = React.createClass({
  render: function() {
    return (
      <div>
        <h4>US HOME</h4>
        <components.ButtonRaised />
      </div>
    );
  }
})

export default usHome
