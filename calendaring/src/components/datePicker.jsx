import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
}));

export default function DateAndTimePickers(props) {
  const classes = useStyles();

  return (
      <form className={classes.container} noValidate>
        <TextField
          id="datetime-local"
          label= {props.name}
          type="datetime-local"
          onChange= {props.onChange}
          defaultValue={props.selected}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
  );
}