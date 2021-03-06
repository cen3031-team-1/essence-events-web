import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import authStore from './../store/auth';
import axios from 'axios';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

@observer
class LogIn extends React.Component {

  state = { toDashboard: false, email: '', password: '', wrongPassword: false, wrongEmail: false };

  onSignInClick() {
    axios.post('/api/user/login', {email: this.state.email, password: this.state.password})
      .then((res) => {

        this.props.authStore.token = res.data.token;

        // redirect to the dashboard
          this.setState({ toDashboard: true });
      }).catch((err) => {
        if (err.response.request.status === 401) this.setState({ ...this.state, wrongPassword: true, wrongEmail: false });
        if (err.response.request.status === 403) this.setState({ ...this.state, wrongEmail: true, wrongPassword: false });
    });
  }


  render() {

    const { classes } = this.props;

    if (this.state.toDashboard) return <Redirect to='/dashboard/todos'/>

    if (this.props.authStore.token) return <Redirect to='/dashboard/todos'/>

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Essence Events Portal
          </Typography>
          <form className={classes.form}>
            <FormControl error={this.state.wrongEmail} margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={(e) => this.setState({...this.state, email: e.target.value })}/>
            </FormControl>
            <FormControl error={this.state.wrongPassword} margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input  name="password" type="password" id="password" autoComplete="current-password" onChange={(e) => this.setState({...this.state, password: e.target.value })}/>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSignInClick.bind(this)}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

function injectStore (Component) {
  return (() => <Component authStore={authStore} />)
}

export default injectStore(observer(withStyles(styles)(LogIn)));
