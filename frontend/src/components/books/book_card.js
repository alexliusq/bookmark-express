import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CollapsibleText from '../collapsibleText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CardActions from '@material-ui/core/CardActions';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
  },
  bookCover: {
    height: '100%',
    width: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }
}));

export default function BookCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const book = props.book;

  return (
    <Card className={classes.root}>
      <CardMedia
          className={classes.img}
          component='img'
          image={book.image_url}
        />
      <CardContent>
        <Typography variant="h5">
          {book.title}
        </Typography>
        <Typography variant="subtitle1">
          by: {book.author}
        </Typography>
        <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary">
{book.pubdate && `${book.pubdate.getMonth()}/${book.pubdate.getDate()}/${book.pubdate.getFullYear()}`}}
        </Typography>
      </CardContent>
      <CardActions>
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
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
        </CardContent>
      </Collapse>
    </ Card>
  )
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   details: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   content: {
//     flex: '1 0 auto',
//   },
//   cover: {
//     width: 151,
//   },
//   controls: {
//     display: 'flex',
//     alignItems: 'center',
//     paddingLeft: theme.spacing(1),
//     paddingBottom: theme.spacing(1),
//   },
//   playIcon: {
//     height: 38,
//     width: 38,
//   },
// }));

// export default function MediaControlCard() {
//   const classes = useStyles();
//   const theme = useTheme();

//   return (
//     <Card className={classes.root}>
//       <div className={classes.details}>
//         <CardContent className={classes.content}>
//           <Typography component="h5" variant="h5">
//             Live From Space
//           </Typography>
//           <Typography variant="subtitle1" color="textSecondary">
//             Mac Miller
//           </Typography>
//         </CardContent>
//         <div className={classes.controls}>
//           <IconButton aria-label="previous">
//             {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
//           </IconButton>
//           <IconButton aria-label="play/pause">
//             <PlayArrowIcon className={classes.playIcon} />
//           </IconButton>
//           <IconButton aria-label="next">
//             {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
//           </IconButton>
//         </div>
//       </div>
//       <CardMedia
//         className={classes.cover}
//         image="/static/images/cards/live-from-space.jpg"
//         title="Live from space album cover"
//       />
//     </Card>
//   );
// }