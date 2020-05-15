import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  tags: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      "margin": '3px',
    }
  },
  tagsAutocomplete: {
    'flex-grow': 1
  }
});

const filter = createFilterOptions();


export default function TagsAnnotation(props) {
  const classes = useStyles();

  if (props.isEditingTags) {
    return (
    <Autocomplete
      
      className = {classes.tagsAutocomplete}
      multiple
      selectOnFocus
      id="tags-filled"
      filterOptions={(options, params) => {
        let filtered = filter(options, params);
        // console.log("before", filtered);

        // this code causes material to throw an error that none of the current values
        // match options. going to try and use getOptionSelected instead
        // filtered = filtered.filter(option => {
        //   return props.tags.filter(tag => tag.tag === option.tag).length === 0;
        // });

        // console.log('after', filtered);
        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue:  `Create "${params.inputValue}" Tag`,
            tag: params.inputValue,
          });
        }
        
        return filtered;
      }}
      getOptionSelected={(option, value) => option.tag === value.tag}
      filterSelectedOptions
      options={props.existingTags}
      value={props.tags}
      onChange={props.handleOnChange}
      getOptionLabel={(option) => {
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.tag;
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option.tag} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} variant="outlined"/>
      )}
    />
    )
  } else {
    return (
      <div className={classes.tags}>
        {props.tags.map(tag => (
          <Chip variant="outlined" label={tag.tag} />
        ))}
        <Button size="small" variant="outlined"
          endIcon={<LocalOfferRoundedIcon />}
          onClick={props.handleEditTags}
        >
          Tag
        </Button>
      </div>
    )
  }
}