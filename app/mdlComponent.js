import React from "react";

var Springboard = React.createClass({
  render: function() {
  console.log(this);
    return (
      <div className="MainSite">
        <div id = "content">
          <div id = "chineseSpringboard">
            <p>中文</p>
          </div>
          <div id = "englishSpringboard">
            <p>English</p>
          </div>
        </div>
      </div>
    );
  }
});

export default Springboard;
