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
import TagsAnnotationContainer from '../tags/tags_annotation_container';
import CardHeader from '@material-ui/core/CardHeader';


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
    "flex-wrap": "wrap"
  },
  editButtons: {
    '& > *': {
      "margin": '3px',
    }
  },
  quote: {
    "font-family": "Georgia, serif",
    "line-height": 1.3,
    color: 'rgba(0, 0, 0, 1)'
  },
  noteTitle: {
    marginTop: '0.5rem',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  annotationHeader: {
    // 'margin-bottom': "12px",
    "display": "flex",
    "justify-content": "space-between",
    "align-items": "center",
    "padding-bottom": 0
  },
  centeredHeader: {
    "display": "flex",
    "flex-direction": "column",
    "justify-content": "center"
  },
  divider: {
    "margin-top": 6
  }
});

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
      <Divider variant="middle" light={true} className={classes.divider}/>
      <Typography variant="subtitle1" className={classes.noteTitle}>
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
      <CardContent className={classes.annotationHeader}>
        <Typography variant="subtitle1" >
        {getFormattedLocation(props.annotation)}{bull}{dateFormat(props.annotation.time, "ddd, mm/dd/yy HH:MM")}
        </Typography>
        <div className={classes.editButtons}>
          <Button size="small" variant="outlined" endIcon={<EditIcon />}
            onClick={props.handleEdit}>
            Edit
          </Button>
          <Button size="small" variant="outlined" endIcon={<FavoriteBorderIcon />}>
            Favorite
          </Button>
        </div>
      </CardContent>
      <CardContent>
        <Typography className={classes.quote} gutterBottom={true}>
         {annotation.highlight}
        </Typography>
        <TagsAnnotationContainer annotation={annotation}/>
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