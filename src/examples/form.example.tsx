import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Container, Grid, makeStyles, TextField, Theme, Typography } from '@material-ui/core';

import { AppState } from './app.example';

type FormExampleComponentProps = {
  state: AppState;
  updateState: (value: AppState) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(2),
  },
}));

export const FormExampleComponent = ({ state, updateState }: FormExampleComponentProps): ReactElement => {
  const classes = useStyles();

  const { firstName, lastName } = state;

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    history.push('/feedback');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    updateState({ ...state, [name]: value });
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography variant="h2">NaviGate Example</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container alignItems="baseline" spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              type="text"
              onChange={handleChange}
              value={firstName}
              name="firstName"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              type="text"
              onChange={handleChange}
              value={lastName}
              name="lastName"
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="outlined">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
