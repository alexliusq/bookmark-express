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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

function getFormattedLocation(annotation) {
  const {begin, end, page} = annotation;
  if (page) return `Pg. ${page}`;
  if (begin && end) return `Location ${begin}-${end}`;
  return null;
}

function AnnotationNote(props) {
  return (
    <React.Fragment>
      <Divider variant="middle" light={true} />
      <Typography variant="subtitle1" className={classes.noteTitle} >
        Note
      </Typography>
      <Typography variant="body2" component="p">
        {props.note}
      </Typography>
    </React.Fragment>
  )
}


export default function AnnotationCard(props) {
  const classes = useStyles();
  const annotation = props.annotation;

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
  {getFormattedLocation(annotation)}{bull}{dateFormat(annotation.time, "ddd, mm/dd/yy HH:MM")} 
        </Typography>
        <Typography className={classes.quote} gutterBottom={true}>
         {annotation.highlight}
        </Typography>
        <CardActions className={classes.cardActions}>
          <Button size="small" variant="outlined" endIcon={<EditIcon />}>
            Edit
          </Button>
          <Button size="small" variant="outlined" endIcon={<FavoriteBorderIcon />}>
            Favorite
          </Button>
          <Button size="small" variant="outlined" endIcon={<LocalOfferRoundedIcon />}>
            Tag
          </Button>
        </CardActions>
        {annotation.note && <AnnotationNote note={annotation.note} />}
      </CardContent>
    </Card>
  );
}

/*
<CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
*/

/*
<Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        Send
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
*/