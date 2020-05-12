import dateFormat from 'dateformat';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import EditIcon from '@material-ui/icons/Edit';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    // '& .MuiTextField-root': {
    //   margin: theme.spacing(1),
    // }
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
  const classes = useStyles();
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


export default function AnnotationCreateCard(props) {
  const classes = useStyles();
  const annotation = props.annotation || {};

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        title="Editing Annotation"
        action={
        <CardActions className={classes.cardActions}>
            <Button size="small" variant="contained">
              Save
            </Button>
            <Button size="small" variant="text">
              Cancel
            </Button>
            <Button size="small" variant="text" >
              Delete
            </Button>
        </CardActions>
        }
      />
      <CardContent>
      <TextField
          id="highlight"
          label="Highlight"
          multiline
          fullWidth
          rowsMax={10}
          value={annotation.highlight}
          variant="outlined"
        />
      <br />
      <br />
      <Divider variant="middle" light={true} />
      <Typography variant="subtitle1" className={classes.noteTitle} >
        Note
      </Typography>
      <TextField
          id="note"
          label="Note"
          multiline
          fullWidth
          rowsMax={5}
          value={annotation.note}
          variant="outlined"
        />
      </CardContent>
    </Card>
  );
}
