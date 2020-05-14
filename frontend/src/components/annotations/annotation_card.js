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
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

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
    "margin-right": "auto",
    '& > *': {
      "margin": '3px',
    }
  },
  quote: {
    "font-family": "'Noto Serif', serif",
    "line-height": 1.3
  },
  noteTitle: {
    marginTop: '0.5rem',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  tags: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      "margin": '3px',
    }
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

function AnnotationTags(props) {
  const classes = useStyles();
  if (props.isEditingTags) {
    return (
    <Autocomplete
      multiple
      id="tags-filled"
      // options={top100Films.map((option) => option.title)}
      // defaultValue={[top100Films[13].title]}
      renderOption={(option) => option.tag}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} variant="filled" label="freeSolo" placeholder="Favorites" />
      )}
    />
    )
  } else {
    return (
      <div className={classes.tags}>
        {props.tags.map(tag => (
          <Chip variant="outlined" label={tag.tag} />
        ))}
      </div>
    )
  }
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
          <div className={classes.editButtons}>
            <Button size="small" variant="outlined" endIcon={<EditIcon />}
              onClick={props.handleEdit}>
              Edit
            </Button>
            <Button size="small" variant="outlined" endIcon={<FavoriteBorderIcon />}>
              Favorite
            </Button>
            <Button size="small" variant="outlined" endIcon={<LocalOfferRoundedIcon />}>
              Tag
            </Button>
          </div>
          <AnnotationTags
            tags={annotation.tags}
            isEditingTags={props.isEditingTags}/>
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