import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AppBar from 'material-ui/AppBar';
import {browserHistory} from 'react-router';

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

  MenuExampleIcons: React.createClass({
    render: function() {
      console.log(this.props.menu)
      this.props.menu.map(function(resw) {
        console.log(resw.title)
      })

      var menuItems =  this.props.menu.map((item) => {
        var img = "fa fa-" + item.img;
        console.log(img, "her")

        return (
          <MenuItem primaryText={item.title} leftIcon={<FontIcon className={img}></FontIcon>} />
        )
      })

      return (
        <div>
          <Paper style={styles.paper}>
            <Menu>
              {menuItems}
            </Menu>
          </Paper>
        </div>
      )
    }
  }),

  Header: React.createClass({
    menuTouch: function() {
      browserHistory.push('/');
    },
    render: function() {
      return (
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={this.menuTouch}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
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
