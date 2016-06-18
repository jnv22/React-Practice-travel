import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
  ButtonRaised: React.createClass({
    render: function() {
      return (
         <div>
          <RaisedButton
            label= {this.props.label}
            labelPosition="before"
            onClick={this.props.onclick}
            style={styles.button}>
          </RaisedButton>
        </div>)
    }
  }),
  InputField: React.createClass({
    render: function() {
      return (
        <TextField
          hintText="hint text"
          onChange={this.props.onChange}
          floatingLabelText={this.props.label}>
        </TextField>
      )
    }
  })

}
export default Components;
