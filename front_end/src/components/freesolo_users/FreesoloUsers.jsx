/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Tags() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="input_users"
        options={Names.map((option) => option.title)}
        freeSolo
        required = "Please enter at least one user"
        onChange = ""
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="filled" label="Users" />
        )}
      />
    </div>
  );
}

const Names = [];
