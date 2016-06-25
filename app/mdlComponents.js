import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AppBar from 'material-ui/AppBar';
import {browserHistory} from 'react-router';

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
};

const Components = {
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
