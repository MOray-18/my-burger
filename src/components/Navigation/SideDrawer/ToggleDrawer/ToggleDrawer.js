import React from 'react';

import classes from './ToggleDrawer.module.css';

const toggleDrawer = props => (
  <div className={classes.ToggleDrawer} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default toggleDrawer;
