import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CollapsibleText from '../collapsibleText';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  large: {
    width: 100,
    height: 'auto',
    paddingRight: 10
  },
  // img: {
  //   height: 'auto',
  //   width: 100
  //       // width: 100,
  // }
}));

export default function BookBox(props) {
  const classes = useStyles();
  const book = props.book;
  console.log(book);
  // console.log(book.pubdate);

  return (
    <ListItem alignItems="flex-start">
      {/* <CardMedia
          className={classes.img}
          component='img'
          image={book.image_url}
        /> */}
      {/* <ListItemAvatar>
        <Avatar variant="square" className={classes.large}
          src={book.image_url} />
      </ListItemAvatar> */}
      <ListItemText
        primary={book.title}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary">
{`${book.pubdate.getMonth()}/${book.pubdate.getDate()}/${book.pubdate.getFullYear()}`}}
            </Typography>
            <br />
            <CollapsibleText text={book.comments}/>
          </React.Fragment>
        }
      />
    </ ListItem>
  )
}

// export default BookBox;

/*
<Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
*/