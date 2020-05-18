import React from 'react';
import Grid from '@material-ui/core/Grid';


export default function MainGrid(props) {
  return(
    <Grid container justify="center">
      <Grid item/>
      <Grid item xs={11} md={9}>
        {props.children}
      </Grid>
      <Grid item/>
    </Grid>
  );
}