import React from 'react';
import Grid from '@material-ui/core/Grid';

import PrimarySearchAppBar from './Appbar';

export default function MainGridBox(props) {
  return(
    <Grid container justify="center">
      <Grid item xs={12}>
        <PrimarySearchAppBar/>
      </Grid>
      <Grid item/>
      <Grid item xs={11} md={9}>
        {props.children}
      </Grid>
      <Grid item/>
    </Grid>
  );
}