import dateFormat from 'dateformat';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  // title: {
  //   fontSize: 14,
  // },
  pos: {
    marginBottom: 12,
  },
});

export default function AnnotationCard(props) {
  const classes = useStyles();
  const annotation = props.annotation;

  const bull = <span className={classes.bullet}>•</span>;
  console.log(annotation.time);

  let note;
  if (annotation.note) {
    note =
      <React.Fragment>
        <Divider />
        <Typography variant="body2" component="p">
          {annotation.note}
        </Typography>
      </React.Fragment>;
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        {/* <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography> */}
        <Typography className={classes.pos} color="textSecondary">
          {dateFormat(annotation.time, "ddd, mm/dd/yy HH:MM")}
        </Typography>
        <Typography variant="body2" component="blockquote">
         {annotation.text}
        </Typography>
        {note}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}