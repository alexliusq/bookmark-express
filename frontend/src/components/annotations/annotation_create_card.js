import dateFormat from 'dateformat';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import EditIcon from '@material-ui/icons/Edit';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 8px',
    transform: 'scale(0.8)',
  },
  // title: {
  //   fontSize: 14,
  // },
  pos: {
    marginBottom: 12,
  },
  cardActions: {
    "justify-content": 'flex-end'
  },
  quote: {
    "font-family": "'Noto Serif', serif",
    "line-height": 1.3
  },
  noteTitle: {
    marginTop: '0.5rem',
    color: 'rgba(0, 0, 0, 0.5)'
  }
}));

function getFormattedLocation(annotation) {
  const {begin, end, page} = annotation;
  if (page) return `Pg. ${page}`;
  if (begin && end) return `Location ${begin}-${end}`;
  return null;
}

function AnnotationNote(props) {
  return (
    <React.Fragment>
      <Typography variant="subtitle1" className={classes.noteTitle} >
        Note
      </Typography>
      <Typography variant="body2" component="p">
        {props.note}
      </Typography>
    </React.Fragment>
  )
}

function displayHighlight(props) {
  const annotation = props.annotation;
  return (
  <React.Fragment>
    <Typography className={classes.pos} color="textSecondary">
  {getFormattedLocation(annotation)}{bull}{dateFormat(annotation.time, "ddd, mm/dd/yy HH:MM")} 
    </Typography>
    <Typography className={classes.quote} gutterBottom={true}>
      {annotation.highlight}
    </Typography>
  </React.Fragment>
  )
}

function editHighlight(props) {
  
}

export default function AnnotationCreateCard(props) {
  const classes = useStyles();
  const annotation = props.annotation;

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardActions className={classes.cardActions}>
          <Button size="small" variant="contained">
            Save
          </Button>
          <Button size="small" variant="text">
            Cancel
          </Button>
          <Button size="small" variant="contained" >
            Delete
          </Button>
        </CardActions>
      <CardContent>
      <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          rowsMax={20}
          value={annotation.highlight}
          onChange={handleChange}
          variant="outlined"
        />
      <Divider variant="middle" light={true} />
      
      </CardContent>
    </Card>
  );
}
