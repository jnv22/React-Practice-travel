import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

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
  ButtonRaised: () => (
    <div>
    <RaisedButton
      label="Choose an Image"
      labelPosition="before"
      style={styles.button}
    >
      <input type="file" style={styles.exampleImageInput} />
    </RaisedButton>
  </div>
  )
}
export default Components;
