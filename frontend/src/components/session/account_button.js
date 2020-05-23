import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from '../shared/list_item_link';
import ButtonLink from '../shared/button_link';
import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.session.isAuthenticated || state.session.isSignedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

function AccountButton(props) {
  const { loggedIn, listItem } = props;

  if (listItem) {
    return (
      !loggedIn ?
      <ListItemLink primary="Login" to="/login" /> :
      (<ListItem button onClick={props.Reactlogout}>
        <ListItemText primary="Logout" />
      </ListItem>)
    )
  } else {
    return (
      loggedIn ?
      <Button color="inherit" onClick={props.logout}>Logout</Button> :
      (<ButtonLink color="inherit" to='/login'> Login </ButtonLink>)
    )
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(AccountButton);