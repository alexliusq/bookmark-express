import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  tags: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      "margin": '3px',
    }
  }
})

export default function TagsAnnotation(props) {
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