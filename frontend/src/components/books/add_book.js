import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'baseline',
    width: 300
  },
  input: {
    flex: 1,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  addButton: {
    marginLeft: 5
  },
}));

export default function AddBook(props) {

  const { goodreadsID, handleGoodreadsIDChange, 
    goodreadsError } = props;

  const classes = useStyles();
  const [expand, setExpand] = React.useState(false);

    return (
      <React.Fragment>
      {
        !expand && <Button onClick={() => (setExpand(true))}>Add Book...</Button>
      }
      {
        expand &&
        <Paper component="form" className={classes.root}
        onBlur={() => setExpand(false)}
        >
        <TextField 
          autoFocus
          label="Number"
          className={classes.input}
          placeholder="Goodreads ID"
          value={goodreadsID}
          onChange={handleGoodreadsIDChange}
          error={goodreadsError}
        />
        <Button className={classes.addButton} disabled={goodreadsError}>
          Add
        </Button>
      </Paper>
      }
      </React.Fragment>
    );
}