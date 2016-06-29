import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


import {Link, browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Flight from 'material-ui/svg-icons/maps/flight';
import Library from 'material-ui/svg-icons/maps/local-library';
import Articles from 'material-ui/svg-icons/editor/insert-comment';
import Classifieds from 'material-ui/svg-icons/action/question-answer';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  paper: {
  display: 'inline-block',
  float: 'left',
  margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  }
};

const Components = {

  Card: React.createClass({
    render: function() {
      return (
        <Card>
          <CardMedia
            style={{"margin-top":"-64px"}}
            overlay={<CardTitle title="Welcome to TaiwanConnection" subtitle="Let's Start" />}
          >
            <img src="../../app/assets/Times_Square.jpg" />
          </CardMedia>
          <CardTitle title="TaiwanConnection" subtitle="a simpler way to find information" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      )
    }
  }),

  Drawer: React.createClass({
    menuViews: [
      {title: "Home", img:"home", destination: "en-us"},
      {title: "Airfare Lookup", img:"plane", destination: "book-a-flight"},
      {title: "Learn Chinese", img:"book", destination: "err"},
      {title: "Articles", img:"commenting", destination: "err"},
      {title: "Classifieds", img:"newspaper-o", clickEvent: "err"}
    ],

    onClick: function(destination) {
      browserHistory.push(destination)
    },

    render: function() {
      var menuItems =  this.menuViews.map((item) => {
        console.log(this.props.showMenu, "menu showing")
        var img = "fa fa-" + item.img;
        var destination = item.destination
        return (
          <MenuItem primaryText={item.title} onTouchTap={this.onClick.bind(this, item.destination)} leftIcon={<FontIcon className={img} checked="true"></FontIcon>} />
        )
      });
      return (
          <Drawer open={this.props.showMenu}>
            <AppBar onLeftIconButtonTouchTap={this.props.onClick}/>
            {menuItems}
          </Drawer>
      );
    }
  }),

  Header: React.createClass({
    render: function() {
      return (
      <div>
        <div id="header" className={this.props.showMenu ? "hide" : ""}>
          <AppBar
            title={this.props.title}
            onLeftIconButtonTouchTap={this.props.toggleMenuState}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        </div>
        <Components.Drawer showMenu={this.props.showMenu} onClick={this.props.toggleMenuState}/>
      </div>
      )
    }
  }),

  DatePicker: React.createClass({
    render: function() {
      return (
        <DatePicker
          defaultDate={this.props.date}
          onChange={this.props.onChange}/>
      )
    }
  }),

  ButtonRaised: React.createClass({
    render: function() {
      return (
        <RaisedButton
          label= {this.props.label}
          className="button"
          labelPosition="before"
          secondary="true"
          disabled={this.props.disabled}
          onClick={this.props.onclick}
          style={styles.button}>
        </RaisedButton>
        )
    }
  }),

  InputField: React.createClass({
    render: function() {
      return (
        <TextField
          hintText=""
          id={this.props.id}
          onChange={this.props.onChange}
          floatingLabelText={this.props.label}>
        </TextField>
      )
    }
  })
}
export default Components;
